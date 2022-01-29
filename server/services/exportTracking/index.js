import { EXCELFILE_EXTENSION, INTERNAL_FILES_PATH, SCHEMA, SHEET_HEADER, TABLE_DETAILS, TRACKING_WORKSHEET, WORKBOOK_PROPERTIES } from '../../constants';
import ExcelJS from 'exceljs';
import { getHeader, styleWorkBookHeader } from '../utilsServices';
import path from 'path';

export const exportTrackingWorksheet = async (ProcessId, models, errorList) => {
    try {
        let message = '';
        const trackingData =
            await models.generalDatabaseFunction.getDatabySingleWhereColumn(
                SCHEMA,
                TABLE_DETAILS.tracking.name,
                'process_id',
                ProcessId
            );
        console.log(trackingData.length);
        if (trackingData.length > 0) {
            const workbook = new ExcelJS.Workbook(WORKBOOK_PROPERTIES);
            const worksheet = workbook.addWorksheet('Tracking Data');
            worksheet.columns = SHEET_HEADER;
            for (const row of trackingData) {
                const rowObject = {};
                worksheet.columns[0]._worksheet._columns.forEach(element => {
                    rowObject[element._key] = row[element._key];
                });
                worksheet.addRow(rowObject);
            }
            styleWorkBookHeader(workbook);
            const exportPath = path.join(INTERNAL_FILES_PATH, (TRACKING_WORKSHEET + EXCELFILE_EXTENSION));
            await workbook.xlsx.writeFile(exportPath);
            return exportPath;
        } else {
            message = `Unable to export Tracking file, No data found aganist process id :- ${ProcessId}`;
        }

        console.log(message);
        return message;
    } catch (error) {
        errorList.push(error.message);
        console.log(error);
    }
};
