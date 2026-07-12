import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { asyncHandler, createError } from '../lib/http.js';
import { query } from '../lib/db.js';
import { comparePassword, clearAdminCookie, setAdminCookie, signAdminToken } from '../lib/auth.js';
import { adminLoginSchema, parseSchema } from '../lib/validation.js';
import { requireAdmin } from '../middleware/requireAdmin.js';

export const authRouter = Router();

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts, please try again later.' }
});

authRouter.post('/admin/login', loginLimiter, asyncHandler(async (req, res) => {
  const { login, password } = parseSchema(adminLoginSchema, req.body);
  const rows = await query('SELECT id, login, password_hash, is_active FROM admins WHERE login = :login LIMIT 1', { login });
  const admin = rows[0];

  if (!admin || !admin.is_active) {
    throw createError(401, 'Invalid login or password');
  }

  const valid = await comparePassword(password, admin.password_hash);
  if (!valid) {
    throw createError(401, 'Invalid login or password');
  }

  const token = signAdminToken({ sub: admin.id, login: admin.login, role: 'admin' });
  setAdminCookie(res, token);
  res.json({ ok: true, admin: { id: admin.id, login: admin.login, role: 'admin' } });
}));

authRouter.post('/admin/logout', asyncHandler(async (_req, res) => {
  clearAdminCookie(res);
  res.json({ ok: true });
}));

authRouter.get('/admin/me', requireAdmin, asyncHandler(async (req, res) => {
  res.json({ ok: true, admin: req.admin });
}));
