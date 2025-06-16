import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/sonner";
import { Mail, Send, CreditCard } from "lucide-react";
import { getMenuData } from "@/utils/dataManager";
import emailjs from 'emailjs-com';
import { emailConfig, isEmailJSConfigured, sendFallbackEmail } from "@/utils/emailConfig";
import PaymentModal from '@/components/payment/PaymentModal';
import { PaymentRequest, OrderItem } from '@/types/payment';
import { paymentConfig } from '@/utils/paymentConfig';

// Create schema for order form validation
const orderFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(5, { message: "Please enter a valid phone number" }),
  order: z.string().min(10, { message: "Please provide order details (min 10 characters)" }),
});

type OrderFormValues = z.infer<typeof orderFormSchema>;

const OrderSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentPaymentRequest, setCurrentPaymentRequest] = useState<PaymentRequest | null>(null);
  const menuData = getMenuData();
  
  // Initialize the form
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      order: "",
    },
  });

  // Parse order text into items for payment
  const parseOrderItems = (orderText: string): OrderItem[] => {
    const lines = orderText.split('\n').filter(line => line.trim());
    const items: OrderItem[] = [];
    let itemId = 1;

    for (const line of lines) {
      // Simple parsing - look for quantity and item name
      const match = line.match(/(\d+)\s*x?\s*(.+?)(?:\s*[-–]\s*£?(\d+\.?\d*))?/i);
      if (match) {
        const [, qty, name, priceStr] = match;
        const quantity = parseInt(qty) || 1;
        const price = priceStr ? parseFloat(priceStr) : 8.50; // Default price
        
        items.push({
          id: `item_${itemId++}`,
          name: name.trim(),
          price,
          quantity,
          notes: line.includes('no') || line.includes('without') ? line : undefined
        });
      } else if (line.trim()) {
        // If no quantity specified, assume 1
        items.push({
          id: `item_${itemId++}`,
          name: line.trim(),
          price: 8.50, // Default price
          quantity: 1
        });
      }
    }

    return items.length > 0 ? items : [{
      id: 'custom_order',
      name: 'Custom Order',
      price: 15.00,
      quantity: 1,
      notes: orderText
    }];
  };

  // Handle form submission
  const handleOrderSubmit = async (data: OrderFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Parse order items for payment
      const orderItems = parseOrderItems(data.order);
      const totalAmount = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      // Create payment request
      const paymentRequest: PaymentRequest = {
        orderId: `order_${Date.now()}`,
        amount: totalAmount,
        currency: paymentConfig.currency,
        items: orderItems,
        customer: {
          name: data.name,
          email: data.email,
          phone: data.phone
        },
        type: 'order',
        metadata: {
          originalOrderText: data.order,
          submittedAt: new Date().toISOString()
        }
      };

      setCurrentPaymentRequest(paymentRequest);
      setShowPaymentModal(true);
    } catch (error) {
      console.error("Error preparing order:", error);
      toast.error("Failed to prepare order", {
        description: "Please try again later or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentSuccess = async (transactionId: string) => {
    if (!currentPaymentRequest) return;

    try {
      // Send confirmation email with payment details
      const templateParams = {
        from_name: currentPaymentRequest.customer.name,
        from_email: currentPaymentRequest.customer.email,
        from_phone: currentPaymentRequest.customer.phone,
        message: currentPaymentRequest.metadata?.originalOrderText || 'Custom order',
        order_total: `£${currentPaymentRequest.amount.toFixed(2)}`,
        transaction_id: transactionId,
        to_email: "chuchosbyker@gmail.com",
        reply_to: currentPaymentRequest.customer.email,
      };
      
      if (isEmailJSConfigured()) {
        await emailjs.send(
          emailConfig.serviceId,
          emailConfig.templateId,
          templateParams,
          emailConfig.userId
        );
        
        toast.success("Order confirmed!", {
          description: "Payment successful. You'll receive a confirmation email shortly.",
        });
      } else {
        await sendFallbackEmail(templateParams, 'order');
        
        toast.success("Order confirmed!", {
          description: "Payment successful. Your default email client will open for confirmation.",
        });
      }
      
      // Reset form
      form.reset();
      setCurrentPaymentRequest(null);
    } catch (error) {
      console.error("Error sending confirmation:", error);
      toast.error("Payment successful but confirmation failed", {
        description: "Please contact us with your transaction ID: " + transactionId,
      });
    }
  };

  const handlePaymentError = (error: string) => {
    toast.error("Payment failed", {
      description: error,
    });
    setCurrentPaymentRequest(null);
  };

  // Handle form submission for email only
  const handleEmailOnlySubmit = async (data: OrderFormValues) => {
    setIsSubmitting(true);
    
    try {
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        from_phone: data.phone,
        message: data.order,
        to_email: "chuchosbyker@gmail.com",
        reply_to: data.email,
      };
      
      if (isEmailJSConfigured()) {
        const response = await emailjs.send(
          emailConfig.serviceId,
          emailConfig.templateId,
          templateParams,
          emailConfig.userId
        );
        
        console.log("Email sent successfully:", response);
        
        toast.success("Order submitted successfully!", {
          description: "You will receive a confirmation email shortly.",
        });
      } else {
        await sendFallbackEmail(templateParams, 'order');
        
        toast.success("Order submitted!", {
          description: "Your default email client will open to send the order. Please configure EmailJS for automatic email delivery.",
        });
      }
      
      form.reset();
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Failed to submit order", {
        description: "Please try again later or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="order" className="py-16">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Order Online</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="h-6 w-6 text-bright-orange" />
            <h3 className="text-2xl font-bold text-vivid-purple">Place Your Order</h3>
          </div>
          
          <p className="mb-6 text-gray-700">
            Fill out the form below to place your order. Choose to pay online for faster processing
            or submit for email confirmation.
          </p>

          {!isEmailJSConfigured() && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> EmailJS is not configured. Orders will open your default email client.
                To enable automatic email delivery, please configure EmailJS in the email settings.
              </p>
            </div>
          )}
          
          <Form {...form}>
            <form className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="079 1234 5678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Order</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please list the items you'd like to order..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex gap-2">
                <Button 
                  type="button"
                  onClick={form.handleSubmit(handleOrderSubmit)}
                  className="flex-1 bg-bright-orange hover:bg-orange-600"
                  disabled={isSubmitting}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Processing..." : "Order & Pay"}
                </Button>
                
                <Button 
                  type="button"
                  onClick={form.handleSubmit(handleEmailOnlySubmit)}
                  variant="outline"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Sending..." : "Email Only"}
                </Button>
              </div>
            </form>
          </Form>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Need help with your order? Call us at: <span className="font-semibold">0191 265 7458</span>
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-6 text-vivid-purple">Popular Items</h3>
          
          <div className="space-y-4">
            {menuData.menuItems.tacos.slice(0, 4).map((item) => (
              <div key={item.id} className="flex justify-between pb-4 border-b border-gray-100">
                <div>
                  <h4 className="font-bold">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <span className="font-bold text-bright-orange">£{item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <p className="mb-4 text-gray-700">
              View our full menu in the <a href="#menu" className="text-vivid-purple hover:underline">Menu section</a>
            </p>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-800 font-medium">Special Note</p>
              <p className="text-sm text-gray-600">
                Orders are typically ready for pickup in 15-30 minutes. For large orders, 
                please call ahead for estimated preparation time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {currentPaymentRequest && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            setCurrentPaymentRequest(null);
          }}
          paymentRequest={currentPaymentRequest}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
        />
      )}
    </section>
  );
};

export default OrderSection;
