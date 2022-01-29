import path from 'path';
import * as exportTrackingService from '../services/exportTracking';
import models from '../models';

export const exportTrackingWorkSheet = async (request, response, next) => {
  try {
    const errorList = [];
    const { ProcessId } = request.query;
    console.log('------------->', ProcessId);
    const message = await exportTrackingService.exportTrackingWorksheet(ProcessId, models, errorList);
    console.log('path', message);
    response.contentType('application/xlsx');
    response.status(200).sendFile(message);
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};
