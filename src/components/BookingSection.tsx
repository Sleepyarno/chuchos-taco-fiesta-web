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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/sonner";
import { Calendar as CalendarIcon, Users } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import emailjs from 'emailjs-com';
import { emailConfig } from "@/utils/emailConfig";
import PaymentModal from '@/components/payment/PaymentModal';
import { PaymentRequest } from '@/types/payment';
import { paymentConfig, bookingDepositConfig } from '@/utils/paymentConfig';
import { CreditCard } from 'lucide-react';

// Create schema for booking form validation
const bookingFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(5, { message: "Please enter a valid phone number" }),
  date: z.date({ required_error: "Please select a date" }),
  time: z.string({ required_error: "Please select a time" }),
  people: z.string({ required_error: "Please select number of people" }),
  specialRequests: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

// Time slot options
const timeSlots = [
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", 
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30"
];

// People options (1-12)
const peopleOptions = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

const BookingSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentPaymentRequest, setCurrentPaymentRequest] = useState<PaymentRequest | null>(null);
  
  // Initialize the form
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      specialRequests: "",
    },
  });

  const handleBookingSubmit = async (data: BookingFormValues) => {
    if (bookingDepositConfig.enabled) {
      // Create payment request for deposit
      const paymentRequest: PaymentRequest = {
        orderId: `booking_${Date.now()}`,
        amount: bookingDepositConfig.amount,
        currency: paymentConfig.currency,
        items: [{
          id: 'booking_deposit',
          name: bookingDepositConfig.description,
          price: bookingDepositConfig.amount,
          quantity: 1,
          notes: `Table for ${data.people} people on ${format(data.date, "PPP")} at ${data.time}`
        }],
        customer: {
          name: data.name,
          email: data.email,
          phone: data.phone
        },
        type: 'booking_deposit',
        metadata: {
          bookingDate: format(data.date, "PPP"),
          bookingTime: data.time,
          numberOfPeople: data.people,
          specialRequests: data.specialRequests,
          submittedAt: new Date().toISOString()
        }
      };

      setCurrentPaymentRequest(paymentRequest);
      setShowPaymentModal(true);
    } else {
      // Process booking without payment
      await handleEmailOnlySubmit(data);
    }
  };

  const handlePaymentSuccess = async (transactionId: string) => {
    if (!currentPaymentRequest) return;

    try {
      const templateParams = {
        from_name: currentPaymentRequest.customer.name,
        from_email: currentPaymentRequest.customer.email,
        from_phone: currentPaymentRequest.customer.phone,
        booking_date: currentPaymentRequest.metadata?.bookingDate,
        booking_time: currentPaymentRequest.metadata?.bookingTime,
        number_of_people: currentPaymentRequest.metadata?.numberOfPeople,
        special_requests: currentPaymentRequest.metadata?.specialRequests || "None",
        deposit_amount: `£${currentPaymentRequest.amount.toFixed(2)}`,
        transaction_id: transactionId,
        to_email: "chuchosbyker@gmail.com",
        reply_to: currentPaymentRequest.customer.email,
      };
      
      const response = await emailjs.send(
        emailConfig.serviceId,
        emailConfig.bookingTemplateId,
        templateParams,
        emailConfig.userId
      );
      
      console.log("Booking confirmation sent successfully:", response);
      
      toast.success("Table booked successfully!", {
        description: `Deposit paid (£${bookingDepositConfig.amount}). You'll receive a confirmation email shortly.`,
      });
      
      form.reset();
      setCurrentPaymentRequest(null);
    } catch (error) {
      console.error("Error sending booking confirmation:", error);
      toast.error("Booking successful but confirmation failed", {
        description: "Please contact us with your transaction ID: " + transactionId,
      });
    }
  };

  const handlePaymentError = (error: string) => {
    toast.error("Booking deposit payment failed", {
      description: error,
    });
    setCurrentPaymentRequest(null);
  };

  // Handle form submission
  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Prepare email template parameters
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        from_phone: data.phone,
        booking_date: format(data.date, "PPP"),
        booking_time: data.time,
        number_of_people: data.people,
        special_requests: data.specialRequests || "None",
        to_email: "chuchosbyker@gmail.com", // restaurant's email
        reply_to: data.email,
      };
      
      const response = await emailjs.send(
        emailConfig.serviceId,
        emailConfig.bookingTemplateId,
        templateParams,
        emailConfig.userId
      );
      
      console.log("Booking email sent successfully:", response);
      
      // Show success message
      toast.success("Table booked successfully!", {
        description: "You will receive a confirmation email shortly.",
      });
      
      // Reset form
      form.reset();
    } catch (error) {
      console.error("Error booking table:", error);
      toast.error("Failed to book table", {
        description: "Please try again later or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleEmailOnlySubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    
    try {
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        from_phone: data.phone,
        booking_date: format(data.date, "PPP"),
        booking_time: data.time,
        number_of_people: data.people,
        special_requests: data.specialRequests || "None",
        to_email: "chuchosbyker@gmail.com",
        reply_to: data.email,
      };
      
      const response = await emailjs.send(
        emailConfig.serviceId,
        emailConfig.bookingTemplateId,
        templateParams,
        emailConfig.userId
      );
      
      console.log("Booking email sent successfully:", response);
      
      toast.success("Table booked successfully!", {
        description: "You will receive a confirmation email shortly.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error booking table:", error);
      toast.error("Failed to book table", {
        description: "Please try again later or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-16">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Book a Table</h2>
      
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <Users className="h-6 w-6 text-bright-orange" />
          <h3 className="text-2xl font-bold text-vivid-purple">Reserve Your Table</h3>
        </div>
        
        <p className="mb-6 text-gray-700">
          Complete the form below to book a table at Chucho's Tacos. 
          {bookingDepositConfig.enabled && (
            <span className="font-medium text-vivid-purple">
              {' '}A refundable £{bookingDepositConfig.amount} deposit is required to secure your booking.
            </span>
          )}
          {' '}We'll confirm your reservation via email. For large groups (more than 12 people) or special events, please call us directly.
        </p>
        
        <Form {...form}>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                name="people"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of People</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select number of people" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {peopleOptions.map(option => (
                          <SelectItem key={option} value={option}>
                            {option} {parseInt(option) === 1 ? 'person' : 'people'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map(time => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="specialRequests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Requests</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any special requests or dietary requirements..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex gap-2">
              {bookingDepositConfig.enabled ? (
                <>
                  <Button 
                    type="button"
                    onClick={form.handleSubmit(handleBookingSubmit)}
                    className="flex-1 bg-bright-orange hover:bg-orange-600"
                    disabled={isSubmitting}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Processing..." : `Book with £${bookingDepositConfig.amount} Deposit`}
                  </Button>
                  
                  <Button 
                    type="button"
                    onClick={form.handleSubmit(handleEmailOnlySubmit)}
                    variant="outline"
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Book without Deposit"}
                  </Button>
                </>
              ) : (
                <Button 
                  type="button"
                  onClick={form.handleSubmit(handleEmailOnlySubmit)}
                  className="w-full bg-bright-orange hover:bg-orange-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Book Table"}
                </Button>
              )}
            </div>
          </form>
        </Form>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Need to modify or cancel your reservation? Call us at: <span className="font-semibold">0191 265 7458</span>
          </p>
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

export default BookingSection;
