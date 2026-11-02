import { Card, Button, toast } from '@/shared/ui';
import styles from './AddressesPage.module.css';

export function AddressesPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Địa chỉ nhận hàng đã lưu (M6.3, FR-03)</h3>
        <Button variant="primary" size="sm" iconLeft="plus" onClick={() => toast.info('Mở hộp thoại thêm địa chỉ giao hàng mới')}>
          Thêm địa chỉ mới
        </Button>
      </div>

      <div className={styles.list}>
        <Card padding="md" className={styles.card}>
          <div className={styles.topRow}>
            <div>
              <strong>Văn phòng công ty (Mặc định)</strong>
              <p>Tầng 18, Tòa tháp Capital Place, 29 Liễu Giai, Ba Đình, Hà Nội</p>
            </div>
            <span className={styles.badgeDef}>Mặc định</span>
          </div>
          <div className={styles.bottomRow}>
            <span>Người nhận: Chị Lan · 0918889999</span>
            <div className={styles.actions}>
              <button type="button" className={styles.editBtn}>Sửa</button>
            </div>
          </div>
        </Card>

        <Card padding="md" className={styles.card}>
          <div className={styles.topRow}>
            <div>
              <strong>Nhà riêng</strong>
              <p>180 Triệu Việt Vương, Quận Hai Bà Trưng, Hà Nội</p>
            </div>
          </div>
          <div className={styles.bottomRow}>
            <span>Người nhận: Anh Minh · 0903123456</span>
            <div className={styles.actions}>
              <button type="button" className={styles.editBtn}>Sửa</button>
              <button type="button" className={styles.delBtn}>Xóa</button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

