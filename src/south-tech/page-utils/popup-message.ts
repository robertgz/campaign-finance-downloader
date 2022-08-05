import { Locator, Page } from "playwright";

export const getPopupMessageLocator = async (page: Page): Promise<Locator>  => {
  const messageSelector = `#ctl00_GridContent_popupCantContinueDialog_msgDiv`;
  const locator = await page.locator(messageSelector);
  return locator;
}

export const getCountFromPopupMessageLocator = async (locator: Locator): Promise<number> => {
  const countLocator = await locator.locator(`> b >> nth=0`);

  let count = 0;
  if (await countLocator.count() > 0) {
    const countText = await countLocator.innerText();
    count = parseInt(countText);
  }

  return count;
}

// deprecated
export const getPopupMessageHTML = async (page: Page): Promise<string> => {
  const messageSelector = `#ctl00_GridContent_popupCantContinueDialog_msgDiv`;
  const locator = await page.locator(messageSelector);

  let text = '';
  if (await locator.count() > 0) {
    text = await locator.innerHTML();
  }

  return text;
}
