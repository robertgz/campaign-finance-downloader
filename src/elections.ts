const puppeteer = require('puppeteer');

import { getNetFilePage, getBranchText, getLiHandles } from './shared-puppeteer';

/**
 * aid - Example: "CSD"
 * return - Example: ["11/03/2020 General Election", "03/03/2020 Primary Election"]
 */
export const getElections = async function electionCycleTitles(aid: string): Promise<string[]> {
  let titles: string[] = [];
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

  try {
    const electionCycleRootULSelector = '#ctl00_phBody_browseElections_treeBrowse > ul';
    
    const page = await getNetFilePage(aid, browser);
    let rootHandle = await page.waitForSelector(electionCycleRootULSelector);

    if (!rootHandle) throw new Error(`Selector not found: ${electionCycleRootULSelector}`);

    let listLIHandles = await getLiHandles(rootHandle);

    for (const liHandle of  listLIHandles) {
      titles.push(await getBranchText(liHandle));
    }

  } catch(error) {
    console.error(error);
  } finally {
    await browser.close();
    return titles;
  }

}
