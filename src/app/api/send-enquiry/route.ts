import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { validateEnquiry, sanitizeString, sanitizeEmail, sanitizePhone, isRateLimited } from '@/lib/validation';

interface EnquiryItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category?: string;
}

interface EnquiryData {
  name: string;
  email: string;
  phone: string;
  message: string;
  items: EnquiryItem[];
  totalItems: number;
  totalValue: number;
  timestamp: string;
}

// Simple in-memory rate limiting (in production, use Redis or database)
const requestLog = new Map<string, number[]>();

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    
    // Rate limiting check
    const now = Date.now();
    const userRequests = requestLog.get(clientIP) || [];
    
    if (isRateLimited(userRequests)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
    
    // Update rate limiting log
    userRequests.push(now);
    requestLog.set(clientIP, userRequests.slice(-10)); // Keep last 10 requests

    const body: EnquiryData = await request.json();

    // Validate using Zod schema
    const validation = validateEnquiry(body);
    
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

    const validatedData = validation.data;

    // Additional sanitization
    const sanitizedData = {
      ...validatedData,
      name: sanitizeString(validatedData.name),
      email: sanitizeEmail(validatedData.email),
      phone: sanitizePhone(validatedData.phone),
      message: sanitizeString(validatedData.message),
    };

    // Verify environment variables
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('Missing email configuration');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
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

    // Generate items HTML
    const itemsHtml = sanitizedData.items
      .map(
        (item) => `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">$${item.price.toFixed(2)}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
      `
      )
      .join('');

    // Email HTML template
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Enquiry - Gourdshades</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #1a1a1a; border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">
              New Product Enquiry
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

            <div style="margin: 20px 0;">
              <h2 style="color: #1a1a1a;">Enquiry Items (${sanitizedData.totalItems} items)</h2>
              <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <thead>
                  <tr style="background-color: #1a1a1a; color: white;">
                    <th style="padding: 12px; text-align: left;">Product</th>
                    <th style="padding: 12px; text-align: center;">Quantity</th>
                    <th style="padding: 12px; text-align: right;">Unit Price</th>
                    <th style="padding: 12px; text-align: right;">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
                <tfoot>
                  <tr style="background-color: #f0f0f0; font-weight: bold;">
                    <td colspan="3" style="padding: 12px; text-align: right;">Total Value:</td>
                    <td style="padding: 12px; text-align: right;">$${sanitizedData.totalValue.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
              <p>This enquiry was submitted through the Gourdshades website.</p>
              <p>Please respond to the customer within 24 hours.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Email options
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.ENQUIRY_EMAIL || process.env.SMTP_USER,
      subject: `New Product Enquiry from ${sanitizedData.name}`,
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
          <title>Enquiry Confirmation - Gourd Shades</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #1a1a1a; border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">
              Thank You for Your Enquiry
            </h1>
            
            <p>Dear ${sanitizedData.name},</p>
            
            <p>Thank you for your interest in our products. We have received your enquiry and will get back to you within 24 hours.</p>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h2 style="color: #1a1a1a; margin-top: 0;">Your Enquiry Summary</h2>
              <p><strong>Items:</strong> ${sanitizedData.totalItems}</p>
              <p><strong>Total Value:</strong> $${sanitizedData.totalValue.toFixed(2)}</p>
              <p><strong>Date:</strong> ${new Date(sanitizedData.timestamp).toLocaleString()}</p>
            </div>

            <p>If you have any urgent questions, please don't hesitate to contact us directly.</p>
            
            <p>Best regards,<br>The Gourdshades Team</p>
          </div>
        </body>
      </html>
    `;

    const confirmationOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: sanitizedData.email,
      subject: 'Enquiry Confirmation - Gourdshades',
      html: confirmationHtml,
    };

    await transporter.sendMail(confirmationOptions);

    return NextResponse.json(
      { 
        message: 'Enquiry sent successfully',
        enquiryId: `ENQ-${Date.now()}` 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending enquiry:', error);
    return NextResponse.json(
      { error: 'Failed to send enquiry' },
      { status: 500 }
    );
  }
}