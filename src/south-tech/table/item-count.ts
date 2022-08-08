
import { Page } from "playwright";
import { getCountFromPopupMessageLocator, getPopupMessageLocator } from "../page-utils/popup-message.js";
import { doesPagerExists, getPagerSummaryText } from "./page-count.js";
import { parseItemCountFromSummary } from "./pager-parser.js";

/**
 * number of results: 0: popup visible
 * number of results: 0 - 10: single page
 * number of results: 11 - 400: multiple pages
 * number of results: > 400: popup visible
 */

export const getResultsCount = async (page: Page): Promise<number> => {
  const maxResultsPerSearch = 400;

  let count = 0;
  if (await doesPagerExists(page)) {
    const summaryText = await getPagerSummaryText(page);
    count = parseItemCountFromSummary(summaryText);
  } else {
    count = await getDataRowCount(page);
  }

  if (count > maxResultsPerSearch) {
    const locator = await getPopupMessageLocator(page);
    count = await getCountFromPopupMessageLocator(locator);
  }

  return count;
}

// Gets the count of rows on only a single page of results.
export const getDataRowCount = async (page: Page) => {
  const selector = '#ctl00_GridContent_gridFilers_DXMainTable > tbody  > tr.dxgvDataRow_Glass';
  const locator = await page.locator(selector);

  const count = (await locator.count()); 

  return count;
}
