import type { DisbursementDto, LedgerDto } from '../api/ledgerApi';

/**
 * Một lệnh giải ngân của gian hàng (Q4.1).
 *
 * Gom DTO của backend (`DisbursementResponse`) và sổ quỹ (`LedgerResponse`) vào
 * một kiểu mà các màn hình quản trị dùng chung.
 */
export interface PayoutRequest {
  requestId: string;
  orderId: string;
  vendorId: string;
  vendorName: string;
  amount: number;
  purpose: string;
  status: string;
  reason?: string | null;
  createdAt?: string;
  decidedAt?: string | null;
}

/** Nhãn tiếng Việt của mục đích giải ngân. */
export function payoutPurposeLabel(purpose: string): string {
  return purpose === 'DEPOSIT_RELEASE'
    ? 'Giải ngân tiền cọc (Khách đã duyệt Maket)'
    : 'Đối soát cuối kỳ';
}

/** Map DTO của backend và sổ quỹ sang lệnh giải ngân cho UI. */
export function toPayoutRequest(
  disbursement: DisbursementDto & { ledger: LedgerDto },
  vendorName = ''
): PayoutRequest {
  return {
    requestId: disbursement.requestId,
    orderId: disbursement.orderId ?? disbursement.ledger.orderId,
    vendorId: disbursement.ledger.vendorId ?? '',
    vendorName,
    amount: disbursement.amount ?? 0,
    purpose: disbursement.purpose ?? 'FINAL_RELEASE',
    status: disbursement.status ?? 'PENDING',
    reason: disbursement.reason,
    createdAt: disbursement.createdAt,
    decidedAt: disbursement.decidedAt,
  };
}
