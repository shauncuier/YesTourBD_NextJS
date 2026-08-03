import { describe, expect, it } from 'vitest';
import { parseQueueFilters } from '@/lib/quote-queue-filters';

// The filters come from the query string, which anyone can type into. Nothing here should
// throw or widen the query beyond what the coordinator asked for.
describe('queue filters', () => {
  it('defaults to open requests, oldest first', () => {
    expect(parseQueueFilters({})).toEqual({ status: 'open', search: '', sort: 'oldest' });
  });

  it('accepts the statuses the pipeline defines', () => {
    expect(parseQueueFilters({ status: 'quoted' }).status).toBe('quoted');
    expect(parseQueueFilters({ status: 'all' }).status).toBe('all');
  });

  it('falls back rather than trusting an unknown status', () => {
    expect(parseQueueFilters({ status: 'urgent' }).status).toBe('open');
    expect(parseQueueFilters({ status: '' }).status).toBe('open');
    // A repeated param arrives as an array.
    expect(parseQueueFilters({ status: ['lost', 'quoted'] }).status).toBe('lost');
  });

  it('only sorts the two ways the UI offers', () => {
    expect(parseQueueFilters({ sort: 'newest' }).sort).toBe('newest');
    expect(parseQueueFilters({ sort: 'price' }).sort).toBe('oldest');
  });

  it('trims and caps the search term', () => {
    expect(parseQueueFilters({ q: '  REQ-2261 ' }).search).toBe('REQ-2261');
    expect(parseQueueFilters({ q: 'x'.repeat(200) }).search).toHaveLength(80);
  });
});
