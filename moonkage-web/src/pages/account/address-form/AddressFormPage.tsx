import styles from './AddressFormPage.module.css';
import { useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { routes } from '@/shared/config';
import { Button, Card, Input, Breadcrumbs, toast } from '@/shared/ui';

export function AddressFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id && id !== 'moi');

  const [label, setLabel] = useState(isEdit ? 'Văn phòng công ty' : '');
  const [recipient, setRecipient] = useState(isEdit ? 'Chị Lan' : '');
  const [phone, setPhone] = useState(isEdit ? '0918889999' : '');
  const [province, setProvince] = useState(isEdit ? 'Hà Nội' : 'Hà Nội');
  const [district, setDistrict] = useState(isEdit ? 'Ba Đình' : '');
  const [street, setStreet] = useState(isEdit ? '29 Liễu Giai, Capital Place' : '');
  const [isDefault, setIsDefault] = useState(isEdit);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    toast.success(isEdit ? 'Đã cập nhật địa chỉ thành công!' : 'Đã thêm địa chỉ giao bánh mới!');
    navigate(routes.account.addresses);
  }

  return (
    <div className={styles.page}>
      <Breadcrumbs
        items={[
          { label: 'Tài khoản', to: routes.account.overview },
          { label: 'Sổ địa chỉ', to: routes.account.addresses },
          { label: isEdit ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới' },
        ]}
      />

      <div className={styles.header}>
        <h1 className={styles.title}>
          {isEdit ? 'Cập Nhật Địa Chỉ Nhận Hàng' : 'Thêm Địa Chỉ Nhận Hàng Mới'}
        </h1>
      </div>

      <Card padding="lg" className={styles.lead}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label className={styles.label}>
              Nhãn gợi nhớ (Ví dụ: Nhà riêng, Văn phòng, Kho xưởng) *
            </label>
            <Input
              type="text"
              placeholder="Văn phòng công ty"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              required
            />
          </div>

          <div className={styles.gridTwo}>
            <div>
              <label className={styles.label}>
                Tên người nhận hàng *
              </label>
              <Input
                type="text"
                placeholder="Nguyễn Văn A"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                required
              />
            </div>
            <div>
              <label className={styles.label}>
                Số điện thoại liên hệ *
              </label>
              <Input
                type="tel"
                placeholder="0912 345 678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.gridTwo}>
            <div>
              <label className={styles.label}>
                Tỉnh / Thành phố *
              </label>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className={styles.input}
              >
                <option value="Hà Nội">Hà Nội</option>
                <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
                <option value="Hải Phòng">Hải Phòng</option>
                <option value="Cần Thơ">Cần Thơ</option>
              </select>
            </div>
            <div>
              <label className={styles.label}>
                Quận / Huyện *
              </label>
              <Input
                type="text"
                placeholder="Quận Ba Đình"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className={styles.label}>
              Số nhà, tên đường, tòa nhà *
            </label>
            <Input
              type="text"
              placeholder="Tầng 18, Tòa Capital Place, 29 Liễu Giai"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
            />
          </div>

          <label className={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
            />
            <span className={styles.checkboxLabel}>Đặt làm địa chỉ nhận hàng mặc định</span>
          </label>

          <div className={styles.actions}>
            <Button type="submit" variant="primary">
              {isEdit ? 'Lưu Thay Đổi' : 'Thêm Địa Chỉ'}
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate(routes.account.addresses)}>
              Hủy
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

