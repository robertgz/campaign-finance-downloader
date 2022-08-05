
import { Page } from "playwright";
import { getCountFromPopupMessageLocator, getPopupMessageLocator } from "../page-utils/popup-message.js";
// import { getDataRowCount } from "../pages/search-by";
import { doesPagerExists, getPagerSummaryText } from "./page-count.js";
import { parseItemCountFromSummary } from "./pager-parser.js";

/**
 * number of results: 0 = popup visibility: visible, row count = 0 
 * number of results: 1 - 10 = single page
 * number of results: 11 - 400 = multiple pages
 * number of results: 400+ = popup visibility: visible
 */

/**
 * page loaded, no options selected:  popupSelector exists with:
 *  style="height:150px;width:400px;cursor:default;z-index:10000;display:none;visibility:hidden;"
 * less than 10 on a single page, no total items count
 * up to 400 on multiple pages, total items count shown,
 * over 400 on multiple pages, total items count shown,
 *  style="height: 150px; width: 400px; cursor: default; z-index: 12000; visibility: visible; display: table; position: absolute; left: 595px; top: 252px;"
 */
export const getResultsCount = async (page: Page): Promise<number> => {

  let count = 0;
  if (await doesPagerExists(page)) {
    const summaryText = await getPagerSummaryText(page);
    count = parseItemCountFromSummary(summaryText);
  } else {
    count = await getDataRowCount(page);
  }

  console.log({'getResultsCount': count});


  if (count > 399) {
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
