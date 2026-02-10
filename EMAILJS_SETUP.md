# EmailJS Setup Guide

This guide will help you configure EmailJS to send emails from the contact form.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (free tier includes 200 emails/month)

## Step 2: Add Email Service

1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. **Copy the Service ID** (you'll need this later)

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use the following template variables (all available):
   - `{{to_email}}` - Recipient email (sjoelabipranesh@gmail.com)
   - `{{to_name}}` - Recipient name (Pranesh)
   - `{{from_name}}` or `{{user_name}}` - Sender's name
   - `{{from_email}}` or `{{user_email}}` - Sender's email
   - `{{phone}}` or `{{user_phone}}` - Sender's phone number
   - `{{message}}` or `{{user_message}}` - Message content
   - `{{reply_to}}` - Reply-to email (sender's email)
   - `{{subject}}` - Email subject line

4. **Recommended Email Template** (copy and paste this into EmailJS):
   
   **Subject Line:**
   ```
   New Contact Form Submission from {{from_name}}
   ```
   
   **Email Body:**
   ```
   You have received a new contact form submission:
   
   ────────────────────────────────────────
   CONTACT INFORMATION
   ────────────────────────────────────────
   Name: {{from_name}}
   Email: {{from_email}}
   Phone: {{phone}}
   
   ────────────────────────────────────────
   MESSAGE
   ────────────────────────────────────────
   {{message}}
   
   ────────────────────────────────────────
   Reply directly to: {{reply_to}}
   ────────────────────────────────────────
   ```
   
   **Alternative simpler template:**
   ```
   Subject: New Contact Form Submission from {{from_name}}
   
   Name: {{from_name}}
   Email: {{from_email}}
   Phone: {{phone}}
   
   Message:
   {{message}}
   
   Reply to: {{reply_to}}
   ```

5. **Copy the Template ID** (you'll need this later)

## Step 4: Get Public Key

1. Go to **Account** > **General** > **API Keys**
2. Copy your **Public Key**

## Step 5: Configure Environment Variables

1. Create a `.env` file in the root of your project (if it doesn't exist)
2. Add the following variables:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

3. Replace the placeholder values with your actual IDs from steps 2, 3, and 4

## Step 6: Update Email Service Configuration

The email service is configured to send emails to `sjoelabipranesh@gmail.com`. This is hardcoded in `src/services/emailService.ts` in the `sendContactEmail` function.

If you need to change the recipient email, edit the `to_email` field in `src/services/emailService.ts`:

```typescript
const templateParams = {
  to_email: 'sjoelabipranesh@gmail.com', // Change this if needed
  // ... rest of the parameters
};
```

## Testing

1. Start your development server: `npm run dev`
2. Navigate to the contact page
3. Fill out the form and submit
4. Check your email inbox (sjoelabipranesh@gmail.com) for the message

## Troubleshooting

- **Email not sending**: Check that all environment variables are set correctly
- **Template variables not working**: Make sure variable names match exactly (case-sensitive)
- **Service ID error**: Verify your EmailJS service is active and properly configured
- **Rate limit**: Free tier is limited to 200 emails/month

## Security Note

Never commit your `.env` file to version control. It's already included in `.gitignore` for your safety.

