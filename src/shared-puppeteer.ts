
import { Browser, ElementHandle, Page } from "puppeteer";
const { getNetFileURL } = require('./shared');

export const getLiHandles = async (handle: ElementHandle<Element>, selector = ':scope '): Promise<ElementHandle<Element>[]> => {
  return await Promise.all( await handle.$$(`${selector} > li`) );
}

export async function getNetFilePage(aid: string, browser: Browser): Promise<Page> {
  const page = await browser.newPage();

  await page.goto(getNetFileURL(aid), {
    waitUntil: "networkidle2"
  });

  return page;
}

export const getBranchText = async (handle: ElementHandle<Element>): Promise<string> => {
  if (!handle) return '';

  const elementHandle = await handle.$(`:scope > div > .rtIn`);
  if (!elementHandle) return '';

  return await (await (elementHandle).getProperty('innerText')).jsonValue();  
}
