import { chromium, Page } from "playwright";
import { OptionItem } from "../page-controls/types.js";
import { getOptionList } from "../page-controls/option-list.js";
import { getSearchPage } from "./get-page.js";
import { PageSuffix, UrlPathPrefix } from "../types.js";
import { applyListOptions2, createGeneralInputOptions } from "../page-controls/apply-options.js";

export interface ListConfiguration<Type> extends UrlPathPrefix, PageSuffix {
  urlPathPrefix: string
  pageSuffix: string
  optionSelector: OptionItem
  inputOptions?: Type
  applyListOptions?: (page: Page, options: Type) => Promise<void>
}

export const getList = async <Type>(configuration: ListConfiguration<Type>) => {
  const browser = await chromium.launch({
    headless: true,
  });

  const {urlPathPrefix, pageSuffix, optionSelector, inputOptions, applyListOptions} = configuration;

  try {
    let page = await getSearchPage(browser, urlPathPrefix, pageSuffix);

    // if (inputOptions && applyListOptions) {
    //   await applyListOptions(page, inputOptions);
    // }

    if (inputOptions) {
      const generalInputOptions = createGeneralInputOptions(inputOptions);
      await applyListOptions2(page, generalInputOptions)
    }

    const listItems = await getOptionList(page, optionSelector);

    return listItems;
  } catch (error) {
    console.log(error);

    return [];
  } finally {
    await browser.close();
  }
}
