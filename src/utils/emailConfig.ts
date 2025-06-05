
// EmailJS configuration
// Replace these values with your actual EmailJS credentials
export const emailConfig = {
  serviceId: "YOUR_EMAILJS_SERVICE_ID", // Your EmailJS service ID
  orderTemplateId: "YOUR_ORDER_TEMPLATE_ID", // Your EmailJS template ID for orders
  bookingTemplateId: "YOUR_BOOKING_TEMPLATE_ID", // Your EmailJS template ID for bookings
  userId: "YOUR_EMAILJS_USER_ID", // Your EmailJS public key
};

// Check if EmailJS is configured
export const isEmailJSConfigured = (): boolean => {
  return !!(
    emailConfig.serviceId && 
    emailConfig.serviceId !== "YOUR_EMAILJS_SERVICE_ID" &&
    emailConfig.orderTemplateId && 
    emailConfig.orderTemplateId !== "YOUR_ORDER_TEMPLATE_ID" &&
    emailConfig.bookingTemplateId && 
    emailConfig.bookingTemplateId !== "YOUR_BOOKING_TEMPLATE_ID" &&
    emailConfig.userId && 
    emailConfig.userId !== "YOUR_EMAILJS_USER_ID"
  );
};

// Fallback email service for when EmailJS is not configured
export const sendFallbackEmail = (data: any, type: 'order' | 'booking'): Promise<void> => {
  return new Promise((resolve) => {
    console.log(`${type.toUpperCase()} SUBMISSION (EmailJS not configured):`, data);
    
    // Create a mailto link as fallback
    const subject = type === 'order' ? 'New Food Order' : 'New Table Booking';
    const body = type === 'order' 
      ? `Name: ${data.from_name}\nEmail: ${data.from_email}\nPhone: ${data.from_phone}\nOrder: ${data.message}`
      : `Name: ${data.from_name}\nEmail: ${data.from_email}\nPhone: ${data.from_phone}\nDate: ${data.booking_date}\nTime: ${data.booking_time}\nPeople: ${data.number_of_people}\nRequests: ${data.special_requests}`;
    
    const mailtoUrl = `mailto:chuchosbyker@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open default email client
    window.open(mailtoUrl);
    
    resolve();
  });
};

/*
HOW TO SET UP EMAILJS:

1. Sign up for EmailJS at https://www.emailjs.com/
2. Create a service (e.g., Gmail, Outlook, etc.)
3. Create two email templates:
   - Order template (for food orders)
   - Booking template (for table reservations)
4. In each template, use these variables:
   
   FOR ORDER TEMPLATE:
   - {{from_name}} - Customer's name
   - {{from_email}} - Customer's email
   - {{from_phone}} - Customer's phone
   - {{message}} - Order details
   - {{to_email}} - Restaurant's email
   - {{reply_to}} - Customer's email for replies

   FOR BOOKING TEMPLATE:
   - {{from_name}} - Customer's name
   - {{from_email}} - Customer's email
   - {{from_phone}} - Customer's phone
   - {{booking_date}} - Selected date
   - {{booking_time}} - Selected time
   - {{number_of_people}} - Number of people
   - {{special_requests}} - Any special requests
   - {{to_email}} - Restaurant's email
   - {{reply_to}} - Customer's email for replies

5. Get your EmailJS credentials:
   - Service ID from your EmailJS dashboard
   - Template IDs for your order and booking templates
   - User ID (public key) from Account > API Keys

6. Replace the placeholder values in this file with your actual credentials
*/
