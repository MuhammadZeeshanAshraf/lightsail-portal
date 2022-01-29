import express from 'express';
import { TRACKING_WORKSHEET } from '../constants';
import { importProcessController } from '../controllers';
import upload from '../middlewares/upload';
import { asyncHandler } from '../utils/api';
import { validator } from '../validators/index';

const router = express.Router();

/**
 * @swagger
 * /import-process:
 *   post:
 *     summary: "Create import process from tracking worksheet"
 *     description: ""
 *     consumes:
 *     - "multipart/form-data"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "TrackingWorkSheet"
 *       in: "formData"
 *       description: "Chose the tracking worksheet"
 *       required: true
 *       type: "file"
 *     responses:
 *       '200':
 *         description: "response object"
 */
router.post('/', upload.single(TRACKING_WORKSHEET), validator.importProcess, asyncHandler(importProcessController.importTrackingWorkSheet));

router.get('/data', upload.single(TRACKING_WORKSHEET), asyncHandler(importProcessController.getTrackingWorkData));

router.get('/history', upload.single(TRACKING_WORKSHEET), asyncHandler(importProcessController.getProcessHistory));

router.post('/data-by-id', upload.single(TRACKING_WORKSHEET), validator.getProcessData, asyncHandler(importProcessController.getProcessData));

export default router;
