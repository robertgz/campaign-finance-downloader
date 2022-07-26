import { Page } from "playwright";
import { InputItemDatePicker } from "../constants/option-selectors.js";

export interface DatePickerElement {
  name: string
  itemID: string
}

export interface DatePickerElementsType {
  fromDate: DatePickerElement
  toDate: DatePickerElement
}

export const DatePickerElements: DatePickerElementsType = {
  fromDate: {
    name: 'fromDate',
    itemID: '#ctl00_DefaultContent_ASPxRoundPanel1_Cal_FormDate_From_I',
  },
  toDate: {
    name: 'toDate',
    itemID: '#ctl00_DefaultContent_ASPxRoundPanel1_Cal_FormDate_To_I',
  },
}

export const setDatePickerOption = async (page: Page, item: DatePickerElement, date: string) => {
  const dateSelector = `${item.itemID}`;

  await page.fill(dateSelector, date);
}

export const setDatePickerOption2 = async (page: Page, item: InputItemDatePicker, date: string) => {
  const dateSelector = `${item.inputSelector}`;

  await page.fill(dateSelector, date);
}
