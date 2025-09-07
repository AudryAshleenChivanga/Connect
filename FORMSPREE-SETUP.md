# 📧 Formspree Setup Guide

## Overview
Formspree is the easiest way to handle contact form submissions on static websites. It sends form data directly to your email without needing a backend server.

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Formspree Account
1. Go to [formspree.io](https://formspree.io)
2. Click "Sign Up" (use your Gmail or any email)
3. Verify your email address
4. You're ready to create your first form!

### Step 2: Create Your Form
1. In your Formspree dashboard, click "Create Form"
2. Give it a name: "Ashletech Connect Contact Form"
3. Set the destination email: `ashletechconnectsrhr@gmail.com`
4. Copy the **Form ID** (it looks like `xpzjvlnq`)

### Step 3: Update Your Website
1. Open `index.html` in your code editor
2. Find this line (around line 187):
   ```html
   <form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
3. Replace `YOUR_FORM_ID` with your actual Form ID:
   ```html
   <form id="contactForm" action="https://formspree.io/f/xpzjvlnq" method="POST">
   ```
4. Save the file and upload to your hosting platform

### Step 4: Test Your Form
1. Visit your live website
2. Fill out the contact form
3. Submit it
4. Check your email (`ashletechconnectsrhr@gmail.com`) for the submission

## 🎯 Formspree Features You'll Get

### ✅ Automatic Features
- **Spam Protection**: Built-in spam filtering
- **Email Notifications**: Instant delivery to your Gmail
- **Form Analytics**: Track submissions and views
- **Mobile-Friendly**: Works perfectly on all devices
- **No Server Required**: Works with any static hosting

### ✅ Professional Email Format
When someone submits your form, you'll receive an email like this:

```
Subject: New Contact Form Submission - Ashletech Connect SRHR

From: john.doe@example.com

Name: John Doe
Email: john.doe@example.com
Subject: General Inquiry
Message: Hello, I need information about your SRHR programs...

--
This email was sent via Formspree from your contact form.
```

## 💰 Pricing

### Free Plan (Perfect for getting started)
- **50 submissions/month** (resets monthly)
- **1 form** per account
- **Basic spam protection**
- **Email delivery**

### Pro Plan ($12/month) - Recommended for growth
- **1,000 submissions/month**
- **Unlimited forms**
- **Advanced spam protection**
- **File uploads support**
- **Custom redirect URLs**
- **Priority support**

## 🔧 Advanced Configuration

### Custom Subject Lines
Add this hidden field to customize email subjects:
```html
<input type="hidden" name="_subject" value="New Contact - Ashletech Connect SRHR">
```

### Custom Redirect
After successful submission, redirect users to your thank-you page:
```html
<input type="hidden" name="_next" value="thank-you.html">
```

### Spam Protection
Formspree includes automatic spam protection, but you can add more:
```html
<input type="hidden" name="_gotcha" value="">
```

## 🚨 Troubleshooting

### Form Not Sending Emails
1. **Check Form ID**: Make sure it's correctly entered in the `action` attribute
2. **Verify Email**: Ensure the email in Formspree matches your Gmail
3. **Check Quota**: Free plan allows 50 submissions/month
4. **Browser Issues**: Try a different browser or incognito mode

### Emails Going to Spam
1. **Check Gmail Settings**: Add Formspree to your contacts
2. **Mark as Not Spam**: If emails go to spam, mark them as "Not spam"
3. **Add to Safe Senders**: Add `formspree.io` to your email provider's safe senders

### Form Shows Error
1. **Required Fields**: Ensure all required fields are filled
2. **Valid Email**: Make sure email format is correct
3. **Network Issues**: Check your internet connection

## 📊 Monitoring Submissions

### Formspree Dashboard
1. Login to [formspree.io](https://formspree.io)
2. View your form's analytics
3. See submission history
4. Export submission data

### Email Integration
- All submissions go directly to your Gmail
- You can set up filters to organize form submissions
- Forward important submissions to team members

## 🔄 Alternatives

If you prefer different options:

### Netlify Forms (If hosting on Netlify)
- Completely free
- Unlimited submissions
- Built-in spam protection
- See `NETLIFY-FORMS-SETUP.md`

### Custom Backend
- For advanced features
- Requires server setup
- More complex but fully customizable

## 🎉 You're All Set!

Once you've updated the Form ID in your HTML file, your contact form will:
1. ✅ Collect visitor information
2. ✅ Send it to your Gmail instantly
3. ✅ Show a thank-you page
4. ✅ Protect against spam
5. ✅ Work on all devices

**Test it out and let us know how it works!** 🚀

---

*Need help? Contact us at ashletechconnectsrhr@gmail.com*
