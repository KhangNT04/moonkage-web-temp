import { Button, Input, Modal } from '@/shared/ui';
import type { CakeCrust, CakeFilling } from '@/entities/product';
import styles from './editProductUi.module.css';

interface ProductFormModalProps {
  open: boolean;
  /** Tên sản phẩm đang sửa; rỗng nghĩa là thêm mới. */
  editingName?: string | null;
  name: string;
  price: string;
  stock: string;
  description: string;
  selectedCrusts: CakeCrust[];
  selectedFillings: CakeFilling[];
  crusts: Array<{ code: string; name: string; isActive: boolean }>;
  fillings: Array<{ code: string; name: string; isActive: boolean }>;
  busy: boolean;
  errorMessage?: string | null;
  onNameChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onStockChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onToggleCrust: (crust: CakeCrust) => void;
  onToggleFilling: (filling: CakeFilling) => void;
  onClose: () => void;
  onSubmit: () => void;
}

/**
 * Form thêm / sửa sản phẩm của gian hàng (B4.1, FR-54).
 *
 * FR-54: sản phẩm bắt buộc gắn ít nhất một loại Vỏ và một loại Nhân.
 */
export function ProductFormModal({
  open,
  editingName,
  name,
  price,
  stock,
  description,
  selectedCrusts,
  selectedFillings,
  crusts,
  fillings,
  busy,
  errorMessage,
  onNameChange,
  onPriceChange,
  onStockChange,
  onDescriptionChange,
  onToggleCrust,
  onToggleFilling,
  onClose,
  onSubmit,
}: ProductFormModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editingName ? `Chỉnh sửa: ${editingName}` : 'Thêm sản phẩm mới (FR-54)'}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Hủy
          </Button>
          <Button variant="primary" loading={busy} onClick={onSubmit}>
            Lưu sản phẩm
          </Button>
        </>
      }
    >
      <div className={styles.modalBody}>
        {errorMessage && (
          <div className={styles.modalError}>⚠️ {errorMessage}</div>
        )}

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="product-name">
            Tên sản phẩm bánh trung thu *
          </label>
          <Input
            id="product-name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="VD: Bánh nướng Thập cẩm lạp xưởng trứng muối"
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.col}>
            <label className={styles.label} htmlFor="product-price">
              Giá bán niêm yết (VNĐ) *
            </label>
            <Input
              id="product-price"
              type="number"
              value={price}
              onChange={(e) => onPriceChange(e.target.value)}
              placeholder="135000"
            />
          </div>
          <div className={styles.col}>
            <label className={styles.label} htmlFor="product-stock">
              Số lượng tồn kho *
            </label>
            <Input
              id="product-stock"
              type="number"
              value={stock}
              onChange={(e) => onStockChange(e.target.value)}
              placeholder="100"
            />
          </div>
        </div>

        {/* FR-54 Taxonomy: Crusts */}
        <div className={styles.taxonomySection}>
          <span className={styles.label}>Vỏ bánh (FR-54: Chọn ít nhất 1 loại) *</span>
          <div className={styles.chipGroup}>
            {crusts
              .filter((c) => c.isActive)
              .map((c) => {
                const code = c.code as CakeCrust;
                const isSelected = selectedCrusts.includes(code);
                return (
                  <button
                    key={c.code}
                    type="button"
                    aria-pressed={isSelected}
                    className={`${styles.chip} ${isSelected ? styles.chipSelected : ''}`}
                    onClick={() => onToggleCrust(code)}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {c.name}
                  </button>
                );
              })}
          </div>
        </div>

        {/* FR-54 Taxonomy: Fillings */}
        <div className={styles.taxonomySection}>
          <span className={styles.label}>Nhân bánh (FR-54: Chọn ít nhất 1 loại) *</span>
          <div className={styles.chipGroup}>
            {fillings
              .filter((f) => f.isActive)
              .map((f) => {
                const code = f.code as CakeFilling;
                const isSelected = selectedFillings.includes(code);
                return (
                  <button
                    key={f.code}
                    type="button"
                    aria-pressed={isSelected}
                    className={`${styles.chip} ${isSelected ? styles.chipSelected : ''}`}
                    onClick={() => onToggleFilling(code)}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {f.name}
                  </button>
                );
              })}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="product-desc">
            Mô tả chi tiết &amp; hương vị
          </label>
          <textarea
            id="product-desc"
            className={styles.textarea}
            rows={3}
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Nguyên liệu sạch, công thức bí truyền gia truyền..."
          />
        </div>
      </div>
    </Modal>
  );
}
