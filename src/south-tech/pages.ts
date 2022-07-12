import { Page, Browser } from 'playwright';

export const getWelcomePage = async (browser: Browser, pathSegment: string): Promise<Page> => {
  const pageURL = 
    `https://www.southtechhosting.com/${pathSegment}/CampaignDocsWebRetrieval/`;
  
  const page: Page = await browser.newPage();
  await page.goto(pageURL);

  return page;
}

// SearchByElection Only shows the first 400 results.
export const getSearchElectionPage = async (browser: Browser, pathSegment: string): Promise<Page> => {
  const pageURL = 
    `https://www.southtechhosting.com/${pathSegment}/CampaignDocsWebRetrieval/Search/SearchByElection.aspx`;
  
  const page: Page = await browser.newPage();
  await page.goto(pageURL);

  return page;
}

export const getSearchFilersNamePage = async (browser: Browser, pathSegment: string): Promise<Page> => {
  const pageURL = 
    `https://www.southtechhosting.com/${pathSegment}/CampaignDocsWebRetrieval/Search/SearchByFilerName.aspx`;

  const page: Page = await browser.newPage();
  await page.goto(pageURL);

  return page;
}
