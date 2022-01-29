import express from 'express';

import importRouter from './importProcessApi';
import exportRouter from './exportTrackingApi';

const router = express.Router();

router.use('/import-process', importRouter);
router.use('/export-tracking-file', exportRouter);

export default router;
