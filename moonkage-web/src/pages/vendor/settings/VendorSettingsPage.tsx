import { useState, type FormEvent } from 'react';
import { Tabs } from '@/shared/ui';
import {
  VendorConditionsSettingsTab,
  VendorLegalSettingsTab,
  VendorShippingSettingsTab,
  type VendorSellingMode,
} from '@/features/edit-vendor-settings';
import styles from './VendorSettingsPage.module.css';

type SettingsTab = 'LEGAL' | 'SHIPPING' | 'CONDITIONS';

export function VendorSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('LEGAL');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // B6.1 Pháp lý
  const [businessType, setBusinessType] = useState('HKD'); // HKD or DNTN per BR-33
  const [businessName, setBusinessName] = useState('Hộ kinh doanh Bánh Cổ Truyền Đông Phương');
  const [taxCode, setTaxCode] = useState('0201199281');
  const [representative, setRepresentative] = useState('Bà Phạm Thị Lan');
  const [representativeCccd] = useState('031182001928');
  const [address, setAddress] = useState('172 Cầu Đất, Ngô Quyền, Hải Phòng');

  // B6.2 Vùng giao hàng
  const [shippingScope, setShippingScope] = useState('NATIONWIDE'); // LOCAL, REGIONAL, NATIONWIDE
  const [freeShipThreshold, setFreeShipThreshold] = useState('500000');
  const [expressSupported, setExpressSupported] = useState(true);

  // B6.3 Điều kiện nhận đặt hàng (BR-21, Flow 3)
  const [sellingMode, setSellingMode] = useState<VendorSellingMode>('BOTH');
  const [minBulkQuantity, setMinBulkQuantity] = useState('50');
  const [minLeadTimeDays, setMinLeadTimeDays] = useState('7');
  const [defaultDepositPercent, setDefaultDepositPercent] = useState('40');
  const [customBoxService, setCustomBoxService] = useState(true);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Cài đặt gian hàng (B6.1 - B6.3)</h1>
          <p className={styles.desc}>
            Thông tin pháp lý Hộ kinh doanh/DNTN (BR-33), vùng phục vụ giao hàng và điều kiện nhận đơn đặt hàng doanh nghiệp.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className={styles.alertSuccess}>
          ✓ Đã lưu thay đổi cấu hình gian hàng thành công!
        </div>
      )}

      <Tabs
        items={[
          { id: 'LEGAL', label: '1. Pháp lý & Gian hàng (B6.1)' },
          { id: 'SHIPPING', label: '2. Vùng giao hàng (B6.2)' },
          { id: 'CONDITIONS', label: '3. Điều kiện nhận đặt hàng (B6.3)' },
        ]}
        activeId={activeTab}
        onChange={(id) => setActiveTab(id as SettingsTab)}
      />

      <form onSubmit={handleSave}>
        {activeTab === 'LEGAL' && (
          <VendorLegalSettingsTab
            businessType={businessType}
            businessName={businessName}
            taxCode={taxCode}
            representative={representative}
            representativeCccd={representativeCccd}
            address={address}
            onBusinessTypeChange={setBusinessType}
            onBusinessNameChange={setBusinessName}
            onTaxCodeChange={setTaxCode}
            onRepresentativeChange={setRepresentative}
            onAddressChange={setAddress}
          />
        )}

        {activeTab === 'SHIPPING' && (
          <VendorShippingSettingsTab
            shippingScope={shippingScope}
            freeShipThreshold={freeShipThreshold}
            expressSupported={expressSupported}
            onShippingScopeChange={setShippingScope}
            onFreeShipThresholdChange={setFreeShipThreshold}
            onExpressSupportedChange={setExpressSupported}
          />
        )}

        {activeTab === 'CONDITIONS' && (
          <VendorConditionsSettingsTab
            sellingMode={sellingMode}
            minBulkQuantity={minBulkQuantity}
            minLeadTimeDays={minLeadTimeDays}
            defaultDepositPercent={defaultDepositPercent}
            customBoxService={customBoxService}
            onSellingModeChange={setSellingMode}
            onMinBulkQuantityChange={setMinBulkQuantity}
            onMinLeadTimeDaysChange={setMinLeadTimeDays}
            onDefaultDepositPercentChange={setDefaultDepositPercent}
            onCustomBoxServiceChange={setCustomBoxService}
          />
        )}
      </form>
    </div>
  );
}
