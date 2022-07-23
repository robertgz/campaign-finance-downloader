
import { chromium, Page } from "playwright";
import { OptionItemMultiColumn } from "../page-controls/types.js";
import { getMultiItemList } from "../page-controls/option-list-multi-column.js";
import { getSearchPage } from "./get-page.js";
import { PageSuffix, UrlPathPrefix } from "../types.js";

export interface MultiListConfiguration<Type> extends UrlPathPrefix, PageSuffix {
  urlPathPrefix: string
  pageSuffix: string
  optionSelector: OptionItemMultiColumn
  inputOptions?: Type
  applyListOptions?: (page: Page, options: Type) => Promise<void>
}

export const getMultiColumnList = async <Type>(configuration: MultiListConfiguration<Type>) => {
  const browser = await chromium.launch({
    headless: true,
  });

  const {urlPathPrefix, pageSuffix, optionSelector, inputOptions, applyListOptions} = configuration;

  try {
    let page = await getSearchPage(browser, urlPathPrefix, pageSuffix);

    if (inputOptions && applyListOptions) {
      await applyListOptions(page, inputOptions);
    }

    const listItems = await getMultiItemList(page, optionSelector);

    return listItems;
  } catch (error) {
    console.log(error);

    return [];
  } finally {
    await browser.close();
  }
}
