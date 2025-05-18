
// EmailJS configuration
// Replace these values with your actual EmailJS credentials
export const emailConfig = {
  serviceId: "YOUR_EMAILJS_SERVICE_ID", // Your EmailJS service ID
  orderTemplateId: "YOUR_ORDER_TEMPLATE_ID", // Your EmailJS template ID for orders
  bookingTemplateId: "YOUR_BOOKING_TEMPLATE_ID", // Your EmailJS template ID for bookings
  userId: "YOUR_EMAILJS_USER_ID", // Your EmailJS public key
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
