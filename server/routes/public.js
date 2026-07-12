import { Router } from 'express';
import { asyncHandler } from '../lib/http.js';
import { query } from '../lib/db.js';
import { mapMediaProject, mapNewsPost, mapResident } from '../lib/mappers.js';

export const publicRouter = Router();

publicRouter.get('/residents', asyncHandler(async (_req, res) => {
  const rows = await query('SELECT * FROM residents WHERE is_active = 1 ORDER BY created_at DESC');
  res.json(rows.map(mapResident));
}));

publicRouter.get('/residents/:id', asyncHandler(async (req, res) => {
  const residentRows = await query('SELECT * FROM residents WHERE id = :id LIMIT 1', { id: req.params.id });
  const resident = mapResident(residentRows[0]);
  if (!resident) {
    res.status(404).json({ error: 'Resident not found' });
    return;
  }

  const projects = await query('SELECT * FROM media_projects WHERE is_published = 1 AND resident_id = :id ORDER BY created_at DESC', { id: req.params.id });
  const posts = await query('SELECT * FROM news_posts WHERE is_published = 1 AND resident_id = :id ORDER BY date DESC, created_at DESC', { id: req.params.id });

  res.json({
    resident,
    projects: projects.map(mapMediaProject),
    news: posts.map(mapNewsPost),
  });
}));

publicRouter.get('/media-projects', asyncHandler(async (_req, res) => {
  const rows = await query('SELECT * FROM media_projects WHERE is_published = 1 ORDER BY created_at DESC');
  res.json(rows.map(mapMediaProject));
}));

publicRouter.get('/media-projects/:id', asyncHandler(async (req, res) => {
  const projectRows = await query('SELECT * FROM media_projects WHERE id = :id LIMIT 1', { id: req.params.id });
  const project = mapMediaProject(projectRows[0]);
  if (!project) {
    res.status(404).json({ error: 'Media project not found' });
    return;
  }

  const posts = await query('SELECT * FROM news_posts WHERE is_published = 1 AND media_project_id = :id ORDER BY date DESC, created_at DESC', { id: req.params.id });
  res.json({ project, news: posts.map(mapNewsPost) });
}));

publicRouter.get('/news', asyncHandler(async (_req, res) => {
  const rows = await query('SELECT * FROM news_posts WHERE is_published = 1 AND resident_id IS NULL AND media_project_id IS NULL ORDER BY date DESC, created_at DESC');
  res.json(rows.map(mapNewsPost));
}));

publicRouter.get('/news/:id', asyncHandler(async (req, res) => {
  const rows = await query('SELECT * FROM news_posts WHERE id = :id LIMIT 1', { id: req.params.id });
  const post = mapNewsPost(rows[0]);
  if (!post) {
    res.status(404).json({ error: 'News post not found' });
    return;
  }
  res.json(post);
}));
