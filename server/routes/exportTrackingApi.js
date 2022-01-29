import express from 'express';
import { TRACKING_WORKSHEET } from '../constants';
import { exportTrackingController, importProcessController } from '../controllers';
import upload from '../middlewares/upload';
import { asyncHandler } from '../utils/api';
import { validator } from '../validators/index';

const router = express.Router();

/**
 * @swagger
 * /exportTrackingApi:
 *   get:
 *     summary: "Create exporting tracking worksheet from process"
 *     description: ""
 *     consumes:
 *     - "multipart/form-data"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "ProcessId"
 *       in: "formData"
 *       description: "5"
 *       required: true
 *       type: "string"
 *     responses:
 *       '200':
 *         description: "response object"
 */
router.get('/', upload.single(TRACKING_WORKSHEET), /*validator.exportTracking ,*/ asyncHandler(exportTrackingController.exportTrackingWorkSheet));

export default router;
