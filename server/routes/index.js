import { Router } from 'express';
import { publicRouter } from './public.js';
import { adminRouter } from './admin.js';
import { authRouter } from './auth.js';
import { uploadRouter } from './upload.js';

export const router = Router();

router.use('/auth', authRouter);
router.use('/upload', uploadRouter);
router.use('/admin', adminRouter);
router.use('/', publicRouter);
