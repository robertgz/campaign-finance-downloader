
import { Page } from "playwright";

export const setInputText = async (page: Page, inputText: string): Promise<void> => {
  const inputSelector = '#ctl00_DefaultContent_ASPxRoundPanel1_txtFilerName_I';
  await page.fill(inputSelector, inputText);
}
