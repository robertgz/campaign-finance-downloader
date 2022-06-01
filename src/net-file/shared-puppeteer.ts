
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

export const getElectionsRoot = async (aid: string, page: Page): Promise<ElementHandle<Element>> => {
  const electionCycleRootULSelector = '#ctl00_phBody_browseElections_treeBrowse > ul';

  let rootHandle = await page.waitForSelector(electionCycleRootULSelector);

  if (!rootHandle) throw new Error(`Selector not found: ${electionCycleRootULSelector}`);

  return rootHandle;
}

export const getYearsRoot = async (page: Page): Promise<ElementHandle<Element>> => {
  const electionCycleRootULSelector = '#ctl00_phBody_DateSelect';

  let rootHandle = await page.waitForSelector(electionCycleRootULSelector);

  if (!rootHandle) throw new Error(`Selector not found: ${electionCycleRootULSelector}`);

  return rootHandle;
}
