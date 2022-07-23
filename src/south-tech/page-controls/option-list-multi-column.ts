
import { Page } from "playwright";
import { areStringsEqual, buildObjects } from "../page-utils/map-utils";

export interface OptionItemMultiColumn {
  name: string
  dataRowSelector: string
  headerRowSelector: string
  dropDownSelector: string
}

export const BallotList: OptionItemMultiColumn = {
  name: 'ballotList',
  dataRowSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_BallotItems_DDD_L_LBT',
  headerRowSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_BallotItems_DDD_L_H',
  dropDownSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_BallotItems_B-1',
}

export const getMultiItemList = async (page: Page, optionItem: OptionItemMultiColumn): Promise<any[]>  => {
  const rows = await getItemRows(page, optionItem.dataRowSelector);
  const headerRow = await getHeaderRow(page, optionItem.headerRowSelector);

  return buildObjects(rows, headerRow);
}

const getHeaderRow = async (page: Page, selectorID: string): Promise<string[]> => {

  const rowSelector = `${selectorID} table > tbody > tr > td`;
  const rowLocator = await page.locator(rowSelector);

  return await rowLocator.allInnerTexts();
}

const getItemRows = async (page: Page, selectorID: string)  => {
  const rowSelector = `${selectorID} > tbody  > tr.dxeListBoxItemRow_Glass > td`;
  const rowLocator = await page.locator(rowSelector);

  const texts = await rowLocator.allInnerTexts();
  
  return normalizeItemsList(texts);
}

const normalizeItemsList = (list: string[]) => {
  const responseList = [];

  let items = list.map((item) => item.trim());

  const size = 3;
  for (let i = 0; i < items.length; i += size) {
    const piece = items.slice(i, i + size);
    responseList.push(piece);
  }

  return responseList;
}

export const validateMultiColumnOption = async (page: Page, optionItem: OptionItemMultiColumn, input: string): Promise<void> => {
  const items = await getItemRows(page, optionItem.dataRowSelector);
  const isValid = items
    .some((item) => areStringsEqual(item[0], input));

  if (!isValid) throw `Invalid ${optionItem.name} provided: ${input}`;
}

export const setMultiColumnOption = async (page: Page, optionItem: OptionItemMultiColumn, input: string): Promise<void> => {
  await page.locator(`${optionItem.dropDownSelector}`).click();
  await page.locator(`${optionItem.dataRowSelector} > tbody > tr > td:has-text("${input}")`).click();

  await page.waitForLoadState('networkidle');
}
