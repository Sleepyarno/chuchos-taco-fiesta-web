
export interface PaymentMethod {
  id: string;
  type: 'card' | 'digital_wallet' | 'bank_transfer';
  name: string;
  icon?: string;
  enabled: boolean;
}

export interface PaymentConfig {
  apiBaseUrl: string;
  publicKey: string;
  supportedMethods: PaymentMethod[];
  currency: string;
  testMode: boolean;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
}

export interface PaymentRequest {
  orderId: string;
  amount: number;
  currency: string;
  items: OrderItem[];
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  type: 'order' | 'booking_deposit';
  metadata?: Record<string, any>;
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  paymentUrl?: string;
  error?: string;
  requiresRedirect?: boolean;
}

export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';

export interface PaymentStatusResponse {
  status: PaymentStatus;
  transactionId: string;
  amount: number;
  currency: string;
  completedAt?: string;
  error?: string;
}
