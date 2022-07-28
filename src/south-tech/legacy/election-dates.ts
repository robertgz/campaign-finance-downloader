import * as playwright from 'playwright';
import { Locator, Page } from 'playwright';
import { getSearchElectionPage } from '../pages.js';

/**
 * pathSegment examples: SanDiegoCounty, DavisCity, SantaClaritaCity
 */
export const getElectionDates = async (urlPrefix: string): Promise<string[]> => {
  const browser = await playwright.chromium.launch({
    headless: true,
  });
 
  const page = await getSearchElectionPage(browser, urlPrefix);
  const yearListLocator = getYearListSelector(page);

  const dates: string[] = [];
  const count = await yearListLocator.count()
  for (let i = 1; i < count; ++i) {
    const content = await yearListLocator.nth(i).locator('td').textContent();
    if (content) dates.push(content);
  }

  await browser.close();

  return dates;
}

const getYearListSelector = (page: Page): Locator => {
  const yearListTable = `#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_ElectionDate_DDD_L_LBT > tbody  > tr`;
  
  return page.locator(yearListTable);
}
