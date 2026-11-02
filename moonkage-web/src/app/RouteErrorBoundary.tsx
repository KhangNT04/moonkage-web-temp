import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { Button, Card, Icon } from '@/shared/ui';
import styles from './RouteErrorBoundary.module.css';

export function RouteErrorBoundary() {
  const error = useRouteError();

  let errorMessage = 'Đã có sự cố bất ngờ xảy ra khi tải dữ liệu giao diện.';
  let statusCode = 500;

  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    errorMessage = error.statusText || error.data?.message || errorMessage;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className={styles.container} role="alert" aria-live="assertive">
      <Card padding="lg" className={styles.errorCard}>
        <div className={styles.iconWrap}>
          <Icon name="alert" size={48} />
        </div>
        <span className={styles.errorCode}>MÃ LỖI {statusCode}</span>
        <h2 className={styles.title}>Không thể hiển thị trang</h2>
        <p className={styles.message}>{errorMessage}</p>

        <div className={styles.actions}>
          <Button variant="primary" size="md" onClick={handleReload}>
            🔄 Tải lại trang
          </Button>
          <Link to="/" className={styles.homeLink}>
            Về trang chủ Moonkage
          </Link>
        </div>
      </Card>
    </div>
  );
}
