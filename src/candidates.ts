const puppeteer = require('puppeteer');
import { Browser, ElementHandle, ErrorCode, Page } from "puppeteer";
import { getNetFilePage, getBranchText, getLiHandles, getElectionsRoot } from './shared-puppeteer';

interface ListItem {
  name: string;
  elements?: ListItem[];
}

interface Tree {
  cycle: string;
  electionItems: ListItem[];
}

async function expandNode(page: Page, handle: any) {

  let returnList: ListItem[] = [];
  
  const listLIHandles = await getLiHandles(handle);

  for (const liHandle of listLIHandles) {
    
    const branchText = await getBranchText(liHandle);

    const plusHandle = await liHandle.$(`:scope > div > span.rtPlus`);

    if (!plusHandle) {
      returnList.push({ name: branchText });
      continue;
    }

    await plusHandle.evaluate((element: any) => element.click());

    // Skip if the child Ul element has not been added.
    try {
      await page.waitForFunction(
        (element: any) => element.querySelector(':scope > ul.rtUL') !== null, 
        { polling: 1000, timeout: 10000 },
        liHandle
      );
    } catch (e) {
      // console.error(e.message);
      // console.error(`Skipping: ${branchText}`);
      continue;
    }

    const UlHandle =  await liHandle.$(`:scope > ul.rtUL`)
    
    returnList.push({
      name: branchText,
      elements: await expandNode(page, UlHandle)
    })

  }

  return returnList;
}

async function getElectionCycleLiHandle(parentHandle: ElementHandle, electionCycleTitle: string) {
  // listLIHandles will be all of the child li node elements of parentHandle
  let listLIHandles = await getLiHandles(parentHandle);
 
  // Find the liHandle within listLIHandles that has text that matches electionCycleTitle
  for (const liHandle of  listLIHandles) {
    let branchText = await getBranchText(liHandle);

    if (branchText === electionCycleTitle) {
      return liHandle;
    }
  }

  throw new Error(`Cycle title '${electionCycleTitle}' not found.`);
}

async function getElectionCycleUlHandle(page: Page, branchHandle: ElementHandle, electionCycleTitle: string): Promise<ElementHandle<Element>> {
 
  let cycleLIHandle = await getElectionCycleLiHandle(branchHandle, electionCycleTitle);

  let plusHandle = await cycleLIHandle.$(`:scope > div > span.rtPlus`);

  if (!plusHandle) throw new Error(`Not able to expand Cycle '${electionCycleTitle}.'`);
  
  // Clicking on the plusHandle element causes the page to make a network request and add a child ul element.
  await plusHandle.evaluate((element: any) => element.click());

  // Do not continue if the child Ul element has not been added.
  try {
    await page.waitForFunction(
      (element: any) => element.querySelector(':scope > ul.rtUL') !== null,
      { polling: 1000, timeout: 10000 },
      cycleLIHandle
    );    
  } catch (e) {
    throw new Error(`Not able to use: ${electionCycleTitle}`);
  }

  const handle = await cycleLIHandle.$(`:scope > ul.rtUL`);
  if (!handle) throw new Error(`Handle not found.`);

  return handle;
}

/**
 * aid - Example: "CSD"
 * electionCycleTitle - Example: "11/03/2020 General Election" | ["11/03/2020 General Election", "03/03/2020 Primary Election"]
 */
export const getCandidates = async function getMultipleElectionCycleCandidates(aid: string, titles: string | string[]): Promise<Tree[]> {
  titles = Array.isArray(titles) ? titles : [ titles ];

  let forest: Tree[] = [];

  for await (const title of titles) {
    const tree = await getElectionCycleCandidates(aid, title);
    forest.push(tree);
  }

  return forest;
}

async function getElectionCycleCandidates(aid: string, electionCycleTitle: string = ''): Promise<Tree> {
  let tree: Tree = {} as Tree;
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

  try {
    const page = await getNetFilePage(aid, browser)

    let rootHandle = await getElectionsRoot(aid, page);
    
    if (electionCycleTitle !== '') {
      rootHandle = await getElectionCycleUlHandle(page, rootHandle, electionCycleTitle);
    }

    tree.cycle = electionCycleTitle
    tree.electionItems = await expandNode(page, rootHandle);
  } catch (error) {
    console.error(error);
  } finally {
    await browser.close();
    return tree;
  }
}


interface Candidate {
  candidateName: string;
  officeName: string;
  electionTitle: string;
} 


export const flattenCandidateTree = function transformCandidateElectionData(electionData: Tree | Tree[]): Candidate[] {
  electionData = Array.isArray(electionData) ? electionData : [ electionData ];

  let candidateData: Candidate[] = [];

  electionData.forEach(election => {
    // const offices = election.electionItems.find(item => item.name === "Candidates").elements;
    // ANA candidates for: 11/08/2022 General Election
    // (node:2128) UnhandledPromiseRejectionWarning: TypeError: Cannot read property 'find' of undefined
    // at C:\Users\user\Documents\dev\GitHub\OpenSanDiego\sdvv-backend\app\scripts\node\cli\candidates.menu\candidates.menu.data.js:26:44

    const candidateItems = election.electionItems.find(item => item.name === "Candidates");
    const offices = candidateItems?.elements ? candidateItems.elements : [];

    offices.forEach(office => {
      
      if (!office.elements) { return; }

      office.elements.forEach(candidate => {

        candidateData.push({
          candidateName: candidate.name,
          officeName: office.name,
          electionTitle: election.cycle,
        });

      });

    });

  });
  
  return candidateData;
}
