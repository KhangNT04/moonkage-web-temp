import { Button, Card, CardHeader, Input, Select } from '@/shared/ui';
import styles from './vendorSettingsUi.module.css';

interface VendorShippingSettingsTabProps {
  shippingScope: string;
  freeShipThreshold: string;
  expressSupported: boolean;
  onShippingScopeChange: (value: string) => void;
  onFreeShipThresholdChange: (value: string) => void;
  onExpressSupportedChange: (value: boolean) => void;
}

/** B6.2: cấu hình phạm vi giao hàng & phí ship. */
export function VendorShippingSettingsTab({
  shippingScope,
  freeShipThreshold,
  expressSupported,
  onShippingScopeChange,
  onFreeShipThresholdChange,
  onExpressSupportedChange,
}: VendorShippingSettingsTabProps) {
  return (
    <Card className={styles.formCard}>
      <CardHeader
        title="Cấu hình phạm vi giao hàng & Phí ship (B6.2)"
        description="Tích hợp biểu phí giao hàng liên tỉnh theo quy định của Admin sàn Moonkage"
      />

      <div className={styles.formBody}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Phạm vi nhận giao hàng</label>
          <Select
            value={shippingScope}
            onChange={(e) => onShippingScopeChange(e.target.value)}
            options={[
              { value: 'LOCAL', label: 'Chỉ nội tỉnh / thành phố cơ sở' },
              { value: 'REGIONAL', label: 'Miền Bắc (Hà Nội, Hải Phòng, Quảng Ninh...)' },
              { value: 'NATIONWIDE', label: 'Toàn quốc (có kho bảo quản vận chuyển)' },
            ]}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Đơn hàng đạt giá trị miễn phí vận chuyển (VNĐ)</label>
          <Input
            type="number"
            value={freeShipThreshold}
            onChange={(e) => onFreeShipThresholdChange(e.target.value)}
            placeholder="500000"
          />
        </div>

        <div className={styles.checkboxRow}>
          <input
            type="checkbox"
            id="express"
            checked={expressSupported}
            onChange={(e) => onExpressSupportedChange(e.target.checked)}
          />
          <label htmlFor="express">
            Hỗ trợ giao hàng hỏa tốc trong 2 giờ nội thành (Áp dụng cho bánh tươi hạn ngắn)
          </label>
        </div>

        <div className={styles.formActions}>
          <Button type="submit" variant="primary">
            Lưu cấu hình giao hàng
          </Button>
        </div>
      </div>
    </Card>
  );
}
