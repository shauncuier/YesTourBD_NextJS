import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge, Icon } from '@/components/index.js';
import { Panel } from '@/components/admin/chrome.jsx';
import { AssignmentAction, NoteForm, StatusActions } from '@/components/admin/RequestActions.jsx';
import { prisma } from '@/lib/db';
import { requireStaff } from '@/lib/staff';
import { formatDuration, slaStateFor } from '@/lib/sla';
import { STATUS_LABEL, nextStatuses, type RequestStatus } from '@/lib/request-pipeline';
import { QuotationBuilder } from '@/components/admin/QuotationBuilder.jsx';
import { defaultValidUntil, formatTaka } from '@/lib/quotation';
import { addNote, changeStatus, toggleAssignment } from './actions';
import { sendQuotation } from './quotation-actions';

// Staff act on this page, so it must never be served from a cache: a stale status is how two
// coordinators end up quoting the same customer twice.
export const dynamic = 'force-dynamic';

const STATUS_TONE: Record<string, 'neutral' | 'brand' | 'teal' | 'success' | 'warning' | 'danger' | 'gold'> = {
  submitted: 'warning',
  reviewing: 'brand',
  quoted: 'teal',
  negotiating: 'gold',
  accepted: 'success',
  booked: 'success',
  expired: 'neutral',
  lost: 'danger',
};

const TYPE_LABEL: Record<string, string> = {
  corporate: 'Corporate tour or event',
  group: 'Group / student tour',
  visa: 'Visa assistance',
  package: 'Custom package',
  car: 'Rent a car',
};

const CONTACT_LABEL: Record<string, string> = {
  whatsapp: 'WhatsApp',
  call: 'Phone call',
  email: 'Email',
};

/** The next step a coordinator most likely wants, highlighted rather than buried in a row. */
const PRIMARY_NEXT: Partial<Record<RequestStatus, RequestStatus>> = {
  submitted: 'reviewing',
  reviewing: 'quoted',
  quoted: 'negotiating',
  negotiating: 'accepted',
  accepted: 'booked',
};

function Fact({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div style={{ padding: 'var(--space-3)', background: 'var(--gray-50)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>{label}</div>
      <div style={{ marginTop: 3, fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--navy-900)' }}>{value}</div>
    </div>
  );
}

const dateTime = (value: Date) =>
  value.toLocaleString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
    timeZone: 'Asia/Dhaka',
  });

export default async function RequestDetailPage(props: PageProps<'/admin/requests/[ref]'>) {
  const staff = await requireStaff();
  const { ref } = await props.params;

  const request = await prisma.quoteRequest.findUnique({
    where: { ref: decodeURIComponent(ref) },
    include: {
      assignedTo: { select: { id: true, name: true } },
      events: { orderBy: { createdAt: 'desc' } },
      quotations: { orderBy: { createdAt: 'desc' } },
    },
  });
  if (!request) notFound();

  const sla = slaStateFor({ createdAt: request.createdAt, status: request.status, now: new Date() });
  const status = request.status as RequestStatus;
  const options = nextStatuses(status).map((value) => ({
    value,
    label: STATUS_LABEL[value],
    primary: PRIMARY_NEXT[status] === value,
  }));

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <Link href="/admin/requests" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
          <Icon name="arrow-right" size={15} style={{ transform: 'rotate(180deg)' }} />Back to the queue
        </Link>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--navy-700)' }}>{request.ref}</span>
        <Badge tone={STATUS_TONE[status] ?? 'neutral'} dot>{STATUS_LABEL[status]}</Badge>
        {sla.overdue ? <Badge tone="danger" dot>past the 2-hour reply</Badge> : null}
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
          waiting {formatDuration(sla.workingMinutes)} of desk time
        </span>
      </div>

      <div style={{ display: 'grid', gap: 'var(--space-5)' }}>
        <Panel title={`${TYPE_LABEL[request.requestType] ?? request.requestType} — ${request.name}`}>
          <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))', gap: 'var(--space-3)' }}>
              <Fact label="Travellers" value={request.paxBand} />
              <Fact label="Destination" value={request.destinations} />
              <Fact label="Start" value={request.startDate ? request.startDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Dhaka' }) : 'Not given'} />
              <Fact label="Nights" value={request.nights ?? 'Not given'} />
              <Fact label="Budget" value={request.budgetBand ?? 'Not given'} />
              <Fact label="Company" value={request.org ?? '—'} />
              <Fact label="Reply on" value={CONTACT_LABEL[request.contactPref] ?? request.contactPref} />
              <Fact label="Submitted" value={dateTime(request.createdAt)} />
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
              <a href={`tel:${request.phone}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--color-link)' }}>
                <Icon name="phone" size={15} />{request.phone}
              </a>
              {request.email ? (
                <a href={`mailto:${request.email}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--color-link)' }}>
                  <Icon name="message-circle" size={15} />{request.email}
                </a>
              ) : null}
            </div>

            {request.needs.length ? (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {request.needs.map((need) => <Badge key={need} tone="neutral">{need}</Badge>)}
              </div>
            ) : null}

            {request.notes ? (
              <div style={{ padding: 'var(--space-4)', background: 'var(--navy-50)', border: '1px solid var(--navy-100)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--navy-800)', lineHeight: 'var(--leading-relaxed)', whiteSpace: 'pre-wrap' }}>
                {request.notes}
              </div>
            ) : (
              <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>The customer left no notes.</p>
            )}
          </div>
        </Panel>

        <Panel title="Move it along">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <AssignmentAction
              refId={request.ref}
              assignedToMe={request.assignedTo?.id === staff.id}
              assigneeName={request.assignedTo?.name ?? null}
              action={toggleAssignment}
            />
            <StatusActions refId={request.ref} current={STATUS_LABEL[status]} options={options} action={changeStatus} />
          </div>
        </Panel>

        <Panel title="Quotation">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            {request.quotations.length ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {request.quotations.map((quotation) => (
                  <div key={quotation.id} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--space-4)', flexWrap: 'wrap', padding: 'var(--space-3)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: quotation.status === 'superseded' ? 'var(--gray-50)' : 'var(--color-bg-surface)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-base)', color: 'var(--navy-900)' }}>{formatTaka(quotation.total)}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                      {quotation.depositPercent}% to hold ({formatTaka(quotation.depositAmount)}) · valid to{' '}
                      {quotation.validUntil.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Dhaka' })}
                    </span>
                    <Badge tone={quotation.status === 'superseded' ? 'neutral' : quotation.status === 'accepted' ? 'success' : 'teal'}>
                      {quotation.status}
                    </Badge>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                      {quotation.createdByName} · {dateTime(quotation.createdAt)}
                    </span>
                  </div>
                ))}
              </div>
            ) : null}

            <QuotationBuilder
              refId={request.ref}
              defaultValidUntil={defaultValidUntil()}
              action={sendQuotation}
            />
          </div>
        </Panel>

        <Panel title={`History — ${request.events.length} ${request.events.length === 1 ? 'entry' : 'entries'}`}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <NoteForm refId={request.ref} action={addNote} />

            <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {request.events.map((event) => (
                <li key={event.id} style={{ display: 'flex', gap: 'var(--space-3)', paddingBottom: 'var(--space-3)', borderBottom: '1px solid var(--color-border)' }}>
                  <span style={{ flex: '0 0 auto', width: 28, height: 28, borderRadius: '50%', background: 'var(--navy-50)', color: 'var(--navy-700)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={event.type === 'note' ? 'message-circle' : event.type === 'assigned' ? 'users' : event.type === 'quotation_sent' ? 'ticket' : 'check-circle'} size={15} />
                  </span>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--navy-900)' }}>
                      {event.type === 'status_changed' && event.fromStatus && event.toStatus
                        ? `${STATUS_LABEL[event.fromStatus as RequestStatus]} → ${STATUS_LABEL[event.toStatus as RequestStatus]}`
                        : event.type === 'quotation_sent'
                          ? 'Quotation sent'
                          : event.type === 'assigned'
                            ? event.body
                            : 'Note'}
                    </div>
                    {event.type !== 'assigned' && event.body ? (
                      <div style={{ marginTop: 3, fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)', whiteSpace: 'pre-wrap' }}>{event.body}</div>
                    ) : null}
                    <div style={{ marginTop: 4, fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                      {event.actorName} · {dateTime(event.createdAt)}
                    </div>
                  </div>
                </li>
              ))}

              <li style={{ display: 'flex', gap: 'var(--space-3)' }}>
                <span style={{ flex: '0 0 auto', width: 28, height: 28, borderRadius: '50%', background: 'var(--teal-50)', color: 'var(--teal-700)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="check-circle" size={15} />
                </span>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--navy-900)' }}>Request submitted</div>
                  <div style={{ marginTop: 4, fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                    {request.name} · {dateTime(request.createdAt)}
                  </div>
                </div>
              </li>
            </ol>
          </div>
        </Panel>
      </div>
    </>
  );
}
