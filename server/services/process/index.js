import { INTERNAL_FILES_PATH, SCHEMA, TABLE_DETAILS } from '../../constants';
import { prepareResponse } from '../utilsServices';

export const createProcess = async (fileName, models, errorList) => {
    try {
        console.log('Creating Process');
        const ProcessID = await getProcessID(fileName, models, errorList);
        if (!ProcessID) {
            return prepareResponse(
                'Processing Post Tracking Worksheet',
                errorList,
                INTERNAL_FILES_PATH
            );
        }
        console.log('Process ID :- ', ProcessID);
        return ProcessID;
    } catch (error) {
        errorList.push(error.message);
        return false;
    }
};

const getProcessID = async (fileName, models, errorList) => {
    try {
        const insertObj = Object.assign({}, TABLE_DETAILS.importprocess.ddl);
        insertObj.file_name = fileName;
        const ProcessID = await models.generalDatabaseFunction.insertSingleRowWithReturn(SCHEMA, TABLE_DETAILS.importprocess.name, insertObj, 'id');
        if (typeof ProcessID[0] === 'undefined') {
            errorList.push({ error: 'Some Problem occur while creating Process ID' });
            return false;
        } else {
            return ProcessID[0];
        }
    } catch (error) {
        console.log(error);
        errorList.push({ error: 'Some Problem occur while creating Process ID' });
        return false;
    }
};
