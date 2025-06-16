
import { PaymentConfig, PaymentMethod } from '@/types/payment';

// Payment system configuration
export const paymentConfig: PaymentConfig = {
  apiBaseUrl: 'https://your-payment-api.com/api', // Replace with your payment API URL
  publicKey: 'pk_test_your_public_key', // Replace with your public key
  currency: 'GBP',
  testMode: true, // Set to false in production
  supportedMethods: [
    {
      id: 'card',
      type: 'card',
      name: 'Credit/Debit Card',
      icon: '💳',
      enabled: true
    },
    {
      id: 'apple_pay',
      type: 'digital_wallet',
      name: 'Apple Pay',
      icon: '🍎',
      enabled: true
    },
    {
      id: 'google_pay',
      type: 'digital_wallet',
      name: 'Google Pay',
      icon: '🔵',
      enabled: true
    },
    {
      id: 'bank_transfer',
      type: 'bank_transfer',
      name: 'Bank Transfer',
      icon: '🏦',
      enabled: false
    }
  ]
};

export const isPaymentEnabled = (): boolean => {
  return paymentConfig.apiBaseUrl !== 'https://your-payment-api.com/api' && 
         paymentConfig.publicKey !== 'pk_test_your_public_key';
};

// Booking deposit configuration
export const bookingDepositConfig = {
  enabled: true,
  amount: 10.00, // £10 deposit per booking
  refundable: true,
  description: 'Refundable table booking deposit'
};
