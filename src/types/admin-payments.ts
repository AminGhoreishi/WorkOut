export interface AdminPaymentUser {
  _id: string;
  fullName?: string;
  username?: string;
  email?: string;
  phone?: string;
}

export interface AdminPaymentPackage {
  _id: string;
  name: string;
  tagline?: string;
}

export interface AdminPaymentItem {
  _id: string;
  userId?: AdminPaymentUser;
  packageId?: AdminPaymentPackage;
  billingCycle: string;
  amountPaid: number;
  originalAmount: number;
  discountPercent: number;
  status: "pending" | "paid" | "failed" | "refunded";
  paymentRef?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface AdminPaymentStats {
  pendingCount: number;
  paidCount: number;
  failedCount: number;
  totalAmount: number;
}

export interface AdminPaymentsApiResponse {
  orders: AdminPaymentItem[];
  total: number;
  totalPages: number;
  stats: AdminPaymentStats;
  message?: string;
}

export interface AdminPaymentsProps {
  initialStats?: AdminPaymentStats;
  initialData?: AdminPaymentsApiResponse;
}

export interface PaymentActionMessage {
  text: string;
  type: "success" | "error";
}

export interface PaymentActionAlertProps {
  message: PaymentActionMessage | null;
  onClose: () => void;
}

export interface PaymentStatsProps {
  stats: AdminPaymentStats;
}

export interface PaymentTableProps {
  stats: AdminPaymentStats;
  initialData?: AdminPaymentsApiResponse;
  onStatsUpdate?: (stats: AdminPaymentStats) => void;
  onActionMessage?: (message: PaymentActionMessage | null) => void;
}
