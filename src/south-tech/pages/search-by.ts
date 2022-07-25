import { chromium, Page } from "playwright"
import { PageSuffix, UrlPathPrefix } from "../types.js"
import { getAllPagesData, getHeaderRow } from "../table/results-table"
import { buildObjects } from "../page-utils/map-utils"
import { getPageCount } from "../table/page-count"
import { clickSearchButton } from "../page-controls/search-button"
import { getSearchPage } from "./get-page.js"

interface SearchConfiguration<Type> extends UrlPathPrefix, PageSuffix {
  urlPathPrefix: string
  pageSuffix: string
  inputOptions: Type
  applySearchOptions: (page: Page, options: Type) => Promise<void>
}

interface Response<T> {
  data: T;
  resultsFound: number;
  resultsReturned: number;
  statusText: string; // 'OK', 'Error'
}

export const doSearchByPage = async <Type>(configuration: SearchConfiguration<Type>) => {
  const browser = await chromium.launch({
    headless: true,
  });

  const {urlPathPrefix, pageSuffix, inputOptions, applySearchOptions } = configuration;

  try {
    let page = await getSearchPage(browser, urlPathPrefix, pageSuffix);

    await applySearchOptions(page, inputOptions);
    await clickSearchButton(page);
    await checkResultsCount(page);

    const pageCount = await getPageCount(page);
    const dataRows  = await getAllPagesData(page, pageCount);
    const headerRow = await getHeaderRow(page);

    return buildObjects(dataRows, headerRow);

  } catch (error) {
    if (error instanceof RangeError)
    {
      console.log(error.message);
      return [];
    }

    console.log({error});

    return [];
  } finally {
    await browser.close();
  }
}

const checkResultsCount = async (page: Page): Promise<void>  => {
  const popupSelector = `#ctl00_GridContent_popupCantContinueDialog_PW-1`

  await page.waitForSelector(popupSelector);
  const isTooMany = await page.locator(popupSelector).isVisible();

  if (isTooMany) {
    const selector = `#ctl00_GridContent_popupCantContinueDialog_msgDiv > b >> nth=0`;
    const count = await page.locator(selector).innerText();

    if (isTooMany) throw new RangeError(`Too many results (Found: ${count}, Max: 400). Please narrow your search.`);
  }
}
