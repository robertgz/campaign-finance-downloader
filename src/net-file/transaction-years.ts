const puppeteer = require('puppeteer');

import { getNetFilePage, getYearsRoot } from './shared-puppeteer';

export const getTransactionYears = async (aid: string): Promise<string[]> => {
  const years: string[] = [];
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

  try {
    const page = await getNetFilePage(aid, browser);

    const rootHandle = await getYearsRoot(page);

    let yearHandles = await rootHandle.$$(':scope > option');

    for (const yearHandle of  yearHandles) {
      const year: string = yearHandle ? await (await yearHandle.getProperty('value')).jsonValue() : '';
      years.push(year);
    }

  } catch(error) {
    console.error(error);
  } finally {
    await browser.close();
    return years;
  }
}
