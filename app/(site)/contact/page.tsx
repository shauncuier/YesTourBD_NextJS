import type { Metadata } from 'next';
import { ContactScreen } from '@/components/screens/ContactScreen.jsx';
import { submitSupportMessage } from './actions';

export const metadata: Metadata = {
  title: 'Contact & support',
  description:
    'Talk to a coordinator about a booking, a quotation or a refund. Open 9 AM to 10 PM, seven days, with a reply within two working hours.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return <ContactScreen action={submitSupportMessage} />;
}
