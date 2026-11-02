import { useCallback } from 'react';
import { requestDisbursement } from '../api/requestDisbursementApi';
import type { DisbursementDto } from '@/entities/payment';

/**
 * The seller asks for a disbursement of an escrow ledger (FR-45).
 */
export function useRequestDisbursement() {
  return useCallback(
    (
      orderId: string,
      payload: { amount: number; purpose: 'DEPOSIT_RELEASE' | 'FINAL_RELEASE'; reason?: string },
    ): Promise<DisbursementDto | null> => requestDisbursement(orderId, payload),
    [],
  );
}
