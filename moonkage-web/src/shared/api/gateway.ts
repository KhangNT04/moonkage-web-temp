import { ENV } from '@/shared/config/env';

/**
 * Gateway Endpoints Mapping
 * Chuẩn hóa 7 microservices của nền tảng Moonkage theo kiến trúc Spring Cloud Gateway
 * Đối chiếu trực tiếp với các Controller trong backend (api/)
 */
export const GATEWAY = {
  // 1. Identity & Auth Service (AccountController, AuthController, KycController)
  IDENTITY: {
    LOGIN: '/identity-service/api/auth/login',
    REGISTER: '/identity-service/api/auth/register',
    REFRESH: '/identity-service/api/auth/refresh-token', // AuthController: @PostMapping("/refresh-token")
    ME: '/identity-service/api/accounts/me',             // AccountController: @GetMapping("/api/accounts/me")
    UPDATE_PROFILE: '/identity-service/api/accounts/me', // AccountController: @PutMapping("/api/accounts/me")
    NFC_SESSIONS: '/identity-service/api/nfc/sessions',  // KycController: /api/nfc/sessions
    NFC_SESSION_BY_ID: (sessionId: string) => `/identity-service/api/nfc/sessions/${sessionId}`,
    NFC_SESSION_CARD: (sessionId: string) => `/identity-service/api/nfc/sessions/${sessionId}/card`,
    NFC_VERIFY_STATUS: '/identity-service/api/nfc/status',
    // AuthController: @PostMapping("/verify-account")
    VERIFY_ACCOUNT: '/identity-service/api/auth/verify-account',
    // AuthController: @PostMapping("/send-verify-account-otp")
    SEND_VERIFY_ACCOUNT_OTP: '/identity-service/api/auth/send-verify-account-otp',
    // AuthController: @PostMapping("/reset-password")
    RESET_PASSWORD: '/identity-service/api/auth/reset-password',
    // AuthController: @PostMapping("/send-reset-password-otp")
    SEND_RESET_PASSWORD_OTP: '/identity-service/api/auth/send-reset-password-otp',
  },

  // 2. Vendor Management Service (VendorController, SupplierController)
  VENDOR: {
    BASE: '/api/vendors',                                // VendorController: @GetMapping("/api/vendors")
    BY_ID: (id: string) => `/api/vendors/${id}`,
    REGISTER: '/api/vendors',                            // VendorController: @PostMapping("/api/vendors")
    SUPPLIERS: '/quotation-service/api/suppliers',       // SupplierController
    SUPPLIER_BY_ID: (id: string) => `/quotation-service/api/suppliers/${id}`,
    REGISTRATION_FEE_CONFIG: '/api/registration-fee-config',
    // CakeAttributeController: @RequestMapping("/api/cake-attributes")
    CAKE_ATTRIBUTES: '/api/cake-attributes',
    PAY_REGISTRATION_FEE: '/api/vendors/pay-fee',
    SUBMIT_LEGAL: '/api/vendors/legal-documents',
    // VendorController: @GetMapping("/api/vendors/{vendorId}/delivery-areas")
    DELIVERY_AREAS: (vendorId: string) => `/api/vendors/${vendorId}/delivery-areas`,
    // VendorController: @GetMapping("/api/vendors/{vendorId}/order-profile")
    ORDER_PROFILE: (vendorId: string) => `/api/vendors/${vendorId}/order-profile`,
    // VendorController: @PostMapping("/api/vendors/uploads")
    UPLOADS: '/api/vendors/uploads',
    // VendorController: @PostMapping("/api/vendors/{vendorId}/documents")
    DOCUMENTS: (vendorId: string) => `/api/vendors/${vendorId}/documents`,
    // VendorController: @GetMapping("/api/vendors/{vendorId}/documents/{documentId}")
    DOCUMENT_LINK: (vendorId: string, documentId: string) =>
      `/api/vendors/${vendorId}/documents/${documentId}`,
    // VendorController: @GetMapping("/api/vendors/{vendorId}/reviews")
    REVIEWS: (vendorId: string) => `/api/vendors/${vendorId}/reviews`,
    // VendorController: @GetMapping("/api/vendors/{vendorId}/owner-checks")
    OWNER_CHECKS: (vendorId: string) => `/api/vendors/${vendorId}/owner-checks`,
    // VendorController: @PostMapping("/api/vendors/{vendorId}/registration-fee-payments")
    REGISTRATION_FEE_PAYMENT: (vendorId: string) =>
      `/api/vendors/${vendorId}/registration-fee-payments`,
    // ProductController: @RequestMapping("/api/vendors/{vendorId}/products")
    PRODUCTS: (vendorId: string) => `/api/vendors/${vendorId}/products`,
    PRODUCT_BY_ID: (vendorId: string, productId: string) =>
      `/api/vendors/${vendorId}/products/${productId}`,
    // ProductController: @PostMapping("/api/vendors/{vendorId}/products/uploads")
    PRODUCT_UPLOADS: (vendorId: string) => `/api/vendors/${vendorId}/products/uploads`,
  },

  // 3. Catalog & Taxonomy Service (ProductController, CakeAttributes)
  CATALOG: {
    PRODUCTS: '/catalog-service/api/products',          // ProductController: /api/products
    PRODUCT_BY_ID: (id: string) => `/catalog-service/api/products/${id}`,
    CAKE_ATTRIBUTES: '/api/cake-attributes',             // Danh mục Vỏ & Nhân FR-54
    CRUSTS: '/api/cake-attributes/crusts',
    FILLINGS: '/api/cake-attributes/fillings',
  },

  // 4. Quotation Service - B2B Số lượng lớn (QuoteRequestController)
  QUOTATION: {
    BASE: '/quotation-service/api',
    REQUESTS: '/quotation-service/api/quote-requests',
    REQUEST_BY_ID: (id: string) => `/quotation-service/api/quote-requests/${id}`,
    SUBMIT_QUOTE: (requestId: string) => `/quotation-service/api/quote-requests/${requestId}/quotes`,
    REQUEST_QUOTES: (requestId: string) => `/quotation-service/api/quote-requests/${requestId}/quotes`,
    // QuoteRequestController: @GetMapping("/{requestId}/invitations")
    REQUEST_INVITATIONS: (requestId: string) =>
      `/quotation-service/api/quote-requests/${requestId}/invitations`,
    // QuoteRequestController: @PostMapping("/{requestId}/quotes/{quoteId}/acceptance")
    ACCEPT_QUOTE: (requestId: string, quoteId: string) =>
      `/quotation-service/api/quote-requests/${requestId}/quotes/${quoteId}/acceptance`,
    GET_ACCEPTANCE: (requestId: string, quoteId: string) =>
      `/quotation-service/api/quote-requests/${requestId}/quotes/${quoteId}/acceptance`,
  },

  // 5. Order & Cart Service (CartController, CheckoutController, OrderDocumentController, DisputeController)
  ORDER: {
    CART: '/order-service/api/carts/me',
    CART_ITEMS: '/order-service/api/carts/me/items',
    CHECKOUT: '/order-service/api/checkouts',
    ORDERS: '/order-service/api/orders',
    ORDER_BY_ID: (id: string) => `/order-service/api/orders/${id}`,
    // FR-21: lịch sử tiến độ của đơn
    PROGRESS_UPDATES: (id: string) => `/order-service/api/orders/${id}/progress-updates`,
    // FR-22: thanh toán phần còn lại của đơn custom
    PAY_REMAINDER: (id: string) => `/order-service/api/orders/${id}/payments`,
    // Mockups / Maket (OrderDocumentController: @RequestMapping("/api/orders"))
    MAKET_MOCKUPS: (orderId: string) => `/order-service/api/orders/${orderId}/mockups`,
    MAKET_PATCH: (orderId: string, versionNo: number | string) =>
      `/order-service/api/orders/${orderId}/mockups/${versionNo}`,
    // OrderDocumentController: @PostMapping("/uploads")
    UPLOADS: '/order-service/api/orders/uploads',
    // OrderDocumentController: @GetMapping("/{orderId}/invoice")
    INVOICE: (orderId: string) => `/order-service/api/orders/${orderId}/invoice`,
    // Khiếu nại (số ít theo DisputeController: @RequestMapping("/api/orders/{orderId}/dispute"))
    DISPUTE: (orderId: string) => `/order-service/api/orders/${orderId}/dispute`,
    DISPUTE_EVIDENCES: (orderId: string) => `/order-service/api/orders/${orderId}/dispute/evidences`,
    // Đánh giá sản phẩm (ReviewController: @RequestMapping("/api/orders/{orderId}/reviews"))
    REVIEWS: (orderId: string) => `/order-service/api/orders/${orderId}/reviews`,
  },

  // 6. Payment & Escrow Service (LedgerController, PaymentController)
  PAYMENT: {
    BASE: '/payment-service/api',
    VNPAY_IPN: '/payment-service/api/payments/vnpay/ipn',
    VNPAY_RETURN: '/payment-service/api/payments/vnpay/return',
    LEDGERS: '/payment-service/api/ledgers',
    LEDGER_BY_ORDER: (orderId: string) => `/payment-service/api/ledgers/${orderId}`,
    // LedgerController: @GetMapping("/{orderId}/entries")
    LEDGER_ENTRIES: (orderId: string) => `/payment-service/api/ledgers/${orderId}/entries`,
    // LedgerController: @GetMapping("/{orderId}/refunds")
    LEDGER_REFUNDS: (orderId: string) => `/payment-service/api/ledgers/${orderId}/refunds`,
    // LedgerController: @GetMapping("/{orderId}/disbursements")
    LEDGER_DISBURSEMENTS: (orderId: string) => `/payment-service/api/ledgers/${orderId}/disbursements`,
    // LedgerController: @PostMapping("/{orderId}/disbursements")
    LEDGER_DISBURSEMENT_CREATE: (orderId: string) =>
      `/payment-service/api/ledgers/${orderId}/disbursements`,
    // LedgerController: @PatchMapping("/{orderId}/disbursements/{requestId}")
    LEDGER_DISBURSEMENT_REVIEW: (orderId: string, requestId: string) =>
      `/payment-service/api/ledgers/${orderId}/disbursements/${requestId}`,
    // LedgerController: @PutMapping("/{orderId}/payout")
    LEDGER_PAYOUT: (orderId: string) => `/payment-service/api/ledgers/${orderId}/payout`,
    APPROVE_PAYOUT: (orderId: string) => `/payment-service/api/ledgers/${orderId}/payout`,
  },

  // 7. Logistics & WebSocket Realtime (InterprovinceFeeController, STOMP)
  LOGISTICS: {
    INTERPROVINCE_FEES: '/api/interprovince-fees',
    WS_REALTIME: '/ws',
  },
} as const;

/**
 * Các endpoint dự kiến nhưng BE hiện tại chưa công khai REST hoặc đang xử lý qua luồng nội bộ
 */
export const NOT_IMPLEMENTED_YET = {
  NOTIFICATIONS: '/orchestrator-service/api/notifications', // BE-04b: orchestrator chưa có REST
  VNPAY_CREATE_PUBLIC: '/payment-service/api/payments',      // BE-08b: cần endpoint public thay vì /internal/payments
} as const;

/** STOMP over WebSocket của orchestrator-service, đi qua gateway; token nằm trong CONNECT frame. */
export const realtimePath = '/ws';

/**
 * ws(s):// URL của một đường dẫn gateway, lấy từ `VITE_WS_URL` (ưu tiên) rồi tới `VITE_API_BASE_URL`.
 *
 * Không có cấu hình thì trả về `null`: không có máy chủ realtime để kết nối.
 */
export function websocketUrl(path: string): string {
  const base = ENV.wsUrl || ENV.apiBaseUrl;
  if (!base) return '';
  const url = new URL(path, base);
  url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
  return url.toString();
}

