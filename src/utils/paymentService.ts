
import { PaymentRequest, PaymentResponse, PaymentStatusResponse } from '@/types/payment';
import { paymentConfig } from '@/utils/paymentConfig';

class PaymentService {
  private apiBaseUrl: string;
  private publicKey: string;

  constructor() {
    this.apiBaseUrl = paymentConfig.apiBaseUrl;
    this.publicKey = paymentConfig.publicKey;
  }

  async initiatePayment(paymentRequest: PaymentRequest): Promise<PaymentResponse> {
    try {
      console.log('Initiating payment:', paymentRequest);
      
      const response = await fetch(`${this.apiBaseUrl}/payments/initiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.publicKey}`,
        },
        body: JSON.stringify(paymentRequest),
      });

      if (!response.ok) {
        throw new Error(`Payment initiation failed: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Payment initiation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment initiation failed'
      };
    }
  }

  async checkPaymentStatus(transactionId: string): Promise<PaymentStatusResponse> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/payments/${transactionId}/status`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.publicKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Status check failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Payment status check error:', error);
      throw error;
    }
  }

  async cancelPayment(transactionId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/payments/${transactionId}/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.publicKey}`,
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Payment cancellation error:', error);
      return false;
    }
  }

  // Simulate payment for demo purposes
  simulatePayment(paymentRequest: PaymentRequest): Promise<PaymentResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const success = Math.random() > 0.1; // 90% success rate for demo
        resolve({
          success,
          transactionId: success ? `txn_${Date.now()}` : undefined,
          error: success ? undefined : 'Payment simulation failed'
        });
      }, 2000);
    });
  }
}

export const paymentService = new PaymentService();
