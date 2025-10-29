import nodemailer from 'nodemailer';

// ✅ CORRECTED: Using createTransport (not createTransporter)
let transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 587,  // ✅ CORRECTED: Using 587 for STARTTLS (more reliable)
  secure: false,  // ✅ CORRECTED: false for 587 (STARTTLS)
  auth: {
    user: 'inquiries@gourdshades.com',  // ✅ CORRECTED: Updated to match .env.local
    pass: 'Capoeira_2019'  // ✅ CORRECTED: Using actual password from .env.local
  },
  // ✅ ADDED: TLS configuration for better compatibility
  tls: {
    rejectUnauthorized: false
  }
});

// Test send
transporter.sendMail({
  from: 'inquiries@gourdshades.com',  // ✅ CORRECTED: Updated to match .env.local
  to: 'inquiries@gourdshades.com',    // ✅ CORRECTED: Send to self for testing
  subject: 'Test Email - Nodemailer Setup',
  text: 'Hello! This is a test email from the corrected nodemailer setup.',
  html: '<p>Hello! This is a <strong>test email</strong> from the corrected nodemailer setup.</p>'
}, (err, info) => {
  if (err) {
    console.log('❌ Error occurred:', err);
    console.log('Error Code:', err.code);
    console.log('Error Message:', err.message);
  } else {
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
  }
});