import { useQueryData } from '@/shared/lib';
import { queryKeys } from '@/shared/api';
import { quoteApi } from '../api/quoteApi';
import type { QuoteRequest } from '../model/requestStore';

/**
 * The quote requests of the caller (the buyer asks, the seller answers).
 */
export function useQuoteRequestList() {
  return useQueryData(queryKeys.quote.requests(), () => quoteApi.getRequests());
}

/** One quote request with its quotes. */
export function useQuoteRequest(requestId: string | null) {
  return useQueryData(queryKeys.quote.detail(requestId ?? ''), () =>
    requestId ? quoteApi.getRequestById(requestId) : Promise.resolve(null),
  );
}

export type { QuoteRequest };
