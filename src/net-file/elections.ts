import puppeteer from 'puppeteer';
import { getNetFilePage, getBranchText, getLiHandles, getElectionsRoot } from './shared-puppeteer.js';

/**
 * aid - Example: "CSD"
 * return - Example: ["11/03/2020 General Election", "03/03/2020 Primary Election"]
 */
export const getElectionTitles = async function electionTitles(aid: string): Promise<string[]> {
  let titles: string[] = [];
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

  try {
    const page = await getNetFilePage(aid, browser);

    const rootHandle = await getElectionsRoot(aid, page);

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
