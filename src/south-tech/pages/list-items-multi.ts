
import { chromium } from "playwright";
import { getMultiItemList } from "../page-controls/option-list-multi-column.js";
import { getSearchPage } from "./get-page.js";
import { PageSuffix, UrlPathPrefix } from "../types.js";
import { applyListOptions, createGeneralInputOptions } from "../page-controls/apply-options.js";
import { InputItemMultiColumn } from "../constants/option-selectors.js";

export interface MultiListConfiguration<Type> extends UrlPathPrefix, PageSuffix {
  urlPathPrefix: string
  pageSuffix: string
  optionSelector: InputItemMultiColumn
  inputOptions?: Type
}

export const getMultiColumnList = async <Type, O>(configuration: MultiListConfiguration<Type>): Promise<O[]> => {
  const browser = await chromium.launch({
    headless: true,
  });

  const {urlPathPrefix, pageSuffix, optionSelector, inputOptions} = configuration;

  try {
    let page = await getSearchPage(browser, urlPathPrefix, pageSuffix);

    if (inputOptions) {
      const generalInputOptions = createGeneralInputOptions(inputOptions);
      await applyListOptions(page, generalInputOptions)
    }

    const listItems = await getMultiItemList<O>(page, optionSelector);

    return listItems;
  } catch (error) {
    console.log(error);

    return [];
  } finally {
    await browser.close();
  }
}
