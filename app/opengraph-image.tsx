import { ImageResponse } from 'next/og';
import { SITE_NAME } from '@/lib/seo';

// The card every route falls back to when it has no image of its own. /tours/[slug] overrides
// it with the listing photograph, which is always the better card.
//
// This is the one place raw hex is unavoidable. ImageResponse renders in a satori context with
// no stylesheet and no CSS custom properties, so `var(--color-brand-primary)` resolves to
// nothing and the card comes out black. The values below are --gradient-brand from
// design-system/tokens/colors.css — navy-700, navy-600, teal-500. Change them there first.

export const alt = `${SITE_NAME} — all-in-one travel marketplace`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '96px',
          background: 'linear-gradient(135deg, #0b3868 0%, #16497e 45%, #00988b 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: '-0.02em' }}>{SITE_NAME}</div>
        <div style={{ marginTop: 24, fontSize: 40, lineHeight: 1.3, color: '#d7e5f3' }}>
          Hotels, houseboats and tickets you can confirm right now
        </div>
        <div style={{ marginTop: 48, fontSize: 28, color: '#96e0d3' }}>
          Corporate tours, packages and visa help · reply within two working hours
        </div>
      </div>
    ),
    size,
  );
}
