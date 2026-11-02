import { apiClient, GATEWAY, unwrap } from '@/shared/api';
import { isDemoMode } from '@/shared/config';
import { generateEntityId } from '@/shared/utils';
import type { CheckoutResponse, CreateCheckoutPayload } from '@/entities/order';

/**
 * The write side of the checkout (FR-08).
 *
 * The order entity owns the read and the shape of the order; the write lives
 * here because it creates the payment, not the order data
 * (package-architecture §3 — `api/` of a feature holds the writes).
 */

/**
 * Pay the whole cart once. The backend answers `CreateCheckoutResponse` with the
 * `paymentUrl` to redirect the buyer to and the `paymentId` the IPN will carry.
 */
export async function checkoutOrder(payload: CreateCheckoutPayload): Promise<CheckoutResponse> {
  if (isDemoMode()) {
    return {
      checkoutId: generateEntityId('chk'),
      paymentId: generateEntityId('pay'),
      paymentUrl: `/gateway/vnpay/${generateEntityId('pay')}`,
      totalAmount: 0,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    };
  }
  const res = await apiClient.post<unknown>(GATEWAY.ORDER.CHECKOUT, payload);
  const data = unwrap<CheckoutResponse>(res);
  if (!data || !data.checkoutId) {
    throw new Error('Máy chủ không trả về thông tin thanh toán.');
  }
  return data;
}
