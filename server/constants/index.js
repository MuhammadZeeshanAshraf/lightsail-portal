import path from 'path';

/* API Keys */
export const CAPTCH_KEY = '366765b9abdb4e32a7a0a200f28872ec';
export const PORT = '5000';

/* Payload Keys */
export const TRACKING_WORKSHEET = 'TrackingWorkSheet';
export const PROCESS_ID = 'ProcessId';
export const NAME = 'Name';

/* Extension Constant */
export const CSV_EXTESION = '.csv';
export const XLSX_EXTESION = '.xlsx';

/* Path Contants */
export const INTERNAL_FILES_PATH = path.join(__dirname, '..', 'InternalFiles');

/* Template Sheet Header */
export const TRACKING_SHEET_HEADER = [
    'Tracking ID'
];

/* Web Constant */
export const MAIN_URL = 'https://www.indiapost.gov.in/VAS/Pages/IndiaPosthome.aspx';
export const TRACKING_ID = '#ctl00_SPWebPartManager1_g_aa197fec_b38c_41a8_b14e_a11722636b37_ctl00_txtTrackConsign';
export const CAPTCHA_FORMULA = "[id = 'ctl00_SPWebPartManager1_g_aa197fec_b38c_41a8_b14e_a11722636b37_ctl00_ucCaptcha1_lblCaptcha']";
export const CAPTCHA_IMAGE_ID = "[id = 'ctl00_SPWebPartManager1_g_aa197fec_b38c_41a8_b14e_a11722636b37_ctl00_ucCaptcha1_imgMathCaptcha']";
export const CAPTCHA_ANSWER = '#ctl00_SPWebPartManager1_g_aa197fec_b38c_41a8_b14e_a11722636b37_ctl00_ucCaptcha1_txtCaptcha';
export const TRACK_NOW_ID = '#ctl00_SPWebPartManager1_g_aa197fec_b38c_41a8_b14e_a11722636b37_ctl00_imgSearch1';
export const TABLE_ID = "[id = 'ctl00_PlaceHolderMain_ucNewLegacyControl_gvTrckMailArticleDtlsOER']";
export const INVALID_ID_ERROR_TAG_ID = "[id = 'ctl00_SPWebPartManager1_g_aa197fec_b38c_41a8_b14e_a11722636b37_ctl00_lblValidTrackingError']";
export const NUMERAL_ADJECTIVES = {
    First: 1,
    Second: 2,
    Third: 3,
    Fourth: 4,
    Fifth: 5,
    Sixth: 6,
    Seventh: 7,
    Eighth: 8,
    Ninth: 9,
    Tenth: 10
};

export const NA = 'NA';
export const NOT_BOOKED = 'Not Booked';
export const BOOKED = 'Booked';
export const SCHEMA = 'gqowoizl_logistics';
export const BATCH_SIZE = 5000;
export const COLUMN_WIDTH = '25';

export const TABLE_DETAILS = {
    importprocess: {
        name: 'importprocess',
        ddl: {
            file_name: '',
            total_tracking_ids: 0,
            book_ids: 0,
            not_book_ids: 0,
            book_on_same_date: 0,
            not_book_on_same_date: 0,
            total_bill: 0

        }
    },
    tracking: {
        name: 'tracking',
        ddl: {
            process_id: '',
            type: '',
            booked_at: '',
            tracking_id: '',
            booking_date: '',
            customer_pin_code: '',
            delivery_location: '',
            amount: '',
            book_status: ''

        }
    }
};

export const WORKBOOK_PROPERTIES = {
    creator: 'Post Tracking Portal',
    lastModifiedBy: 'zeeshan@gmail.com',
    created: new Date(),
    modified: new Date(),
    lastPrinted: new Date(),
    views: [
        {
            x: 0,
            y: 0,
            width: 10000,
            height: 20000,
            firstSheet: 0,
            activeTab: 1,
            visibility: 'visible'
        }
    ],
    defaultColWidth: 25
};

export const EXCELFILE_EXTENSION = '.xlsx';

export const SHEET_HEADER = [
    { header: 'Tracking ID', key: 'tracking_id', width: COLUMN_WIDTH },
    { header: 'Article Type', key: 'type', width: COLUMN_WIDTH },
    { header: 'Booked At', key: 'booked_at', width: COLUMN_WIDTH },
    { header: 'Date of Booking', key: 'booking_date', width: COLUMN_WIDTH },
    { header: 'Destination PIN Code', key: 'customer_pin_code', width: COLUMN_WIDTH },
    { header: 'Delivery Location', key: 'delivery_location', width: COLUMN_WIDTH },
    { header: 'Amount', key: 'amount', width: COLUMN_WIDTH },
    { header: 'Validate (Validation Check)', key: 'book_status', width: COLUMN_WIDTH }
];
