import { payloadValidation as importProcessValidator, getProcessDataPayloadValidation as getProcessDataValidator } from './importProcess';
import { payloadValidation as exportTrackingValidator } from './exportTracking';

export const validator = {
    importProcess: importProcessValidator,
    getProcessData: getProcessDataValidator,
    exportTracking: exportTrackingValidator
};
