import { apiClient, GATEWAY, unwrap } from '@/shared/api';
import { isDemoMode } from '@/shared/config';
import type { DisbursementDto } from '@/entities/payment';

/**
 * The write side of the admin's review of a disbursement (FR-47).
 *
 * The payment entity owns the read and the shape of the money; the write lives
 * here because it decides the request, not the ledger data
 * (package-architecture §3 — `api/` of a feature holds the writes).
 */

/** FR-47: an admin approves or rejects a disbursement request. */
export async function reviewDisbursement(
  orderId: string,
  requestId: string,
  approved: boolean,
  approvedAmount?: number
): Promise<DisbursementDto | null> {
  if (isDemoMode()) {
    return null;
  }
  const res = await apiClient.patch<unknown>(
    GATEWAY.PAYMENT.LEDGER_DISBURSEMENT_REVIEW(orderId, requestId),
    { approved, approvedAmount }
  );
  return unwrap<DisbursementDto>(res);
}
