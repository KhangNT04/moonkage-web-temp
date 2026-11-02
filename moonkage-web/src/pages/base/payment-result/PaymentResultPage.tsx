import { useLocation } from 'react-router-dom';
import { routes } from '@/shared/config';
import { formatCurrency } from '@/shared/utils';
import { Badge, ButtonLink, Card, Icon } from '@/shared/ui';
import styles from './PaymentResultPage.module.css';

type PaymentResultState = {
  success: boolean;
  paymentId: string;
  amount: number;
  orderIds: string[];
};

export function PaymentResultPage() {
  const location = useLocation();
  const state = (location.state as PaymentResultState | null) || {
    success: true,
    paymentId: 'PAY_MOCK_102',
    amount: 975000,
    orderIds: ['MK-1042'],
  };

  return (
    <div className={styles.container}>
      <Card padding="lg" className={styles.resultCard}>
        <div className={styles.successIconWrap}>
          <Icon name="check" size={40} />
        </div>

        <Badge tone="green" size="md">THANH TOÁN THÀNH CÔNG (M4.3)</Badge>
        <h1 className={styles.title}>Đơn hàng đã được xác nhận thanh toán</h1>
        <p className={styles.desc}>
          Khoản tiền {formatCurrency(state.amount || 0)} đã được ký quỹ an toàn qua VNPay. Người bán đã nhận được đơn và sẽ tiến hành đóng gói bánh gửi tới bạn.
        </p>

        {/* BR-25, AC-09.7: Hiện N đơn vừa tạo, nhóm theo lần thanh toán; chỉ hiển thị, không đổi trạng thái */}
        <div className={styles.ordersBox}>
          <div className={styles.ordersBoxHeader}>
            <span>Các đơn hàng trong lần thanh toán này:</span>
            <span>Mã GD: <code>{state.paymentId}</code></span>
          </div>

          <div className={styles.orderList}>
            {(state.orderIds || ['MK-1042']).map((id: string) => (
              <div key={id} className={styles.orderItem}>
                <div className={styles.orderIdTitle}>
                  <Icon name="package" size={16} /> Đơn hàng <strong>#{id}</strong>
                </div>
                <div className={styles.orderActions}>
                  <ButtonLink to={routes.account.order(id)} variant="secondary" size="sm">
                    Xem chi tiết đơn này
                  </ButtonLink>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <ButtonLink to={routes.account.orders} variant="primary" iconLeft="package">
            Về danh sách đơn hàng của tôi
          </ButtonLink>
          <ButtonLink to={routes.base.catalog} variant="secondary">
            Tiếp tục mua sắm
          </ButtonLink>
        </div>
      </Card>
    </div>
  );
}

