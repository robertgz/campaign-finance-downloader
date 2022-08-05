import { Locator, Page } from "playwright";
import { getDataRowCount, getPopupMessageHTML } from "south-tech/pages/search-by";

export const getPageCount = async (page: Page): Promise<number> => {
  const pagerBottomID = `#ctl00_GridContent_gridFilers_DXPagerBottom`;
  const pager = await page.locator(pagerBottomID);
  const hasMultiplePages = await pager.count() > 0;

  return hasMultiplePages ? await getPageCountFromPager(page) : 1;
}

// Primary function to get page counts
const getPageCountFromPager = async (page: Page): Promise<number> => {
  const summarySelector = '#ctl00_GridContent_gridFilers_DXPagerBottom > .dxp-num';
  const summaryLocator = await page.locator(summarySelector);
  const rawPageNumbers: string[] = await summaryLocator.allTextContents();

  const pageNumbers = rawPageNumbers
    .map((num) => parseInt(num.replaceAll('[','').replaceAll(']','')));

  return Math.max(...pageNumbers)
}

// Alternate method of getting page counts incase the other is not longer sufficient
const getPageCountFromSummary = async (page: Page): Promise<number> => {
  const summarySelector = '#ctl00_GridContent_gridFilers_DXPagerBottom > b.dxp-lead.dxp-summary';
  const summaryLocator = await page.locator(summarySelector);
  const summaryText = await summaryLocator.innerText();

  const countText = summaryText.split('(')[0].split('of')[1].trim();

  return parseInt(countText);
}

// Pager Summary only shows if there is more than one page of results
const getPagerSummaryText = async (page: Page): Promise<string> => {
  const summarySelector = '#ctl00_GridContent_gridFilers_DXPagerBottom > b.dxp-lead.dxp-summary';
  const summaryLocator = await page.locator(summarySelector);
  const summaryText = await summaryLocator.innerText();

  return summaryText;
}

export const getPagerResultsCount = async (page: Page): Promise<number> => {
  const summaryText = await getPagerSummaryText(page);

  const countText = summaryText.split('(')[1].split(' ')[0].trim();

  return parseInt(countText);
}

const getCountFromSummary = (summary: string) => {
  const countText = summary.split('(')[1].split(' ')[0].trim();

  return parseInt(countText);
}

const pagerSelector = '#ctl00_GridContent_gridFilers_DXPagerBottom';

const doesPagerExists = async (page: Page): Promise<boolean>  => {
  const pager = await page.locator(pagerSelector);
  return (await pager.count() > 0);
}

export const getPopupMessageLocator = async (page: Page): Promise<Locator>  => {
  const messageSelector = `#ctl00_GridContent_popupCantContinueDialog_msgDiv`;
  const locator = await page.locator(messageSelector);
  return locator;
}

export const getResultsCount2 = async (page: Page) => {

  let count = 0;
  if (await doesPagerExists(page)) {
    const summaryText = await getPagerSummaryText(page);
    count = getCountFromSummary(summaryText);
  } else {
    count = await getDataRowCount(page);
  }

  if (count > 399) {
    // const popupMessageText = await getPopupMessageHTML(page);
    const locator = await getPopupMessageLocator(page);
    // count = await getPopupMessageHTMLLocator(page);
  }

  // check for existance of pager
  // if not exist get count of rows in current page
  // else get count from pager
  // if pager count > 399 then get popup message text and get count from it

}

export const getCountFromPopupMessageLocator = async (locator: Locator) => {
  const countLocator = await locator.locator(`> b >> nth=0`);

  let count = 0;
  if (await countLocator.count() > 0) {
    const countText = await countLocator.innerText();
    count = parseInt(countText);
  }

  return count;
}
