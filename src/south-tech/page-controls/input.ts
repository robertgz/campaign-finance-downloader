
import { Page } from "playwright";
import { InputItemText } from "south-tech/constants/option-selectors";

// export const setInputText = async (page: Page, inputText: string): Promise<void> => {
//   const inputSelector = '#ctl00_DefaultContent_ASPxRoundPanel1_txtFilerName_I';
//   await page.fill(inputSelector, inputText);
// }

export const setInputText = async (page: Page, optionItem: InputItemText, inputText: string): Promise<void> => {
  await page.fill(optionItem.inputSelector, inputText);
}
