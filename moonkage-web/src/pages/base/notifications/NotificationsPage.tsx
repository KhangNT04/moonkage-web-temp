import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Tabs, EmptyState } from '@/shared/ui';
import { formatDateTime } from '@/shared/utils';
import { useNotifications, markAllNotificationsAsRead, markNotificationAsRead, type Notification } from '@/entities/notification';
import styles from './NotificationsPage.module.css';

type NotifTab = 'ALL' | 'ORDER' | 'QUOTE' | 'MAKET' | 'DISPUTE';

export function NotificationsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<NotifTab>('ALL');
  const notifications = useNotifications();

  const filtered = notifications.filter(n => {
    if (activeTab === 'ORDER') return n.type === 'ORDER';
    if (activeTab === 'QUOTE') return n.type === 'QUOTE';
    if (activeTab === 'MAKET') return n.type === 'MAKET';
    if (activeTab === 'DISPUTE') return n.type === 'DISPUTE';
    return true;
  });

  const handleMarkAllRead = () => {
    markAllNotificationsAsRead();
  };

  const handleItemClick = (n: Notification) => {
    markNotificationAsRead(n.id);
    if (n.targetPath) {
      navigate(n.targetPath);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Trung tâm thông báo (M6.6)</h1>
          <p className={styles.desc}>
            Cập nhật trạng thái tiến độ đơn hàng, duyệt Maket thiết kế, báo giá mới và phán quyết khiếu nại.
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={handleMarkAllRead}>
          ✓ Đánh dấu đã đọc tất cả
        </Button>
      </div>

      <Tabs
        items={[
          { id: 'ALL', label: `Tất cả (${notifications.length})` },
          { id: 'ORDER', label: 'Đơn hàng' },
          { id: 'QUOTE', label: 'Báo giá B2B' },
          { id: 'MAKET', label: 'Duyệt Maket' },
          { id: 'DISPUTE', label: 'Khiếu nại & Escrow' },
        ]}
        activeId={activeTab}
        onChange={(id) => setActiveTab(id as NotifTab)}
      />

      {filtered.length === 0 ? (
        <EmptyState
          icon="bell"
          title="Không có thông báo nào"
          description="Tất cả thông báo về đơn hàng và báo giá sẽ xuất hiện tại đây."
        />
      ) : (
        <div className={styles.list}>
          {filtered.map(n => (
            <Card
              key={n.id}
              className={`${styles.itemCard} ${!n.isRead ? styles.unread : ''}`}
              onClick={() => handleItemClick(n)}
            >
              <div className={styles.iconWrap}>
                <span className={styles.icon}>
                  {n.type === 'ORDER' ? '📦' :
                   n.type === 'QUOTE' ? '📝' :
                   n.type === 'MAKET' ? '🎨' :
                   n.type === 'DISPUTE' ? '⚖️' : '🔔'}
                </span>
              </div>

              <div className={styles.body}>
                <div className={styles.titleRow}>
                  <strong className={styles.itemTitle}>{n.title}</strong>
                  {!n.isRead && <span className={styles.newDot} />}
                </div>
                <p className={styles.itemMsg}>{n.content}</p>
                <span className={styles.itemTime}>{formatDateTime(n.createdAt)}</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
