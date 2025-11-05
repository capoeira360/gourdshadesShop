import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { validateContactForm, sanitizeString, sanitizeEmail, sanitizePhone, isRateLimited } from '@/lib/validation';

interface ContactData {
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
}

// Simple in-memory rate limiting (in production, use Redis or database)
const requestLog = new Map<string, number[]>();

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown';

    // Rate limiting check
    const now = Date.now();
    const requests = requestLog.get(clientIP) || [];
    const recentRequests = requests.filter(time => now - time < 60000); // 1 minute window

    if (isRateLimited(recentRequests, 60000, 3)) { // Max 3 requests per minute
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Update rate limiting log
    recentRequests.push(now);
    requestLog.set(clientIP, recentRequests);

    const body = await request.json();
    
    // Validate the contact form data
    const validation = validateContactForm(body);
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validation.error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message
          }))
        },
        { status: 400 }
      );
    }

    const data = validation.data as ContactData;

    // Sanitize the data
    const sanitizedData = {
      name: sanitizeString(data.name),
      email: sanitizeEmail(data.email),
      phone: sanitizePhone(data.phone),
      message: sanitizeString(data.message),
      timestamp: data.timestamp,
    };

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Create email HTML
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Contact Message - Gourd Shades</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #1a1a1a; border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">
              New Contact Message
            </h1>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h2 style="color: #1a1a1a; margin-top: 0;">Customer Information</h2>
              <p><strong>Name:</strong> ${sanitizedData.name}</p>
              <p><strong>Email:</strong> ${sanitizedData.email}</p>
              <p><strong>Phone:</strong> ${sanitizedData.phone}</p>
              <p><strong>Date:</strong> ${new Date(sanitizedData.timestamp).toLocaleString()}</p>
            </div>

            <div style="margin: 20px 0;">
              <h2 style="color: #1a1a1a;">Message</h2>
              <p style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${sanitizedData.message}</p>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
              <p>This message was sent from the Gourd Shades contact form.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Email options
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.ENQUIRY_EMAIL || process.env.SMTP_USER,
      subject: `New Contact Message from ${sanitizedData.name}`,
      html: emailHtml,
      replyTo: sanitizedData.email,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send confirmation email to customer
    const confirmationHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Message Received - Gourd Shades</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #1a1a1a; border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">
              Thank You for Contacting Us
            </h1>
            
            <p>Dear ${sanitizedData.name},</p>
            
            <p>Thank you for reaching out to us. We have received your message and will get back to you within 24 hours.</p>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h2 style="color: #1a1a1a; margin-top: 0;">Your Message</h2>
              <p style="white-space: pre-wrap;">${sanitizedData.message}</p>
            </div>
            
            <p>If you have any urgent questions, please don't hesitate to call us at +255 746 754 878.</p>
            
            <p>Best regards,<br>The Gourd Shades Team</p>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
              <p>This is an automated confirmation email from Gourd Shades.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const confirmationOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: sanitizedData.email,
      subject: 'Thank you for contacting Gourd Shades',
      html: confirmationHtml,
    };

    await transporter.sendMail(confirmationOptions);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact message sent successfully' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending contact message:', error);
    return NextResponse.json(
      { error: 'Failed to send contact message' },
      { status: 500 }
    );
  }
}