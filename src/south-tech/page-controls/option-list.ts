
import { Page } from "playwright";
import {  InputItemSingleColumn } from "../constants/option-selectors.js";

export const getOptionList = async (page: Page, optionItem: InputItemSingleColumn): Promise<string[]>  => {
  const selector = `${optionItem.listSelector} > tbody > tr > td`;
  const locator = await page.locator(selector);

  return await locator.allInnerTexts();
}

export const validateOption = async (page: Page, optionItem: InputItemSingleColumn, item: string): Promise<void> => {
  const items = await getOptionList(page, optionItem);
  const isValid = items.includes(item);

  if (!isValid) throw `Invalid ${optionItem.name} provided: ${item}`;
}

export const setOption = async (page: Page, optionItem: InputItemSingleColumn, type: string): Promise<void> => {
  await page.locator(optionItem.dropDownSelector).click();

  await page.locator(`${optionItem.listSelector} > tbody > tr:has-text("${type}")`).click();

  await page.waitForLoadState('networkidle');
}
