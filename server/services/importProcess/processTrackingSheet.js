import { evaluate } from 'mathjs';
import puppeteer from 'puppeteer-extra';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import randomUseragent from 'random-useragent';
import {
    BOOKED,
    CAPTCHA_ANSWER,
    CAPTCHA_FORMULA,
    CAPTCHA_IMAGE_ID,
    CAPTCH_KEY,
    MAIN_URL,
    NUMERAL_ADJECTIVES,
    SCHEMA,
    TABLE_DETAILS,
    TRACKING_ID,
    TRACK_NOW_ID
} from '../../constants';

const Client = require('@infosimples/node_two_captcha');

// Declare your client
const client = new Client(CAPTCH_KEY, {
    timeout: 60000,
    polling: 5000,
    throwErrors: false
});

puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

export const processTrackingSheet = async (
    sheet,
    updateProcessObj,
    errorList,
    scrapData,
    processID,
    models
) => {
    try {
        if (typeof sheet.data[0] === 'undefined') {
            return false;
        } else {
            let x = 1;
            const records = sheet.data;
            const browser = await puppeteer.launch({
                headless: true,
                timeout: 0,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
            updateProcessObj.total_tracking_ids = records.length;

            while (records.length > 0) {
                const recordsBatch = records.splice(0, 1);
                const recordPromises = [];
                for (const record of recordsBatch) {
                    console.log(x, '==>', record['Tracking ID']);
                    recordPromises.push(
                        processSingleTrackingID(
                            record['Tracking ID'],
                            browser,
                            errorList,
                            scrapData,
                            processID,
                            updateProcessObj,
                            records,
                            models
                        )
                    );
                    x++;
                }
                await Promise.all(recordPromises);
                models.generalDatabaseFunction.insertMultipleRows(SCHEMA,
                    TABLE_DETAILS.tracking.name, scrapData);
            }

            console.log(scrapData);
            await browser.close();
        }
    } catch (error) {
        errorList.push(error.message);
        // console.log(error);
    }
};

const processSingleTrackingID = async (
    trackingID,
    browser,
    errorList,
    scrapData,
    processID,
    updateProcessObj,
    records,
    models
) => {
    try {
        const page = await browser.newPage();
        await page.setUserAgent(randomUseragent.getRandom());
        await page.setViewport({ width: 1366, height: 768 });
        await page.goto(MAIN_URL, {
            waitUntil: 'domcontentloaded',
            timeout: 12000
        });
        await page.type(TRACKING_ID, trackingID);

        const element = await page.waitForSelector(CAPTCHA_FORMULA);
        const captchaQuestion = await element.evaluate((el) => el.textContent);
        console.log(captchaQuestion);
        // await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
        const image = await page.waitForSelector(CAPTCHA_IMAGE_ID, {
            timeout: 12000
        });
        const src = await image.evaluate((el) => el.src);
        console.log(src);
        const catchResponse = await client.decode({
            url: src
        });
        console.log('catchResponse :- ', catchResponse.text);

        let answer = '';
        if (captchaQuestion === 'Evaluate the Expression') {
            if (catchResponse.text.length < 3) {
                answer = catchResponse.text;
            } else {
                const editedText = catchResponse.text.slice(0, -1);
                answer = evaluate(editedText);
            }
        } else if (captchaQuestion === 'Enter characters as displayed in image') {
            answer = catchResponse.text;
        } else {
            const words = captchaQuestion.split(' ');
            const numberWord = NUMERAL_ADJECTIVES[words[2]];
            const arr = catchResponse.text.split('');
            console.log(arr);
            answer = arr[numberWord - 1];
        }
        answer = answer.toString();
        console.log('Answer', answer);
        await page.type(CAPTCHA_ANSWER, answer);

        await page.click(TRACK_NOW_ID);
        await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 0 });

        const data = await page.$$eval('table tr td', (tds) =>
            tds.map((td) => {
                return td.innerText;
            })
        );

        console.log(data.length);
        if (data.length > 3) {
            updateProcessObj.total_bill =
                updateProcessObj.total_bill + parseFloat(data[3]);
            console.log(updateProcessObj.total_bill);
            let today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const yyyy = today.getFullYear();

            today = mm + '/' + dd + '/' + yyyy;
            const ok = data[1].split(' ');
            if (ok === today) {
                updateProcessObj.book_on_same_date++;
            }
            updateProcessObj.book_ids++;
            scrapData.push({
                process_id: processID,
                tracking_id: trackingID,
                booking_date: data[1],
                customer_pin_code: data[2],
                amount: data[3],
                book_status: BOOKED,
                type: data[4],
                booked_at: data[0],
                delivery_location: data[5]
            });

            models.generalDatabaseFunction.insertMultipleRows(
                SCHEMA,
                TABLE_DETAILS.tracking.name,
                scrapData
            );
            return true;
        } else {
            records.push({
                'Tracking ID': trackingID
            });
            return true;
        }
    } catch (error) {
        records.push({
            'Tracking ID': trackingID
        });
        errorList.push(error.message);
        // console.log(error);
        return true;
    }
};
