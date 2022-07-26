import { Page } from "playwright";
import { InputItemCheckbox } from "south-tech/constants/option-selectors.js";

export const setAllowPartialMatch = async (page: Page, allowPartialMatch: boolean): Promise<void> => {
  const checkBoxSelector = '#ctl00_DefaultContent_ASPxRoundPanel1_chbAllowPartialMatch_S_D';
  const checkBoxLocator = await page.locator(checkBoxSelector);
  const classes = await checkBoxLocator.getAttribute('class')
  const isChecked = classes?.includes('BoxChecked');

  if (allowPartialMatch !== isChecked) {
    await checkBoxLocator.click();
  }
}

export const setAllowPartialMatch2 = async (page: Page, optionItem: InputItemCheckbox, allowPartialMatch: string): Promise<void> => {
  const validValues = ['TRUE', 'FALSE'];
  if (!validValues.includes(allowPartialMatch.toLocaleUpperCase())) return;

  const setValue = allowPartialMatch.toLocaleUpperCase() === 'TRUE';

  const checkBoxLocator = await page.locator(optionItem.inputSelector);
  const classes = await checkBoxLocator.getAttribute('class')
  const isChecked = classes?.includes('BoxChecked');

  if (setValue !== isChecked) {
    await checkBoxLocator.click();
  }
}
