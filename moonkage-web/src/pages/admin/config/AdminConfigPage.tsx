import { useState } from 'react';
import { Tabs } from '@/shared/ui';
import {
  AdminFeesTab,
  AdminShippingTab,
  AdminTaxonomyTab,
} from '@/features/manage-cake-attributes';
import styles from './AdminConfigPage.module.css';

type AdminConfigTab = 'TAXONOMY' | 'SHIPPING' | 'FEES';

export function AdminConfigPage() {
  const [activeTab, setActiveTab] = useState<AdminConfigTab>('TAXONOMY');

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Cấu hình quy tắc & Tham số sàn (Q6.1 - Q6.4)</h1>
          <p className={styles.desc}>
            Quản trị danh mục Vỏ &amp; Nhân (FR-54), biểu phí ship liên tỉnh và chính sách phí nền
            tảng toàn sàn.
          </p>
        </div>
      </div>

      <Tabs<AdminConfigTab>
        items={[
          { id: 'TAXONOMY', label: '1. Danh mục Vỏ & Nhân bánh (FR-54, Q6.4)' },
          { id: 'SHIPPING', label: '2. Biểu phí ship liên tỉnh (Q6.1)' },
          { id: 'FEES', label: '3. Phí mở bán & Chiết khấu sàn (Q6.2)' },
        ]}
        activeId={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === 'TAXONOMY' && <AdminTaxonomyTab />}
      {activeTab === 'SHIPPING' && <AdminShippingTab />}
      {activeTab === 'FEES' && <AdminFeesTab />}
    </div>
  );
}
