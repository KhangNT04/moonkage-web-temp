import { createStore, useStore } from '@/shared/lib';
import { isDemoMode } from '@/shared/config';

export type Notification = {
  id: string;
  title: string;
  content: string;
  targetPath: string; // Mở thẳng trang liên quan (NFR-10, AC-10.2)
  createdAt: string;
  isRead: boolean;
  type: 'ORDER' | 'QUOTE' | 'MAKET' | 'DISPUTE' | 'SYSTEM';
};

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif_1',
    title: 'Maket hộp mới cần bạn duyệt',
    content: 'Xưởng Bánh Cô Hoa vừa tải lên maket bản 1 cho đơn #MK-9821.',
    targetPath: '/tai-khoan/don-hang/MK-9821',
    createdAt: '2026-10-22T08:31:00Z',
    isRead: false,
    type: 'MAKET',
  },
  {
    id: 'notif_2',
    title: 'Báo giá mới cho yêu cầu #REQ-502',
    content: 'Bảo An Bakery vừa gửi bảng báo giá 155.000đ/hộp.',
    targetPath: '/tai-khoan/yeu-cau/REQ-502',
    createdAt: '2026-10-19T14:20:00Z',
    isRead: false,
    type: 'QUOTE',
  },
  {
    id: 'notif_3',
    title: 'Đơn hàng #MK-1042 đã giao thành công',
    content: 'Đơn hàng đã được giao đến bạn. Nhớ kiểm tra và báo vấn đề nếu có.',
    targetPath: '/tai-khoan/don-hang/MK-1042',
    createdAt: '2026-10-25T14:02:00Z',
    isRead: true,
    type: 'ORDER',
  },
];

/**
 * The notifications of the caller.
 *
 * `orchestrator-service` does not publish a REST endpoint for them yet
 * (`NOT_IMPLEMENTED_YET.NOTIFICATIONS`), so the list stays empty outside demo
 * mode rather than showing made-up entries.
 */
export const notificationStore = createStore<Notification[]>(
  isDemoMode() ? MOCK_NOTIFICATIONS : [],
  isDemoMode() ? 'moonkage_notifications' : undefined
);

export function useNotifications() {
  return useStore(notificationStore);
}

export function useUnreadNotificationsCount() {
  const notifs = useNotifications();
  return notifs.filter((n) => !n.isRead).length;
}

export function markNotificationAsRead(id: string) {
  notificationStore.set((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
}

/** Mark every notification of the caller as read. */
export function markAllNotificationsAsRead() {
  notificationStore.set((prev) => prev.map((n) => ({ ...n, isRead: true })));
}
