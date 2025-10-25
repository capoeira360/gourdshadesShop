import { z } from 'zod';

// Enquiry Item Schema
export const enquiryItemSchema = z.object({
  id: z.string().min(1, 'Item ID is required'),
  name: z.string().min(1, 'Item name is required').max(100, 'Item name too long'),
  price: z.number().positive('Price must be positive').max(10000, 'Price too high'),
  quantity: z.number().int().positive('Quantity must be positive').max(100, 'Quantity too high'),
  category: z.string().optional(),
  image: z.string().url('Invalid image URL').optional(),
});

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters'),
  
  email: z.string()
    .email('Invalid email address')
    .max(100, 'Email too long'),
  
  phone: z.string()
    .min(10, 'Phone number too short')
    .max(20, 'Phone number too long')
    .regex(/^[\+]?[1-9][\d\s\-\(\)]{9,19}$/, 'Invalid phone number format'),
  
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});

// Full Enquiry Schema
export const enquirySchema = z.object({
  name: contactFormSchema.shape.name,
  email: contactFormSchema.shape.email,
  phone: contactFormSchema.shape.phone,
  message: contactFormSchema.shape.message,
  items: z.array(enquiryItemSchema).min(1, 'At least one item is required'),
  totalItems: z.number().int().positive(),
  totalValue: z.number().positive(),
  timestamp: z.string().datetime(),
});

// Rate limiting schema
export const rateLimitSchema = z.object({
  ip: z.string().min(1, 'IP address is required'),
  timestamp: z.number(),
  count: z.number().int().nonnegative(),
});

// Validation helper functions
export const validateEnquiry = (data: unknown) => {
  return enquirySchema.safeParse(data);
};

export const validateContactForm = (data: unknown) => {
  return contactFormSchema.safeParse(data);
};

export const validateEnquiryItem = (data: unknown) => {
  return enquiryItemSchema.safeParse(data);
};

// Sanitization functions
export const sanitizeString = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .substring(0, 1000); // Limit length
};

export const sanitizeEmail = (email: string): string => {
  return email.toLowerCase().trim().substring(0, 100);
};

export const sanitizePhone = (phone: string): string => {
  return phone.replace(/[^\d\+\-\(\)\s]/g, '').substring(0, 20);
};

// Rate limiting helper
export const isRateLimited = (requests: number[], windowMs: number = 60000, maxRequests: number = 5): boolean => {
  const now = Date.now();
  const windowStart = now - windowMs;
  const recentRequests = requests.filter(timestamp => timestamp > windowStart);
  return recentRequests.length >= maxRequests;
};

// CSRF token validation (simple implementation)
export const generateCSRFToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const validateCSRFToken = (token: string, sessionToken: string): boolean => {
  return token === sessionToken && token.length >= 20;
};