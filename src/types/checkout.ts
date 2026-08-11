export interface CheckoutOrderInfo {
  _id: string;
  amountPaid: number;
  originalAmount: number;
  billingCycle: string;
  status: string;
  paymentRef?: string;
  packageName: string;
  packageTagline?: string;
  createdAt?: string;
}

export interface CheckoutPageClientProps {
  order: CheckoutOrderInfo;
}

export interface CheckoutPageProps {
  searchParams: Promise<{ orderId?: string }>;
}

export interface VerifyPaymentClientResponse {
  subscription?: unknown;
  message?: string;
}

export interface CheckoutPaymentFormInputs {
  paymentRef: string;
}

export interface CheckoutPaymentFormProps {
  order: CheckoutOrderInfo;
  paymentRefInput: string;
  onPaymentRefChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  formatNumber: (num: number) => string;
}

export interface CheckoutPendingVerificationProps {
  order: CheckoutOrderInfo;
  submittedRef: string;
  formatNumber: (num: number) => string;
}

export interface CheckoutCardSectionProps {
  order: CheckoutOrderInfo;
  formattedCardNumber: string;
  copied: boolean;
  onCopyCard: () => void;
  paymentRefInput: string;
  onPaymentRefChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  formatNumber: (num: number) => string;
}
