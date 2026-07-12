import { z } from 'zod';
import { sanitizeRichText } from './sanitize.js';

const optionalText = (max) => z.string().trim().max(max).optional().nullable().transform((value) => value ?? '');
const optionalUrl = (max) => z.union([
  z.string().trim().url().max(max),
  z.literal(''),
  z.undefined(),
  z.null(),
]).transform((value) => value ?? '');

const socialLinkSchema = z.object({
  platform: z.string().trim().max(100).default(''),
  url: z.string().trim().url().max(500),
});

const galleryItemSchema = z.object({
  url: z.string().trim().url().max(500),
  type: z.enum(['image', 'video']).default('image'),
  label: z.string().trim().max(255).default(''),
});

export const residentSchema = z.object({
  name: z.string().trim().min(1).max(255),
  tag: optionalText(255),
  photo_url: optionalUrl(500),
  bio: optionalText(20000),
  contact_name: optionalText(255),
  contact_email: z.union([z.string().trim().email().max(255), z.literal(''), z.undefined(), z.null()]).transform((value) => value ?? ''),
  contact_phone: optionalText(100),
  google_form_url: optionalUrl(500),
  social_links: z.array(socialLinkSchema).max(50).default([]),
  media_gallery: z.array(galleryItemSchema).max(100).default([]),
  is_active: z.boolean().default(true),
});

export const mediaProjectSchema = z.object({
  title: z.string().trim().min(1).max(255),
  tag: optionalText(255),
  cover_url: optionalUrl(500),
  description: optionalText(5000),
  social_url: optionalUrl(500),
  body: z.string().max(100000).transform((value) => sanitizeRichText(value || '')),
  media_gallery: z.array(galleryItemSchema).max(100).default([]),
  is_published: z.boolean().default(true),
});

export const newsPostSchema = z.object({
  title: z.string().trim().min(1).max(255),
  date: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/),
  tag: optionalText(255),
  cover_url: optionalUrl(500),
  body: z.string().max(100000).transform((value) => sanitizeRichText(value || '')),
  video_url: optionalUrl(500),
  media_gallery: z.array(galleryItemSchema).max(100).default([]),
  resident_id: z.string().trim().uuid().nullable().optional(),
  media_project_id: z.string().trim().uuid().nullable().optional(),
  is_published: z.boolean().default(true),
});

export const adminLoginSchema = z.object({
  login: z.string().trim().min(1).max(255),
  password: z.string().min(8).max(255),
});

export function parseSchema(schema, payload) {
  const result = schema.safeParse(payload);
  if (!result.success) {
    const message = result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ');
    const err = new Error(message);
    err.status = 400;
    throw err;
  }
  return result.data;
}
