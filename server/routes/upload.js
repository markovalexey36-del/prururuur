import { Router } from 'express';
import { requireAdmin } from '../middleware/requireAdmin.js';
import { asyncHandler, createError } from '../lib/http.js';
import { upload } from '../lib/upload.js';

export const uploadRouter = Router();

uploadRouter.post('/', requireAdmin, upload.single('file'), asyncHandler(async (req, res) => {
  if (!req.file) {
    throw createError(400, 'File is required');
  }

  const baseUrl = process.env.PUBLIC_BASE_URL || `${req.protocol}://${req.get('host')}`;
  res.json({
    file_url: `${baseUrl}/uploads/${req.file.filename}`,
    filename: req.file.filename,
    mimetype: req.file.mimetype,
    size: req.file.size,
  });
}));
