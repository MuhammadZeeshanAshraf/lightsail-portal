import { PROCESS_ID } from '../constants';

const { check, validationResult } = require('express-validator');

export const payloadValidation = [
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
