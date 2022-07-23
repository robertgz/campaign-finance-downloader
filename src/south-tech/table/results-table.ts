import { Page } from "playwright";

export const getHeaderRow = async (page: Page): Promise<string[]> => {

  const rowSelector = '#ctl00_GridContent_gridFilers_DXHeadersRow0 table > tbody > tr > td:nth-child(1)';
  const rowLocator = await page.locator(rowSelector);

  return await rowLocator.allInnerTexts();
}


export const getAllPagesData = async (page: Page, pageCount: number): Promise<string[][]> => {

  const allRows = [...(await getRawTableRows(page))];

  for (let pageIndex = 1; pageIndex < pageCount; ++pageIndex ) {
    await goToPageNum(page, pageIndex);
  
    const pageRows = await getRawTableRows(page);

    allRows.push(...pageRows);
  }

  return allRows;
}

const getRawTableRows = async (page: Page): Promise<string[][]>  => {
  const rowSelector = '#ctl00_GridContent_gridFilers_DXMainTable > tbody  > tr.dxgvDataRow_Glass';
  const rowsLocator = await page.locator(rowSelector);

  const rawRows: string[] = await rowsLocator.allInnerTexts();
  const rows = rawRows.map((row) => row.split('\t'))

  return rows;
}


const goToPageNum = async (page: Page, pageIndex: number): Promise<void> => {
  // PN# is zero indexed
  const goToPageCommand =
    `ASPx.GVPagerOnClick('ctl00_GridContent_gridFilers','PN${pageIndex}');`;
  await page.evaluate(goToPageCommand);

  // pageNumber is 1 indexed 
  const pageNumber = pageIndex + 1;

  // current page number is indicated by being inside brackets. Example: [3]
  const pageNumSelector = `b.dxp-current:has-text("${pageNumber}")`;

  await page.waitForSelector(pageNumSelector);
}
