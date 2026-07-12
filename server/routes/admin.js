import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { query } from '../lib/db.js';
import { asyncHandler, createError } from '../lib/http.js';
import { mapMediaProject, mapNewsPost, mapResident } from '../lib/mappers.js';
import { mediaProjectSchema, newsPostSchema, parseSchema, residentSchema } from '../lib/validation.js';
import { requireAdmin } from '../middleware/requireAdmin.js';

export const adminRouter = Router();
adminRouter.use(requireAdmin);

function toDbJson(value) {
  return JSON.stringify(value || []);
}

adminRouter.get('/residents', asyncHandler(async (_req, res) => {
  const rows = await query('SELECT * FROM residents ORDER BY created_at DESC');
  res.json(rows.map(mapResident));
}));

adminRouter.post('/residents', asyncHandler(async (req, res) => {
  const payload = parseSchema(residentSchema, req.body);
  const id = uuidv4();
  await query(`INSERT INTO residents (id, name, tag, photo_url, bio, contact_name, contact_email, contact_phone, google_form_url, social_links, media_gallery, is_active)
    VALUES (:id, :name, :tag, :photo_url, :bio, :contact_name, :contact_email, :contact_phone, :google_form_url, :social_links, :media_gallery, :is_active)`, {
    id,
    ...payload,
    social_links: toDbJson(payload.social_links),
    media_gallery: toDbJson(payload.media_gallery),
    is_active: payload.is_active ? 1 : 0,
  });
  const rows = await query('SELECT * FROM residents WHERE id = :id LIMIT 1', { id });
  res.status(201).json(mapResident(rows[0]));
}));

adminRouter.put('/residents/:id', asyncHandler(async (req, res) => {
  const payload = parseSchema(residentSchema, req.body);
  await query(`UPDATE residents SET
    name = :name,
    tag = :tag,
    photo_url = :photo_url,
    bio = :bio,
    contact_name = :contact_name,
    contact_email = :contact_email,
    contact_phone = :contact_phone,
    google_form_url = :google_form_url,
    social_links = :social_links,
    media_gallery = :media_gallery,
    is_active = :is_active,
    updated_at = CURRENT_TIMESTAMP
    WHERE id = :id`, {
    id: req.params.id,
    ...payload,
    social_links: toDbJson(payload.social_links),
    media_gallery: toDbJson(payload.media_gallery),
    is_active: payload.is_active ? 1 : 0,
  });
  const rows = await query('SELECT * FROM residents WHERE id = :id LIMIT 1', { id: req.params.id });
  res.json(mapResident(rows[0]));
}));

adminRouter.delete('/residents/:id', asyncHandler(async (req, res) => {
  await query('DELETE FROM residents WHERE id = :id', { id: req.params.id });
  res.json({ ok: true });
}));

adminRouter.get('/media-projects', asyncHandler(async (_req, res) => {
  const rows = await query('SELECT * FROM media_projects ORDER BY created_at DESC');
  res.json(rows.map(mapMediaProject));
}));

adminRouter.post('/media-projects', asyncHandler(async (req, res) => {
  const payload = parseSchema(mediaProjectSchema, req.body);
  const id = uuidv4();
  await query(`INSERT INTO media_projects (id, title, tag, cover_url, description, social_url, body, media_gallery, is_published)
    VALUES (:id, :title, :tag, :cover_url, :description, :social_url, :body, :media_gallery, :is_published)`, {
    id,
    ...payload,
    media_gallery: toDbJson(payload.media_gallery),
    is_published: payload.is_published ? 1 : 0,
  });
  const rows = await query('SELECT * FROM media_projects WHERE id = :id LIMIT 1', { id });
  res.status(201).json(mapMediaProject(rows[0]));
}));

adminRouter.put('/media-projects/:id', asyncHandler(async (req, res) => {
  const payload = parseSchema(mediaProjectSchema, req.body);
  await query(`UPDATE media_projects SET
    title = :title,
    tag = :tag,
    cover_url = :cover_url,
    description = :description,
    social_url = :social_url,
    body = :body,
    media_gallery = :media_gallery,
    is_published = :is_published,
    updated_at = CURRENT_TIMESTAMP
    WHERE id = :id`, {
    id: req.params.id,
    ...payload,
    media_gallery: toDbJson(payload.media_gallery),
    is_published: payload.is_published ? 1 : 0,
  });
  const rows = await query('SELECT * FROM media_projects WHERE id = :id LIMIT 1', { id: req.params.id });
  res.json(mapMediaProject(rows[0]));
}));

adminRouter.delete('/media-projects/:id', asyncHandler(async (req, res) => {
  await query('DELETE FROM media_projects WHERE id = :id', { id: req.params.id });
  res.json({ ok: true });
}));

adminRouter.get('/news', asyncHandler(async (_req, res) => {
  const rows = await query('SELECT * FROM news_posts ORDER BY date DESC, created_at DESC');
  res.json(rows.map(mapNewsPost));
}));

adminRouter.post('/news', asyncHandler(async (req, res) => {
  const payload = parseSchema(newsPostSchema, req.body);
  if (payload.resident_id && payload.media_project_id) {
    throw createError(400, 'News post cannot belong to both resident and media project');
  }
  const id = uuidv4();
  await query(`INSERT INTO news_posts (id, title, date, tag, cover_url, body, video_url, media_gallery, resident_id, media_project_id, is_published)
    VALUES (:id, :title, :date, :tag, :cover_url, :body, :video_url, :media_gallery, :resident_id, :media_project_id, :is_published)`, {
    id,
    title: payload.title,
    date: payload.date,
    tag: payload.tag || '',
    cover_url: payload.cover_url || '',
    body: payload.body || '',
    video_url: payload.video_url || '',
    media_gallery: toDbJson(payload.media_gallery),
    resident_id: payload.resident_id || null,
    media_project_id: payload.media_project_id || null,
    is_published: payload.is_published ? 1 : 0,
  });
  const rows = await query('SELECT * FROM news_posts WHERE id = :id LIMIT 1', { id });
  res.status(201).json(mapNewsPost(rows[0]));
}));

adminRouter.put('/news/:id', asyncHandler(async (req, res) => {
  const payload = parseSchema(newsPostSchema, req.body);
  if (payload.resident_id && payload.media_project_id) {
    throw createError(400, 'News post cannot belong to both resident and media project');
  }
  await query(`UPDATE news_posts SET
    title = :title,
    date = :date,
    tag = :tag,
    cover_url = :cover_url,
    body = :body,
    video_url = :video_url,
    media_gallery = :media_gallery,
    resident_id = :resident_id,
    media_project_id = :media_project_id,
    is_published = :is_published,
    updated_at = CURRENT_TIMESTAMP
    WHERE id = :id`, {
    id: req.params.id,
    title: payload.title,
    date: payload.date,
    tag: payload.tag || '',
    cover_url: payload.cover_url || '',
    body: payload.body || '',
    video_url: payload.video_url || '',
    media_gallery: toDbJson(payload.media_gallery),
    resident_id: payload.resident_id || null,
    media_project_id: payload.media_project_id || null,
    is_published: payload.is_published ? 1 : 0,
  });
  const rows = await query('SELECT * FROM news_posts WHERE id = :id LIMIT 1', { id: req.params.id });
  res.json(mapNewsPost(rows[0]));
}));

adminRouter.delete('/news/:id', asyncHandler(async (req, res) => {
  await query('DELETE FROM news_posts WHERE id = :id', { id: req.params.id });
  res.json({ ok: true });
}));
