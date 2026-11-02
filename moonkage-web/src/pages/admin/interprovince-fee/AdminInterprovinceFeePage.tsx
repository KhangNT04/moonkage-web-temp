import styles from './AdminInterprovinceFeePage.module.css';
import { useState } from 'react';
import { routes } from '@/shared/config';
import { Button, ButtonLink, Card, Breadcrumbs, toast } from '@/shared/ui';

export function AdminInterprovinceFeePage() {
  const [baseFee, setBaseFee] = useState(35000);
  const [coldBoxSurcharge, setColdBoxSurcharge] = useState(25000);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    toast.success('Đã lưu cấu hình biểu phí vận chuyển liên tỉnh toàn sàn!');
  }

  return (
    <div className={styles.page}>
      <Breadcrumbs
        items={[
          { label: 'Quản Trị', to: routes.admin.overview },
          { label: 'Cấu hình hệ thống', to: routes.admin.config },
          { label: 'Biểu phí liên tỉnh' },
        ]}
      />

      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>
            Biểu Phí Vận Chuyển Liên Tỉnh & Xe Lạnh (Q6.1)
          </h1>
          <p className={styles.subtitle}>
            Quy định mức trần cước phí vận chuyển bánh Trung Thu bảo quản đặc biệt giữa các tỉnh thành
          </p>
        </div>
      </div>

      <Card padding="lg" className={styles.form}>
        <form onSubmit={handleSave} className={styles.stack}>
          <div>
            <label className={styles.label}>
              Cước phí cơ bản liên tỉnh (VNĐ / kg đầu)
            </label>
            <input
              type="number"
              value={baseFee}
              onChange={(e) => setBaseFee(Number(e.target.value))}
              className={styles.input}
            />
          </div>

          <div>
            <label className={styles.label}>
              Phụ phí xe thùng lạnh bảo quản bánh tươi/bánh dẻo lạnh (VNĐ / đơn)
            </label>
            <input
              type="number"
              value={coldBoxSurcharge}
              onChange={(e) => setColdBoxSurcharge(Number(e.target.value))}
              className={styles.input}
            />
          </div>

          <div className={styles.actions}>
            <Button type="submit" variant="primary">
              Lưu Biểu Phí Toàn Sàn
            </Button>
            <ButtonLink to={routes.admin.config} variant="outline">
              Quay Lại
            </ButtonLink>
          </div>
        </form>
      </Card>
    </div>
  );
}

