import { Page } from "playwright";

export const setAllowPartialMatch = async (page: Page, allowPartialMatch: boolean): Promise<void> => {
  const checkBoxSelector = '#ctl00_DefaultContent_ASPxRoundPanel1_chbAllowPartialMatch_S_D';
  const checkBoxLocator = await page.locator(checkBoxSelector);
  const classes = await checkBoxLocator.getAttribute('class')
  const isChecked = classes?.includes('BoxChecked');

  if (allowPartialMatch !== isChecked) {
    await checkBoxLocator.click();
  }
}
