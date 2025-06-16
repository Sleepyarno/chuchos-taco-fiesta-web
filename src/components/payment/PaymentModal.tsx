
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { PaymentRequest, PaymentMethod } from '@/types/payment';
import { paymentConfig, isPaymentEnabled } from '@/utils/paymentConfig';
import { paymentService } from '@/utils/paymentService';
import { toast } from "@/components/ui/sonner";
import { CreditCard, Loader2, CheckCircle, XCircle } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentRequest: PaymentRequest;
  onSuccess: (transactionId: string) => void;
  onError: (error: string) => void;
}

const PaymentModal = ({ isOpen, onClose, paymentRequest, onSuccess, onError }: PaymentModalProps) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const handlePayment = async () => {
    if (!selectedMethod) return;

    setIsProcessing(true);
    
    try {
      let result;
      
      if (isPaymentEnabled()) {
        // Use real payment service
        result = await paymentService.initiatePayment(paymentRequest);
      } else {
        // Use simulation for demo
        result = await paymentService.simulatePayment(paymentRequest);
      }

      if (result.success && result.transactionId) {
        setPaymentComplete(true);
        toast.success("Payment successful!", {
          description: `Transaction ID: ${result.transactionId}`
        });
        setTimeout(() => {
          onSuccess(result.transactionId!);
          onClose();
        }, 2000);
      } else {
        onError(result.error || 'Payment failed');
        toast.error("Payment failed", {
          description: result.error || 'Please try again'
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Payment processing failed';
      onError(errorMessage);
      toast.error("Payment error", {
        description: errorMessage
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: paymentConfig.currency
    }).format(amount);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Complete Payment
          </DialogTitle>
        </DialogHeader>

        {paymentComplete ? (
          <div className="text-center py-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-700">Payment Successful!</h3>
            <p className="text-gray-600">Redirecting...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Order Summary */}
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Order Summary</h3>
              <div className="space-y-2">
                {paymentRequest.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.quantity}x {item.name}</span>
                    <span>{formatAmount(item.price * item.quantity)}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatAmount(paymentRequest.amount)}</span>
                </div>
              </div>
            </Card>

            {/* Payment Methods */}
            <div>
              <h3 className="font-semibold mb-3">Select Payment Method</h3>
              <div className="space-y-2">
                {paymentConfig.supportedMethods
                  .filter(method => method.enabled)
                  .map(method => (
                    <Card
                      key={method.id}
                      className={`p-3 cursor-pointer transition-colors ${
                        selectedMethod?.id === method.id 
                          ? 'ring-2 ring-bright-orange bg-orange-50' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedMethod(method)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{method.icon}</span>
                        <span className="font-medium">{method.name}</span>
                        {method.type === 'card' && (
                          <Badge variant="secondary" className="ml-auto">Recommended</Badge>
                        )}
                      </div>
                    </Card>
                  ))}
              </div>
            </div>

            {!isPaymentEnabled() && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm text-yellow-800">
                  <strong>Demo Mode:</strong> Payment system not configured. This will simulate a payment.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={isProcessing}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handlePayment}
                disabled={!selectedMethod || isProcessing}
                className="flex-1 bg-bright-orange hover:bg-orange-600"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Pay ${formatAmount(paymentRequest.amount)}`
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
