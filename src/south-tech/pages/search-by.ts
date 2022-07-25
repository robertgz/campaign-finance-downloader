import { chromium, Page } from "playwright"
import { PageSuffix, UrlPathPrefix } from "../types.js"
import { getAllPagesData, getHeaderRow } from "../table/results-table"
import { buildObjects } from "../page-utils/map-utils"
import { getPageCount } from "../table/page-count"
import { clickSearchButton } from "../page-controls/search-button"
import { getSearchPage } from "./get-page.js"
import { SearchResponse } from "../search-by/output-types.js"

interface SearchConfiguration<Type> extends UrlPathPrefix, PageSuffix {
  urlPathPrefix: string
  pageSuffix: string
  inputOptions: Type
  applySearchOptions: (page: Page, options: Type) => Promise<void>
}


interface SearchConfigurationItem<Type> extends PageSuffix {
  pageSuffix: string
  inputOptions: Type
  applySearchOptions: (page: Page, options: Type) => Promise<void>
}

interface searches {
  searchConfigurationItems: SearchConfigurationItem<any>[];
}
// maybe consolidate all of the configuration functions and pass in an object where get keys is used to determine which options to set
// each page will have a generate configuration object function to enforce the correct object shape
// the object will replace the setOptions function

const doSearchByPageBrowser = () => {}

export const doSearchByPage = async <Type>(configuration: SearchConfiguration<Type>):Promise<SearchResponse> => {
  const browser = await chromium.launch({
    headless: true,
  });

  const {urlPathPrefix, pageSuffix, inputOptions, applySearchOptions} = configuration;

  try {
    let page = await getSearchPage(browser, urlPathPrefix, pageSuffix);

    await applySearchOptions(page, inputOptions);
    await clickSearchButton(page);

    const resultsCount = await getResultsCount(page);
    const pageCount = await getPageCount(page);
    const dataRows  = await getAllPagesData(page, pageCount);
    const headerRow = await getHeaderRow(page);

    const data = buildObjects(dataRows, headerRow);

    const response: SearchResponse = {
      status:  resultsCount > data.length ? 'Partial' : 'Complete',
      message: resultsCount > data.length 
        ? `Warning, only Partial results were returned (${data.length} out of ${resultsCount}). Narrow search to obtain Complete results.` 
        : null,
      results: {
        data,
        found: resultsCount > 0 ? resultsCount : data.length,
        returned: data.length,
      }
    };

    return response;

  } catch (error) {
    const response: SearchResponse = {
      status:  'Error',
      message: error as string,
      results: {
        data: [],
        found: 0,
        returned: 0,
      }
    };

    // console.log({error});

    return response;
  } finally {
    await browser.close();
  }
}

const getResultsCount = async (page: Page): Promise<number>  => {
  const popupSelector = `#ctl00_GridContent_popupCantContinueDialog_PW-1`;
  // console.log('Wait started')
  // await page.waitForSelector(popupSelector);
  await page.waitForLoadState('networkidle');

  // console.log('Wait done')
  const isTooMany = await page.locator(popupSelector).isVisible();

  let count: number = -1;
  if (isTooMany) {
    const selector = `#ctl00_GridContent_popupCantContinueDialog_msgDiv > b >> nth=0`;
    const countText = await page.locator(selector).innerText();
    count = parseInt(countText);
  }

  return count;
}
