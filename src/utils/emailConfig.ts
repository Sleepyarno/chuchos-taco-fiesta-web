
// EmailJS Configuration
// To set up EmailJS:
// 1. Go to https://www.emailjs.com/
// 2. Create an account and verify your email
// 3. Create a service (Gmail, Outlook, etc.)
// 4. Create an email template
// 5. Get your User ID from the Integration page
// 6. Update the values below

export const emailConfig = {
  serviceId: 'default_service', // Replace with your EmailJS service ID
  templateId: 'template_order', // Replace with your EmailJS template ID
  userId: 'sleepyarno@gmail.com', // Your EmailJS user ID (public key)
  
  // Set to true when EmailJS is properly configured
  isConfigured: false // Change to true after setting up EmailJS
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
