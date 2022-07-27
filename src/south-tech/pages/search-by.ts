import { BrowserContext, chromium, Page } from "playwright"
import { PageSuffix, UrlPathPrefix } from "../types.js"
import { getAllPagesData, getHeaderRow } from "../table/results-table"
import { buildObjects } from "../page-utils/map-utils"
import { getPageCount } from "../table/page-count"
import { clickSearchButton } from "../page-controls/search-button"
import { getSearchPage, gotoPage } from "./get-page.js"
import { SearchResponse } from "../search-by/output-types.js"
import { applyListOptions, createGeneralInputOptions } from "../page-controls/apply-options.js"

interface SearchConfiguration<Type> extends UrlPathPrefix, PageSuffix {
  urlPathPrefix: string
  pageSuffix: string
  inputOptions: Type
}


interface SearchConfigurationItem<Type> extends PageSuffix {
  pageSuffix: string
  inputOptions: Type
}

interface searches {
  searchConfigurationItems: SearchConfigurationItem<any>[];
}
// maybe consolidate all of the configuration functions and pass in an object where get keys is used to determine which options to set
// each page will have a generate configuration object function to enforce the correct object shape
// the object will replace the setOptions function

const doSearchByPageBrowser = async <Type>(configuration: SearchConfiguration<Type>, fallBackOptions: any) => {
  const browser = await chromium.launch({
    headless: true,
  });
  
  try {
    const context = await browser.newContext();
    await doSearchFromContext(context, configuration);

    // if  Partial results are found and fallback (default=false) is true then check fallBackOptions for value to loop over in fallback
    // fallBackOptions should indicate if each jurisdiction should be searched one at a time
    
  } catch (error) {

  } finally {
    await browser.close();
  }
}

const doSearchFromContext = async <Type>(context: BrowserContext, configuration: SearchConfiguration<Type>) => {
  const {urlPathPrefix, pageSuffix, inputOptions} = configuration;

  let page = await context.newPage();
  page = await gotoPage(page, {urlPathPrefix, urlPathSuffix: pageSuffix})

  return await doSearchFromPage(page, inputOptions);
}

const doSearchFromPage = async (page: Page, inputOptions: any) => {

  if (inputOptions) {
    const generalInputOptions = createGeneralInputOptions(inputOptions);
    await applyListOptions(page, generalInputOptions);
  }

  await clickSearchButton(page);

  const resultsCount = await getResultsCount(page);
  const pageCount = await getPageCount(page);
  const dataRows  = await getAllPagesData(page, pageCount);
  const headerRow = await getHeaderRow(page);

  const data = buildObjects(dataRows, headerRow);

  return { data, resultsCount };
}


export const doSearchByPage = async <Type>(configuration: SearchConfiguration<Type>):Promise<SearchResponse> => {
  const browser = await chromium.launch({
    headless: true,
  });

  const {urlPathPrefix, pageSuffix, inputOptions} = configuration;

  try {
    let page = await getSearchPage(browser, urlPathPrefix, pageSuffix);

    if (inputOptions) {
      const generalInputOptions = createGeneralInputOptions(inputOptions);
      await applyListOptions(page, generalInputOptions)
    }

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
