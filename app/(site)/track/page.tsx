import type { Metadata } from 'next';
import { TrackLookup } from '@/components/screens/TrackLookup.jsx';
import { lookupRequest } from './actions';

export const metadata: Metadata = {
  title: 'Follow your request — YesTourBD',
  description: 'Check the status of a quote request with its reference and the mobile number you used.',
};

export default function TrackPage() {
  return <TrackLookup action={lookupRequest} />;
}
