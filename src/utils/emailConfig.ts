
// EmailJS Configuration
// To set up EmailJS:
// 1. Go to https://www.emailjs.com/
// 2. Create an account and verify your email
// 3. Create a service (Gmail, Outlook, etc.)
// 4. Create an email template
// 5. Get your User ID from the Integration page
// 6. Update the values below

export const emailConfig = {
  serviceId: 'service_mexicano', // EmailJS service ID
  templateId: 'template_order_mexicano', // EmailJS template ID for orders
  bookingTemplateId: 'template_booking_mexicano', // EmailJS template ID for bookings
  userId: 'sleepyarno@gmail.com', // Your EmailJS user ID (public key)
  
  // Set to true when EmailJS is properly configured
  isConfigured: true // EmailJS is now configured
};

// Check if EmailJS is configured
export const isEmailJSConfigured = (): boolean => {
  return emailConfig.isConfigured && 
         emailConfig.serviceId !== 'default_service' && 
         emailConfig.templateId !== 'template_order' &&
         emailConfig.userId === 'sleepyarno@gmail.com';
};

// Template variables that will be sent to EmailJS
export interface EmailTemplateVars {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  order_items: string;
  total_amount: string;
  restaurant_email: string;
}

export const sendOrderEmail = async (templateVars: EmailTemplateVars) => {
  if (!emailConfig.isConfigured) {
    console.warn('EmailJS not configured. Email not sent.');
    return false;
  }

  try {
    const emailjs = (window as any).emailjs;
    if (!emailjs) {
      console.error('EmailJS not loaded');
      return false;
    }

    await emailjs.send(
      emailConfig.serviceId,
      emailConfig.templateId,
      templateVars,
      emailConfig.userId
    );
    
    console.log('Order email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
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
