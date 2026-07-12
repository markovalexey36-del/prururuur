import { getAdminTokenFromRequest, verifyAdminToken } from '../lib/auth.js';
import { createError } from '../lib/http.js';

export function requireAdmin(req, _res, next) {
  const token = getAdminTokenFromRequest(req);
  if (!token) {
    next(createError(401, 'Authentication required'));
    return;
  }

  try {
    const payload = verifyAdminToken(token);
    req.admin = payload;
    next();
  } catch {
    next(createError(401, 'Invalid session'));
  }
}
