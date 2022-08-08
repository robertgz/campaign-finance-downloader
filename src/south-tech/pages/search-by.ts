import { Browser, BrowserContext, chromium, Response } from "playwright"
import { PageSuffix, UrlPathPrefix } from "../types.js"
import { getAllPagesData, getHeaderRow } from "../table/results-table"
import { buildObjects } from "../page-utils/map-utils"
import { getPageCount } from "../table/page-count"
import { clickSearchButton } from "../page-controls/search-button"
import { getPageFromContext } from "./get-page.js"
import { SearchResponse } from "./types-output.js"
import { applyListOptions, createGeneralInputOptions,  } from "../page-utils/apply-options.js"
import { getResultsCount } from "../table/item-count.js"

interface SearchConfiguration<Type> extends UrlPathPrefix, PageSuffix {
  urlPathPrefix: string
  pageSuffix: string
  inputOptions: Type
}

export const doSearchByPage = async <Type>(configuration: SearchConfiguration<Type>): Promise<SearchResponse>  => {
  const browser = await chromium.launch({
    headless: false,
  });

  try {
    const { data, resultsCount } = await doNewSearchFromBrowser(browser, configuration);

    const response: SearchResponse = {
      status:  resultsCount > data.length ? 'Partial' : 'Complete',
      message: resultsCount > data.length 
        ? `Warning, only Partial results were returned (${data.length} out of ${resultsCount}). Narrow search to obtain Complete results.` 
        : null,
      results: {
        data,
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
    // await browser.close();
  }
}

const doNewSearchFromBrowser = async <Type>(browser: Browser, configuration: SearchConfiguration<Type>) => {
  const {urlPathPrefix, pageSuffix, inputOptions} = configuration;

  const context = await browser.newContext();
  const page = await getPageFromContext(context, {urlPathPrefix, urlPathSuffix: pageSuffix});
 
  if (inputOptions) {
    const generalInputOptions = createGeneralInputOptions(inputOptions);
    await applyListOptions(page, generalInputOptions);
  }

  const response = await clickSearchButton(page);

  // const { resultsCount, pageCount } = await getCounts(context, response);
  const { resultsCount, pageCount } = await getCountsFromBrowser(browser, response);

  const dataRows  = await getAllPagesData(page, pageCount);
  const headerRow = await getHeaderRow(page);
  
  const data = buildObjects(dataRows, headerRow);

  // await page.close();
  // await context.close();

  return { data, resultsCount };
}

const getCountsFromBrowser = async (browser: Browser, response: Response) => {
  const context = await browser.newContext();

  return await getCounts(context, response);
}

// const fs = require('fs');
import * as fs from 'fs';

const getCounts = async (context: BrowserContext, response: Response) => {
  const page = await context.newPage();

  const responseText = await response.text();
  // const responseText = await response.();
  // console.log({responseText: responseText});

  await fs.writeFileSync('filename2.html', responseText)
  
  await page.setContent(responseText, { waitUntil: 'load' });

  const resultsCount = await getResultsCount(page);
  const pageCount = await getPageCount(page);

  // await page.close();

  return { resultsCount, pageCount };
}
