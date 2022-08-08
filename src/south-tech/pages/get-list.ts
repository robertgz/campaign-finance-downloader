import { BrowserContext, chromium } from "playwright";
import { gotoPage } from "./get-page.js";
import { PageSuffix, UrlPathPrefix } from "../types.js";
import { applyListOptions, createGeneralInputOptions } from "../page-utils/apply-options.js";
import { InputItemCommon, OptionTypes } from "./types-input.js";
import { getOptionAny } from "../page-utils/get-option.js";

export interface ListConfiguration extends UrlPathPrefix, PageSuffix {
  urlPathPrefix: string
  pageSuffix: string
  optionSelector: InputItemCommon
  inputOptions?: OptionTypes
}

// entry function from multiple search-by pages
export const getList = async (configuration: ListConfiguration) => {
  const browser = await chromium.launch({
    headless: true,
  });

  try {
    const context = await browser.newContext();

    const response = await getListFromContext(context, configuration);
    return response ? response : [];
  } catch (error) {
    console.log(error);

    return [];
  } finally {
    await browser.close();
  }
}

export const getListFromContext = async (context: BrowserContext, configuration: ListConfiguration) => {

  const {urlPathPrefix, pageSuffix, optionSelector, inputOptions} = configuration;

  let page = await context.newPage();
  page = await gotoPage(page, {urlPathPrefix, urlPathSuffix: pageSuffix})

  if (inputOptions) {
    const generalInputOptions = createGeneralInputOptions(inputOptions);
    await applyListOptions(page, generalInputOptions)
  }
  return await getOptionAny(page, optionSelector); //get here
}
