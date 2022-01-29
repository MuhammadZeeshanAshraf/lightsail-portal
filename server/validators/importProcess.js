import { NAME, PROCESS_ID, TRACKING_WORKSHEET, XLSX_EXTESION } from '../constants';
import { checkFileExistanceAndExtension } from '../utils/validator';

const { check, validationResult, body } = require('express-validator');

export const payloadValidation = [
  check(NAME)
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Name of file can not be empty!...')
    .bail(),
  body(TRACKING_WORKSHEET).custom(async (value, { req }) => {
    await checkFileExistanceAndExtension(TRACKING_WORKSHEET, XLSX_EXTESION, req, 'creation of import process');
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];

export const getProcessDataPayloadValidation = [
  check(PROCESS_ID)
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Process ID can not be empty!...')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];
