
import { Page } from "playwright";
import { InputItemText } from "../pages/types-input";

export const setInputText = async (page: Page, optionItem: InputItemText, inputText: string): Promise<void> => {
  await page.fill(optionItem.inputSelector, inputText);
}
