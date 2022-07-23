import { Page } from "playwright";

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
