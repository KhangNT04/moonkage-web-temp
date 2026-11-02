import { useCallback } from 'react';
import { reviewDisbursement } from '../api/approveDisbursementApi';
import type { DisbursementDto } from '@/entities/payment';

/**
 * The admin approves or refuses a disbursement request (FR-47).
 */
export function useApproveDisbursement() {
  return useCallback(
    (
      orderId: string,
      requestId: string,
      approve: boolean,
      amount?: number,
    ): Promise<DisbursementDto | null> =>
      reviewDisbursement(orderId, requestId, approve, amount),
    [],
  );
}
