import { Page } from "playwright";
import { getMaxPagerNumber, parseItemCountFromSummary, parsePageCountFromSummary } from "./pager-parser.js";

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

  return getMaxPagerNumber(rawPageNumbers)
}

// Alternate method of getting page counts incase the other is not longer sufficient
const getPageCountFromSummary = async (page: Page): Promise<number> => {
  const summarySelector = '#ctl00_GridContent_gridFilers_DXPagerBottom > b.dxp-lead.dxp-summary';
  const summaryLocator = await page.locator(summarySelector);
  const summaryText = await summaryLocator.innerText();

  return parsePageCountFromSummary(summaryText);
}

// Pager Summary only shows if there is more than one page of results
export const getPagerSummaryText = async (page: Page): Promise<string> => {
  const summarySelector = '#ctl00_GridContent_gridFilers_DXPagerBottom > b.dxp-lead.dxp-summary';
  const summaryLocator = await page.locator(summarySelector);
  const summaryText = await summaryLocator.innerText();

  return summaryText;
}

export const getPagerResultsCount = async (page: Page): Promise<number> => {
  const summaryText = await getPagerSummaryText(page);

  return parseItemCountFromSummary(summaryText)
}

const pagerSelector = '#ctl00_GridContent_gridFilers_DXPagerBottom';

export const doesPagerExists = async (page: Page): Promise<boolean>  => {
  const pager = await page.locator(pagerSelector);
  return (await pager.count() > 0);
}
