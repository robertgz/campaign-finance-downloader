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

export const doSearchByPage = async <Type>(configuration: SearchConfiguration<Type>) => {
  const browser = await chromium.launch({
    headless: true,
  });

  const {urlPathPrefix, pageSuffix, inputOptions, applySearchOptions } = configuration;

  try {
    let page = await getSearchPage(browser, urlPathPrefix, pageSuffix);

    await applySearchOptions(page, inputOptions);
    await clickSearchButton(page);

    const pageCount = await getPageCount(page);
    const dataRows  = await getAllPagesData(page, pageCount);
    const headerRow = await getHeaderRow(page);

    return buildObjects(dataRows, headerRow);

  } catch (error) {
    console.log(error);

    return [];
  } finally {
    await browser.close();
  }
}
