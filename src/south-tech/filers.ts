import { Page, chromium, Locator } from 'playwright';
import { getSearchElectionPage } from './pages.js';

export interface Filer {
  election_type: string;
  election_date: string;
  filer_name: string;
  candidate_last_name: string;
  candidate_first_name: string;
  candidate_middle_name: string;
  ballot_item: string;
  support_oppose: string;
  ballot_type: string;
}

/**
 * electionDate in the format: M/D/YYYY
 *  examples: '6/7/2022',  '4/5/2022'
 */
export const getFilers = async (pathSegment: string, electionDate: string): Promise<Filer[]> => {
  const browser = await chromium.launch({
    headless: true,
  });
 
  const page = await getSearchElectionPage(browser, pathSegment);

  await selectDateOption(page, electionDate);
  await page.waitForLoadState('networkidle');

  let filerRows: Filer[] = [];

  if (await hasMorePages(page)) {
    filerRows = await getMultiPageFilers(page);
  } else {
    filerRows = await getTableData(page);
  }

  await browser.close();

  return filerRows;
}

const getMultiPageFilers = async (page: Page): Promise<Filer[]> => {
  const numberSelectors 
    = await page.locator(`#ctl00_GridContent_gridFilers_DXPagerBottom > .dxp-num`);
   
  let allFilerRows: Filer[] = [];
    
  const pageCount = await numberSelectors.count();

  for (let i = 0; i < pageCount; i++) {
    await goToDataPageNum(i, page);
    const rows = await getTableData(page);
    allFilerRows = allFilerRows.concat(rows);
  }

  return allFilerRows;
}

const goToDataPageNum = async (pageNumber: number, page: Page): Promise<void> => {
  const currentPageNumber = await getCurrentPageNum(page);
  const newPageNumber = pageNumber + 1;

  if (currentPageNumber === newPageNumber) return;

  // PN# is zero indexed, pages number higher than the last page go to the last page
  const pageStr = `PN${pageNumber}`; 
  const goToPageCommand = `ASPx.GVPagerOnClick('ctl00_GridContent_gridFilers','${pageStr}');`;

  await page.evaluate(goToPageCommand);
  const pageNumSelector = `b.dxp-current:has-text("${newPageNumber}")`;

  await page.waitForSelector(pageNumSelector);
}

// Page numbers from getCurrentPageNum start at 1
const getCurrentPageNum = async (page: Page): Promise<number> => {
  const currentPageLocator 
    = await page.locator(`#ctl00_GridContent_gridFilers_DXPagerBottom > .dxp-num.dxp-current`);
  let pageElementText = await currentPageLocator.textContent();

  if (!pageElementText) throw(`Error: can not determine current page number. From: ${pageElementText}`);

  pageElementText = pageElementText.replace('[', '').replace(']', '');

  if (!pageElementText) throw(`Error: can not determine current page number. From: ${pageElementText}`);

  return parseInt(pageElementText);
}

const hasMorePages = async (page: Page): Promise<boolean> => {
  const pagerBottomID = `#ctl00_GridContent_gridFilers_DXPagerBottom`;
  const pager = await page.locator(pagerBottomID);

  return await pager.count() > 0;
}

const selectDateOption = async (page: Page, electionDate: string): Promise<void> => {
  await page.locator('#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_ElectionDate_B-1').click(); 
  await page.locator(`#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_ElectionDate_DDD_L_LBT > tbody > tr:has-text("${electionDate}")`).click();
  await page.locator('#ctl00_DefaultContent_ASPxRoundPanel1_btnFindFilers').click();
}

const getTableData = async (page: Page) => {
  const rowSelector = '#ctl00_GridContent_gridFilers_DXMainTable > tbody  > tr';
  const rows = await page.locator(rowSelector);
  
  const filerRows: Filer[] = [];
  const startingRow = 4; // Skip the resize, header, and filter rows
  const count = await rows.count();

  for (let i = startingRow; i <= count; ++i) {
    // Index used for :nth-of-type is 1-based
    const rowArray = await getRow(await page.locator(`${rowSelector}:nth-of-type(${i}) > td`));
    filerRows.push(createRowObject(rowArray));
  }

  return filerRows;
}


const createRowObject = (row: string[]): Filer => {
  return {
    election_type: row[0],
    election_date: row[1],
    filer_name: row[2],
    candidate_last_name: row[3],
    candidate_first_name: row[4],
    candidate_middle_name: row[5],
    ballot_item: row[6],
    support_oppose: row[7],
    ballot_type: row[8],
  }
}

const getRow = async (row: Locator): Promise<string[]> => {
  const rowItems: string[] = [];

  // Exclude the last item 'view_forms' which is a link
  const columnCount = (await row.count()) - 1; 

  for (let i = 0; i < columnCount; ++i) {
    const item = await row.nth(i).textContent();
    rowItems.push(item?.trim() ? item.trim() : '');
  }

  return rowItems;
}
