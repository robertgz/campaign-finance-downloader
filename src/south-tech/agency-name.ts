
import * as playwright from 'playwright';
import { Locator, Page } from 'playwright';
import { getWelcomePage } from './pages.js';
import { UrlPrefixType } from './types.js';

export const getAgencyName = async (urlPrefix: UrlPrefixType): Promise<string> => {
  const browser = await playwright.chromium.launch({
    headless: true,
  });

  const page = await getWelcomePage(browser, urlPrefix);
  const agencyNameLocator = getAgencyNameSelector(page);

  const name = await agencyNameLocator.textContent();

  await browser.close();

  if (!name) throw new Error(`Agency name not found on page.`);

  return name;
}

const getAgencyNameSelector = (page: Page): Locator => {
  const yearListTable = `#ctl00_masterHeader_lblHeaderText`;
  
  return page.locator(yearListTable);
}
