import path from 'path';
import * as importProcessService from '../services/importProcess';
import * as processService from '../services/process';
import models from '../models';
import { SCHEMA, TABLE_DETAILS } from '../constants';

export const importTrackingWorkSheet = async (request, response, next) => {
  try {
    const errorList = [];
    const filePath = path.join(
      __dirname,
      '..',
      'InternalFiles',
      request.file.filename
    );
    const { Name } = request.body;
    const processID = await processService.createProcess(Name, models, errorList);
    if (typeof processID !== 'object' && typeof processID !== 'function') {
      const message = await importProcessService.importTrackingWorkSheet(
        processID,
        filePath,
        errorList,
        models
      );
      response.send(message);
    } else {
      response.send(processID);
    }
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};

export const getTrackingWorkData = async (request, response, next) => {
  try {
    let trackingData = [];
    const processID =
      await models.generalDatabaseFunction.getComplexMaxByColumn(
        SCHEMA,
        TABLE_DETAILS.importprocess.name,
        'id',
        {}
      );
    const totalData = await models.generalDatabaseFunction.getDatabySingleWhereColumn(
      SCHEMA,
      TABLE_DETAILS.importprocess.name,
      'id',
      processID
    );
    const total = totalData[0].total_tracking_ids;
    trackingData =
      await models.generalDatabaseFunction.getDatabySingleWhereColumn(
        SCHEMA,
        TABLE_DETAILS.tracking.name,
        'process_id',
        processID
      );
    response.send({
      trackingData: trackingData,
      total: total
    });
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};

export const getProcessHistory = async (request, response, next) => {
  try {
    const trackingData =
      await models.generalDatabaseFunction.getAllData(
        SCHEMA,
        TABLE_DETAILS.importprocess.name
      );
    response.send(trackingData.reverse());
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};

export const getProcessData = async (request, response, next) => {
  try {
    const { ProcessId } = request.body;
    let trackingData = [];
    const totalData = await models.generalDatabaseFunction.getDatabySingleWhereColumn(
      SCHEMA,
      TABLE_DETAILS.importprocess.name,
      'id',
      ProcessId
    );
    const total = totalData[0].total_tracking_ids;
    trackingData =
      await models.generalDatabaseFunction.getDatabySingleWhereColumn(
        SCHEMA,
        TABLE_DETAILS.tracking.name,
        'process_id',
        ProcessId
      );
    response.send({
      total: total,
      trackingData: trackingData
    });
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};
