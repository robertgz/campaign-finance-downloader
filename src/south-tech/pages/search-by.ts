import { Browser, BrowserContext, chromium, Locator, Page, Response } from "playwright"
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
import { getPopupMessageHTML } from "../page-utils/popup-message.js"
import { getResultsCount } from "../table/item-count.js"

interface SearchConfiguration<Type> extends UrlPathPrefix, PageSuffix {
  urlPathPrefix: string
  pageSuffix: string
  inputOptions: Type
  fallBackOptions?: {
    // itemToGetAll: Pick<OptionTypes, "electionDate" | "jurisdiction" | "district" | "form">;
    itemToGetAll: keyof Pick<OptionTypes, "electionDate" | "jurisdiction" | "district" | "form" | "ballotItem">;
  }
}

export const doSearchByPage = async <Type>(configuration: SearchConfiguration<Type>): Promise<SearchResponse>  => {
  const browser = await chromium.launch({
    headless: false,
  });

  // console.log('doSearchByPageBrowser')

  try {
    const context = await browser.newContext();
  // console.log('doSearchByPageBrowser -> doSearchFromContext')

    const { data, resultsCount } = await doSearchFromContext(context, configuration);
    await context.close();

    const partialResultsFound = resultsCount > data.length; // resultsCount should be determined before running: doSearchFromContext!

    // console.log({ resultsCount })
    // console.log({ "data.length": data.length })
    console.log({ partialResultsFound })
    // console.log({ status: configuration.fallBackOptions?.itemToGetAll })

    if (partialResultsFound) {
      // const { data, resultsCount } = 
      await searchMultiple(browser, configuration);
    }

    const response: SearchResponse = {
      status:  resultsCount > data.length ? 'Partial' : 'Complete',
      message: resultsCount > data.length 
        ? `Warning, only Partial results were returned (${data.length} out of ${resultsCount}). Narrow search to obtain Complete results.` 
        : null,
      results: {
        data,
        // found: resultsCount > 0 ? resultsCount : data.length,
        found: resultsCount,
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
    await browser.close();
  }
}

const searchMultiple = async <Type>(browser: Browser, configuration: SearchConfiguration<Type>) => {

  if (!configuration.fallBackOptions?.itemToGetAll) {
    return { data: [], resultsCount: 0 };
  }

  if (configuration.fallBackOptions?.itemToGetAll) {
    const item = configuration.fallBackOptions.itemToGetAll;
    const {urlPathPrefix, pageSuffix, inputOptions} = configuration;

  }

  //   // const optionSelector = getOptionItem(item) as InputItemSingleColumn;
  //   const optionSelector = getOptionItem(item) as InputItemMultiColumn;

  //   const listContext = await browser.newContext();
  //   // const list = await getListFromContext(listContext, {urlPathPrefix, pageSuffix, optionSelector, inputOptions})
  //   const list = await getMultiColumnList({urlPathPrefix, pageSuffix, optionSelector, inputOptions})
  // ** TODO: getMultiColumnList needs an option to choose a single column of data OR getListFromContext needs to handle both single an multi-column lists and determine which type from the data object passed in. ** 
  //   console.log({ list })
}


const doSearchFromContext = async <Type>(context: BrowserContext, configuration: SearchConfiguration<Type>) => {
  const {urlPathPrefix, pageSuffix, inputOptions} = configuration;

  let page = await context.newPage();
  page = await gotoPage(page, {urlPathPrefix, urlPathSuffix: pageSuffix})

  return await doSearchFromPage(page, inputOptions);
}
// await getPageFromContext(context, {urlPathPrefix, urlPathSuffix: pageSuffix});
// await runSearchOnPage(page, inputOptions);
// await getCounts(context, response); // existing
// await getDataFromPage(page, pageCount);

const runSearchOnPage = async (page: Page, inputOptions: any) => {
  if (inputOptions) {
    const generalInputOptions = createGeneralInputOptions(inputOptions);
    await applyListOptions(page, generalInputOptions);
  }

  return await clickSearchButton(page);
}

const getDataFromPage = async (page: Page, pageCount: number) => {
  const dataRows  = await getAllPagesData(page, pageCount);
  const headerRow = await getHeaderRow(page);

  return buildObjects(dataRows, headerRow);
}

const doSearchFromPage = async (page: Page, inputOptions: any) => {

  if (inputOptions) {
    const generalInputOptions = createGeneralInputOptions(inputOptions);
    await applyListOptions(page, generalInputOptions);
  }

  // console.log('doSearchFromPage => clickSearchButton');

  const response = await clickSearchButton(page);


  const context = page.context();
  const { resultsCount, pageCount } = await getCounts(context, response);
  // console.log({resultsCount});
  // console.log({pageCount});
  // separate counting results after a search click FROM retrieving the data 


  const dataRows  = await getAllPagesData(page, pageCount);
  const headerRow = await getHeaderRow(page);

  const data = buildObjects(dataRows, headerRow);

  return { data, resultsCount };
}


const getCounts = async (context: BrowserContext, response: Response) => {
  let newPage;

  // const browser = context.browser();
  // if (browser) {
  //   const newContext = browser?.newContext();
  //   const newPage2 = await (await newContext)?.newPage();
  //   newPage = newPage2;
  // } else {
    newPage = await context.newPage();
  // }

  const responseText = await response.text();

  await newPage.setContent(responseText, { waitUntil: 'load' });

  const resultsCount = await getResultsCount(newPage);
  const pageCount = await getPageCount(newPage);

  await newPage.close();

  return { resultsCount, pageCount };
}
