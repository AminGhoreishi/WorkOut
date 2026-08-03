export interface PaymentSuccessSearchParams {
  orderId?: string;
}

export interface PaymentSuccessPageProps {
  searchParams: Promise<PaymentSuccessSearchParams>;
}
