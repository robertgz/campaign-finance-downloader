import { Page, Browser } from 'playwright';

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
