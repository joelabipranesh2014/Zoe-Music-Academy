import emailjs from '@emailjs/browser';

// EmailJS Configuration
// To set up EmailJS:
// 1. Go to https://www.emailjs.com/ and create a free account
// 2. Create an email service (Gmail, Outlook, etc.)
// 3. Create an email template
// 4. Get your Public Key from Account > API Keys
// 5. Replace the values below with your actual IDs

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key';

// Initialize EmailJS
if (EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'your_public_key') {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const sendContactEmail = async (formData: ContactFormData): Promise<{ success: boolean; error?: string }> => {
  try {
    // Validate EmailJS configuration
    if (
      EMAILJS_SERVICE_ID === 'your_service_id' ||
      EMAILJS_TEMPLATE_ID === 'your_template_id' ||
      EMAILJS_PUBLIC_KEY === 'your_public_key'
    ) {
      console.error('EmailJS is not configured. Please set up your EmailJS credentials.');
      return {
        success: false,
        error: 'Email service is not configured. Please contact support directly.',
      };
    }

    // Prepare template parameters
    // All form data will be sent to sjoelabipranesh@gmail.com
    const templateParams = {
      to_email: 'sjoelabipranesh@gmail.com',
      to_name: 'Pranesh',
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || 'Not provided',
      message: formData.message,
      reply_to: formData.email,
      // Additional formatted fields for better email display
      subject: `New Contact Form Submission from ${formData.name}`,
      user_name: formData.name,
      user_email: formData.email,
      user_phone: formData.phone || 'Not provided',
      user_message: formData.message,
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    if (response.status === 200) {
      return { success: true };
    } else {
      return {
        success: false,
        error: 'Failed to send email. Please try again later.',
      };
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.',
    };
  }
};

