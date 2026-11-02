import type { Order } from '../model/types';
import type { OrderDto, ProgressUpdate, ProgressUpdateDto, UiOrderStatus } from './orderDto';
const STATUS_MAP: Record<string, UiOrderStatus> = {
  PAID: 'PAID',
  CONFIRMED: 'CONFIRMED',
  SHIPPING: 'SHIPPING',
  DEPOSITED: 'DEPOSITED',
  AWAITING_MOCKUP_APPROVAL: 'WAITING_MAKET',
  IN_PRODUCTION: 'IN_PRODUCTION',
  READY_TO_SHIP: 'READY_TO_SHIP',
  DELIVERED: 'DELIVERED',
  COMPLETED: 'COMPLETED',
};

/** Map a backend status to the UI status; unknown statuses fall back to `PAID`. */
export function mapOrderStatus(status: string | undefined): UiOrderStatus {
  if (!status) return 'PAID';
  return STATUS_MAP[status] ?? 'PAID';
}

/** Backend `kind` is `BUY_NOW | CUSTOM_ORDER`; the UI type is `RETAIL | BULK`. */
export function mapOrderKind(kind: string | undefined): Order['type'] {
  return kind === 'CUSTOM_ORDER' ? 'BULK' : 'RETAIL';
}

export function mapOrderDtoToEntity(dto: OrderDto): Order {
  const subtotal = dto.itemsAmount ?? 0;
  const shippingFee = dto.shippingFee ?? 0;
  const total = dto.totalAmount ?? subtotal + shippingFee;

  return {
    id: dto.id,
    type: mapOrderKind(dto.kind),
    buyerId: dto.buyerAccountId || '',
    buyerName: dto.recipientName || '',
    vendorId: dto.vendorId || '',
    vendorName: dto.vendorName || '',
    createdAt: dto.createdAt || new Date().toISOString(),
    subtotal,
    shippingFee,
    total,
    depositAmount: dto.depositAmount ?? undefined,
    remainingAmount: dto.remainingAmount ?? undefined,
    remainingPaid: dto.remainingAmount === null || dto.remainingAmount === undefined ? true : false,
    status: mapOrderStatus(dto.status),
    deliveredAt: dto.deliveredAt,
    disputeDeadline: dto.complaintDeadline,
    hasDispute: false,
    trackingCode: dto.trackingCode,
    shippingAddress: {
      receiver: dto.recipientName || 'Khách hàng Moonkage',
      phone: dto.recipientPhone || '',
      address: dto.addressDetail || '',
      province: dto.provinceCode || '',
    },
    items: (dto.items ?? []).map((item) => ({
      name: item.productName,
      quantity: item.quantity,
      price: item.unitPrice,
      image: '/images/banh-nuong.jpg',
    })),
    hasInvoice: Boolean(dto.invoiceInfo),
    invoiceCompanyInfo: dto.invoiceInfo,
  };
}

/** Map a backend progress update to the UI entity. */
export function mapProgressUpdateDto(dto: ProgressUpdateDto): ProgressUpdate {
  return {
    milestone: dto.milestone,
    note: dto.note ?? undefined,
    photoKeys: dto.photoKeys ?? [],
    createdAt: dto.createdAt ?? new Date().toISOString(),
  };
}
