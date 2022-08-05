import { BrowserContext, chromium, Locator, Page, Response } from "playwright"
import { PageSuffix, UrlPathPrefix } from "../types.js"
import { getAllPagesData, getHeaderRow } from "../table/results-table"
import { buildObjects } from "../page-utils/map-utils"
import { getPageCount } from "../table/page-count"
import { clickSearchButton } from "../page-controls/search-button"
import { getSearchPage, gotoPage } from "./get-page.js"
import { SearchResponse } from "../search-by/output-types.js"
import { applyListOptions, createGeneralInputOptions,  } from "../page-utils/apply-options.js"
import { getListFromContext } from "./get-list.js"
import {
  getOptionItem,
  InputItemMultiColumn,
  InputItemSingleColumn,
  OptionItemsCollection,
  OptionTypes,
} from "../constants/option-selectors.js";

interface SearchConfiguration<Type> extends UrlPathPrefix, PageSuffix {
  urlPathPrefix: string
  pageSuffix: string
  inputOptions: Type
  fallBackOptions?: {
    // itemToGetAll: Pick<OptionTypes, "electionDate" | "jurisdiction" | "district" | "form">;
    itemToGetAll: keyof Pick<OptionTypes, "electionDate" | "jurisdiction" | "district" | "form" | "ballotItem">;
  }
}

const doSearchByPageBrowser = async <Type>(configuration: SearchConfiguration<Type>) => {
  const browser = await chromium.launch({
    headless: false,
  });

  console.log('doSearchByPageBrowser')

  
  try {
    const context = await browser.newContext();
  console.log('doSearchByPageBrowser -> doSearchFromContext')

    const { data, resultsCount } = await doSearchFromContext(context, configuration);

    const partialResultsFound = resultsCount > data.length;

    // console.log({ resultsCount })
    // console.log({ "data.length": data.length })
    console.log({ partialResultsFound })
    // console.log({ status: configuration.fallBackOptions?.itemToGetAll })

    // if (partialResultsFound && configuration.fallBackOptions?.itemToGetAll) {
    //   const {urlPathPrefix, pageSuffix, inputOptions} = configuration;
    //   const item = configuration.fallBackOptions.itemToGetAll;
    //   // const optionSelector = getOptionItem(item) as InputItemSingleColumn;
    //   const optionSelector = getOptionItem(item) as InputItemMultiColumn;


    //   const listContext = await browser.newContext();
    //   // const list = await getListFromContext(listContext, {urlPathPrefix, pageSuffix, optionSelector, inputOptions})
    //   const list = await getMultiColumnList({urlPathPrefix, pageSuffix, optionSelector, inputOptions})
    // ** TODO: getMultiColumnList needs an option to choose a single column of data OR getListFromContext needs to handle both single an multi-column lists and determine which type from the data object passed in. ** 
    //   console.log({ list })
    // }

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

    console.log({error});

    return response;
  } finally {
    // await browser.close();
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

  console.log('doSearchFromPage => clickSearchButton');

  const response = await clickSearchButton(page);

 // to get count combine with getResultsCount: look for pager and use it if found ELSE count the rows in the table
// if count >= 400 then use the HTML text find to total count
  // ** new page
  // const context = page.context();
  const responseText = await response.text();
  const newPage = await page.context().newPage();
  await newPage.setContent(responseText, { waitUntil: 'load' });
  // ** new page

  const count = await getDataRowCount(newPage);
  const popupMessageText = await getPopupMessageHTML(newPage);
  console.log({ text: popupMessageText })

  if (count < 1) {
    return { data: [], resultsCount: count };
  }

  // const resultsCount = await getResultsCount(page);

  const pageCount = await getPageCount(newPage);
  // const pageCount = await getPageCount(page);

  const dataRows  = await getAllPagesData(page, pageCount);
  const headerRow = await getHeaderRow(page);

  const data = buildObjects(dataRows, headerRow);

  let resultsCount = data.length; 
  if (resultsCount >= 400) {
    resultsCount = await getResultsCount(page);

  }

  return { data, resultsCount };
}


export const doSearchByPage = async <Type>(configuration: SearchConfiguration<Type>):Promise<SearchResponse> => {

  return await doSearchByPageBrowser(configuration);

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

// possible outcome of search
/**
 * page loaded, no options selected:  popupSelector exists with:
 *  style="height:150px;width:400px;cursor:default;z-index:10000;display:none;visibility:hidden;"
 * less than 10 on a single page, no total items count
 * up to 400 on multiple pages, total items count shown,
 * over 400 on multiple pages, total items count shown,
 *  style="height: 150px; width: 400px; cursor: default; z-index: 12000; visibility: visible; display: table; position: absolute; left: 595px; top: 252px;"
 */

/**
 * number of results: 0 = popup visibility: visible, row count = 0 
 * number of results: 1 - 10 = single page
 * number of results: 11 - 400 = multiple pages
 * number of results: 400+ = popup visibility: visible
 */
const getResultsCount = async (page: Page): Promise<number>  => {
  const popupSelector = `#ctl00_GridContent_popupCantContinueDialog_PW-1`;
  // console.log('Wait started')
  // await page.waitForSelector(popupSelector);
  // await page.waitForLoadState('networkidle');
// this works inconsistently, depending on if the pop up never shows 
  // console.log('Wait done')
  console.log('getResultsCount')
  const isTooMany = await page.locator(popupSelector).isVisible();
  console.log({isTooMany})

  let count: number = -1;
  if (isTooMany) {
    const selector = `#ctl00_GridContent_popupCantContinueDialog_msgDiv > b >> nth=0`;
    const countText = await page.locator(selector).innerText();
    count = parseInt(countText);
  }

  return count;
}

export const getPopupMessageHTML = async (page: Page): Promise<string>  => {
  const messageSelector = `#ctl00_GridContent_popupCantContinueDialog_msgDiv`;
  const locator = await page.locator(messageSelector);

  let text = '';
  if (await locator.count() > 0) {
    text = await locator.innerHTML();
  }

  return text;
}

// Gets the count of rows on only a single page of results.
export const getDataRowCount = async (page: Page) => {
  const selector = '#ctl00_GridContent_gridFilers_DXMainTable > tbody  > tr.dxgvDataRow_Glass';
  const locator = await page.locator(selector);

  const count = (await locator.count()); 

  return count;
}
