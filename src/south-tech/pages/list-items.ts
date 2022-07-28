import { BrowserContext, chromium } from "playwright";
import { getOptionList } from "../page-controls/option-list.js";
import { gotoPage } from "./get-page.js";
import { PageSuffix, UrlPathPrefix } from "../types.js";
import { applyListOptions, createGeneralInputOptions } from "../page-controls/apply-options.js";
import { InputItemSingleColumn } from "../constants/option-selectors.js";

export interface ListConfiguration<Type> extends UrlPathPrefix, PageSuffix {
  urlPathPrefix: string
  pageSuffix: string
  optionSelector: InputItemSingleColumn
  inputOptions?: Type
}

export const getList = async <Type>(configuration: ListConfiguration<Type>) => {
  const browser = await chromium.launch({
    headless: true,
  });

  try {
    const context = await browser.newContext();

    return await getListFromContext(context, configuration);
  } catch (error) {
    console.log(error);

    return [];
  } finally {
    await browser.close();
  }
}

export const getListFromContext = async <Type>(context: BrowserContext, configuration: ListConfiguration<Type>) => {

  const {urlPathPrefix, pageSuffix, optionSelector, inputOptions} = configuration;

  let page = await context.newPage();
  page = await gotoPage(page, {urlPathPrefix, urlPathSuffix: pageSuffix})

  if (inputOptions) {
    const generalInputOptions = createGeneralInputOptions(inputOptions);
    await applyListOptions(page, generalInputOptions)
  }
  return await getOptionList(page, optionSelector);
}
