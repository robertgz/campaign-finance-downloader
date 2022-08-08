import { Page } from "playwright";
import { InputItemDatePicker } from "../pages/types-input";

export const validateDate = (item: InputItemDatePicker, date: string): void => {
  const isValid = !isNaN(Date.parse(date));

  if (!isValid) throw `Invalid  ${item.name} provided: ${date}`;
}

export const setDatePickerOption = async (page: Page, item: InputItemDatePicker, date: string) => {
  const dateSelector = `${item.inputSelector}`;

  await page.fill(dateSelector, date);
}
