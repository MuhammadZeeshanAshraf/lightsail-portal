import path from 'path';
import xlsx from 'node-xlsx';
import { INTERNAL_FILES_PATH, SCHEMA, TABLE_DETAILS } from '../../constants';
import { getTrackingSheet, prepareResponse } from '../utilsServices';
import { processTrackingSheet } from './processTrackingSheet';

export const importTrackingWorkSheet = async (
    processID,
    filePath,
    errorList,
    models
) => {
    try {
        const scrapData = [];
        const whereObj = { id: processID };
        const updateProcessObj = Object.assign({}, TABLE_DETAILS.importprocess.ddl);
        delete updateProcessObj.file_name;
        console.log('Start Processing Post Tracking Worksheet');
        /**
         * * Reading Tracking worksheet
         */
        const workSheetsFromFile = xlsx.parse(filePath);
        const totalSheets = workSheetsFromFile.length;
        console.log('Total Number of Sheet : ', totalSheets);

        if (totalSheets > 0) {
            /**
            * * geting Tracking sheets
            */
            const trackingSheets = await getTrackingSheet(
                workSheetsFromFile,
                errorList
            );
            console.log('Total Number of Tracking Sheet : ', trackingSheets.length);
            if (trackingSheets.length > 0) {
                for (const sheet of trackingSheets) {
                    console.log('Currently Processing Sheet : ', sheet.name);
                    updateProcessObj.total_tracking_ids = sheet.data.length;
                    await models.generalDatabaseFunction.updateSingleRowWithReturn(SCHEMA, TABLE_DETAILS.importprocess.name, updateProcessObj, whereObj);
                    await processTrackingSheet(
                        sheet,
                        updateProcessObj,
                        errorList,
                        scrapData,
                        processID,
                        models
                    );
                    updateProcessObj.not_book_ids = updateProcessObj.total_tracking_ids - updateProcessObj.book_ids;
                    updateProcessObj.not_book_on_same_date = updateProcessObj.total_tracking_ids - updateProcessObj.book_on_same_date;
                }
                console.log(whereObj);
                console.log(updateProcessObj);
                await models.generalDatabaseFunction.updateSingleRowWithReturn(SCHEMA, TABLE_DETAILS.importprocess.name, updateProcessObj, whereObj);
            }
        }

        const message = await prepareResponse(
            'Processing Post Tracking Worksheet',
            errorList,
            INTERNAL_FILES_PATH
        );
        console.log(message);
        return errorList;
    } catch (error) {
        errorList.push(error.message);
        console.log(error);
    }
};
