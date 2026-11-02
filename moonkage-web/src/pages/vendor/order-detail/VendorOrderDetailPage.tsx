import styles from './VendorOrderDetailPage.module.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { routes } from '@/shared/config';
import { formatCurrency } from '@/shared/utils';
import { Badge, Button, ButtonLink, Card, Breadcrumbs, toast } from '@/shared/ui';
import { useOrders } from '@/entities/order';

export function VendorOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const orders = useOrders();
  const order = orders.find((o) => o.id === id) || orders[0];
  const [productionStep, setProductionStep] = useState<number>(2);

  if (!order) {
    return (
      <div>
        <p>Không tìm thấy đơn hàng xưởng.</p>
        <ButtonLink to={routes.vendor.orders}>Về danh sách đơn</ButtonLink>
      </div>
    );
  }

  const steps = [
    { title: 'Nhận đơn & Chuẩn bị nguyên liệu', desc: 'Kiểm tra bột, trứng muối, hạt điều, mè rang' },
    { title: 'Trộn nhân & Nướng bánh mẻ 1', desc: 'Nướng ở nhiệt độ 200°C, quét lòng đỏ trứng gà tươi' },
    { title: 'Hút ẩm, Đóng gói & Dán tem NFC', desc: 'Dán tem NFC định danh truy xuất nguồn gốc' },
    { title: 'Đóng thùng & Bàn giao Shipper', desc: 'Giao cho đối tác vận chuyển giao tận nơi' },
  ];

  function handleAdvanceStep() {
    if (productionStep < steps.length - 1) {
      setProductionStep((prev) => prev + 1);
      toast.success(`Đã cập nhật tiến độ: "${steps[productionStep + 1].title}"! Khách hàng đã nhận được thông báo.`);
    } else {
      toast.success('Đơn hàng đã hoàn tất sản xuất và bàn giao vận chuyển!');
    }
  }

  return (
    <div className={styles.page}>
      <Breadcrumbs
        items={[
          { label: 'Kênh Xưởng', to: routes.vendor.overview },
          { label: 'Quản lý đơn hàng', to: routes.vendor.orders },
          { label: `Đơn hàng #${order.id}` },
        ]}
      />

      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>
            Xử Lý Đơn Hàng #{order.id} (B2.1, B2.2)
          </h1>
          <p className={styles.subtitle}>
            Ngày đặt: {order.createdAt} · Khách hàng: {order.buyerName} ({order.shippingAddress.phone})
          </p>
        </div>
        <Badge tone={order.status === 'DELIVERED' ? 'green' : 'gold'} size="md">
          {order.status === 'DELIVERED' ? 'Đã giao thành công' : 'Đang xử lý sản xuất'}
        </Badge>
      </div>

      <div className={styles.gridTwo}>
        <Card padding="lg" className={styles.cardBody}>
          <h2 className={styles.sectionTitle}>Sản Phẩm Cần Chế Biến</h2>
          <div className={styles.stack}>
            {order.items.map((it, idx) => (
              <div key={idx} className={styles.productRow}>
                <img
                  src={it.image || '/images/banh-nuong.jpg'}
                  alt={it.name}
                  className={styles.productImage}
                  loading="lazy"
                  decoding="async"
                />
                <div className={styles.productInfo}>
                  <div className={styles.productName}>{it.name}</div>
                  <div className={styles.productMeta}>
                    Số lượng: <strong>{it.quantity}</strong> × {formatCurrency(it.price)}
                  </div>
                </div>
                <div className={styles.priceStrong}>
                  {formatCurrency(it.quantity * it.price)}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summaryBox}>
            <div className={styles.summaryRow}>
              <span>Địa chỉ giao hàng:</span>
              <strong className={styles.summaryRight}>
                {order.shippingAddress.address}, {order.shippingAddress.province}
              </strong>
            </div>
            <div className={styles.totalRow}>
              <span>Trạng thái tiền ký quỹ Escrow:</span>
              <span className={styles.totalStrong}>Đã phong tỏa đủ 100%</span>
            </div>
          </div>
        </Card>

        <Card padding="lg" className={styles.stackWide}>
          <h2 className={styles.sectionTitle}>Tiến Độ Chế Biến & Kiểm Tra NFC</h2>

          <div className={styles.cardBody}>
            {steps.map((st, i) => (
              <div key={i} className={styles.progressRow}>
                <div
                  className={`${styles.stepBadge} ${i <= productionStep ? styles.stepBadgeDone : styles.stepBadgePending}`}
                >
                  {i <= productionStep ? '✓' : i + 1}
                </div>
                <div className={styles.productInfo}>
                  <div className={`${styles.stepTitle} ${i > productionStep ? styles.stepTitlePending : ''}`}>
                    {st.title}
                  </div>
                  <div className={styles.productMeta}>{st.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.timelineRow}>
            <Button
              variant="primary"
              className={styles.productInfo}
              onClick={handleAdvanceStep}
              disabled={productionStep >= steps.length - 1}
            >
              {productionStep >= steps.length - 1 ? 'Đã Bàn Giao Vận Chuyển' : 'Chuyển Sang Bước Kế Tiếp'}
            </Button>
            <ButtonLink to={routes.vendor.orders} variant="outline">
              Về Danh Sách
            </ButtonLink>
          </div>
        </Card>
      </div>
    </div>
  );
}

