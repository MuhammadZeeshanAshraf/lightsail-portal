import path from 'path';
import { Messages } from '../validators/errorMessage';

export const checkFileExistanceInRequest = (fileName, request) => {
    try {
        return getFileFromRequest(fileName, request);
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const checkFileExtension = (fileName, extension, request) => {
    try {
        const file = getFileFromRequest(fileName, request);
        const ext = (path.extname(file)).toLowerCase();
        if (ext === extension) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const checkFileExistanceAndExtension = (filename, extension, request, preffix) => {
    try {
        if (checkFileExistanceInRequest(filename, request)) {
            if (checkFileExtension(filename, extension, request)) {
                return Promise.resolve();
            } else {
                return Promise.reject(new TypeError(Messages.inCorrectExtension(filename, extension)));
            }
        } else {
            return Promise.reject(new TypeError(Messages.isNecessary(filename, preffix || 'creating process')));
        }
    } catch (error) {
        console.log(error);
        return Promise.reject(new Error(error));
    }
};

const getFileFromRequest = (fileName, request) => {
    try {
        let file = false;
        if (request && (request.file || request.files)) {
            if (typeof request.files === 'undefined') {
                file = typeof request.file.filename !== 'undefined' ? request.file.filename : false;
            } else {
                file = typeof request.files[fileName] !== 'undefined' ? request.files[fileName][0].filename : false;
            }
        }
        return file;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const checkForSupportedValue = (value, supportedSupportedValue) => {
    try {
        if (!supportedSupportedValue.includes(value)) {
            return Promise.reject(new TypeError(Messages.inNotSupport(value, supportedSupportedValue)));
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};
