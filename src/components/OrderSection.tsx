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
import { Mail, Send } from "lucide-react";
import { getMenuData } from "@/utils/dataManager";
import emailjs from 'emailjs-com';
import { emailConfig } from "@/utils/emailConfig";

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

  // Handle form submission
  const onSubmit = async (data: OrderFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Prepare email template parameters
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        from_phone: data.phone,
        message: data.order,
        to_email: "chuchosbyker@gmail.com", // restaurant's email
        reply_to: data.email,
      };
      
      // Send email using EmailJS
      const response = await emailjs.send(
        emailConfig.serviceId,
        emailConfig.orderTemplateId,
        templateParams,
        emailConfig.userId
      );
      
      console.log("Email sent successfully:", response);
      
      // Show success message
      toast.success("Order submitted successfully!", {
        description: "You will receive a confirmation email shortly.",
      });
      
      // Reset form
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
            Fill out the form below to place your order. We'll confirm your order via email 
            and let you know when it will be ready for pickup.
          </p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              
              <Button 
                type="submit" 
                className="w-full bg-bright-orange hover:bg-orange-600"
                disabled={isSubmitting}
              >
                <Send className="h-4 w-4 mr-2" />
                {isSubmitting ? "Sending..." : "Place Order"}
              </Button>
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
    </section>
  );
};

export default OrderSection;
