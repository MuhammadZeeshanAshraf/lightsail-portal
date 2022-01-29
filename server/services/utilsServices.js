import path from 'path';
import _ from 'lodash';
import fs from 'fs';
import { COLUMN_WIDTH, TRACKING_SHEET_HEADER } from '../constants';
const csv = require('fast-csv');
const del = require('del');
const fetch = require('node-fetch');

export const writeCSVFromJsonArray = (reportPath, errorList) => {
    return new Promise((resolve, reject) => {
        csv
            .writeToPath(reportPath, errorList, { headers: true, quoteColumns: true })
            .on('error', (err) => {
                console.log(err);
                reject(err);
            })
            .on('finish', resolve('Done Writing'));
    });
};

export const prepareResponse = async (
    message,
    errorList,
    migratorFilesPath
) => {
    try {
        const reportPath = path.join(migratorFilesPath, 'errorLogs.csv');
        await writeCSVFromJsonArray(reportPath, errorList);
        return {
            message: message,
            processWithOutError: !(errorList.length > 0),
            numberOfError: errorList.length > 0 ? errorList.length : 0,
            errorLogFilePath: reportPath
        };
    } catch (error) {
        console.log(error);
    }
};

export const getTrackingSheet = async (
    workSheetsFromFile,
    errorList
) => {
    try {
        const trackingSheets = [];
        for (const sheet of workSheetsFromFile) {
            trackingSheetValidation(
                sheet,
                trackingSheets,
                errorList
            );
        }
        return trackingSheets;
    } catch (error) {
        errorList.push(error.message);
        console.log(error);
    }
};

const trackingSheetValidation = (
    sheet,
    trackingSheets,
    errorList
) => {
    try {
        const { headers, records } = getSheetDetails(sheet, errorList);
        const exceptedHeader = TRACKING_SHEET_HEADER;
        const headerCheck = validateHeader(headers, exceptedHeader, errorList);
        if (headerCheck) {
            trackingSheets.push({
                name: sheet.name,
                data: records
            });
        }
        return headerCheck;
    } catch (error) {
        errorList.push(error.message);
        console.log(error);
    }
};

export const getSheetDetails = (sheet, errorList) => {
    try {
        const headers = sheet.data[0];
        const recordRows = sheet.data.slice(1, sheet.data.length);
        const records = convertSheetRowsIntoOjects(headers, recordRows, errorList);
        return { headers, records };
    } catch (error) {
        errorList.push(error.message);
        console.log(error);
    }
};

export const convertSheetRowsIntoOjects = (headers, rows, errorList) => {
    try {
        const resultObjects = [];
        let x = 2;
        for (const row of rows) {
            if (Array.isArray(row) && row.length > 0) {
                const result = {};
                for (let i = 0; i < headers.length; i++) {
                    result[headers[i]] = row[i];
                }
                result.rowNumber = x;
                resultObjects.push(result);
                x++;
            }
        }
        return resultObjects;
    } catch (error) {
        errorList.push(error.message);
        console.log(error);
    }
};

export const validateHeader = (headers, exceptHeader, errorList) => {
    try {
        const diff = _.difference(headers, exceptHeader);
        if (diff.length === 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        errorList.push(error.message);
        console.log(error);
    }
};

export const saveImageToDisk = async (url, filename, errorList) => {
    try {
        fetch(url)
            .then(res => {
                const dest = fs.createWriteStream(filename);
                res.body.pipe(dest);
            })
            .catch((err) => {
                errorList.push(err.message);
                console.log(err);
            });
    } catch (error) {
        errorList.push(error.message);
        console.log(error);
    }
};

export const cleanFileDirectory = async (filePath, errorList) => {
    try {
        console.log('Deleting File Path :- ', filePath);
        if (fs.existsSync(filePath)) {
            try {
                await del(filePath);
            } catch (err) {
                console.error(`Error while deleting ${filePath}.`);
                errorList.push(`Error while deleting ${filePath}.`);
                return false;
            }
        }

        try {
            fs.mkdirSync(filePath);
            return true;
        } catch (error) {
            errorList.push(error.message);
            errorList.push('Tarcking IDs Operation Abort');
            return false;
        }
    } catch (error) {
        errorList.push('Tarcking IDs Operation Abort');
        return false;
    }
};

export const styleWorkBookHeader = (workbook) => {
    try {
        workbook.eachSheet(function (worksheet, sheetId) {
            if (worksheet.getRow(1)) {
                worksheet.getRow(1).font = { color: { argb: 'FF44546A' }, size: 14, bold: true };
                worksheet.getRow(1).border = {
                    bottom: { style: 'thick', color: { argb: 'FF44546A' } }
                };
            }
        });
    } catch (error) {
        console.log(error);
    }
};

export const getHeader = (attributeDataFilter) => {
    try {
        const columns = [];
        attributeDataFilter.forEach(element => {
            const header = { header: element.display_name, key: element.display_name, width: COLUMN_WIDTH };
            columns.push(header);
        });
        return columns;
    } catch (error) {
        console.log(error);
    }
};
