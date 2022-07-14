import { Page, Browser } from 'playwright';

interface PageInput {
  browser: Browser
  urlPathPrefix: string
  urlPathSuffix: string
}

// urlPathPrefix examples: www.southtechhosting.com/SanDiegoCounty, campaigndocs.co.fresno.ca.us, efiler.stancounty.com, 

export const getWelcomePage = async (browser: Browser, urlPathPrefix: string): Promise<Page> => {
  return await getPage({
    browser,
    urlPathPrefix,
    urlPathSuffix: ''
  });
}

export const getSearchFilersNamePage = async (browser: Browser, urlPathPrefix: string): Promise<Page> => {
  return await getPage({
    browser,
    urlPathPrefix,
    urlPathSuffix: 'Search/SearchByFilerName.aspx'
  });
}

// SearchByElection Only shows the first 400 results.
export const getSearchElectionPage1 = async (browser: Browser, urlPathPrefix: string): Promise<Page> => {
  const pageURL = getPageUrl(urlPathPrefix);
  
  const page: Page = await browser.newPage();
  await page.goto(`${pageURL}/Search/SearchByElection.aspx`);

  return page;
}

export const getSearchElectionPage = async (browser: Browser, urlPathPrefix: string): Promise<Page> => {
  return await getPage({
    browser,
    urlPathPrefix,
    urlPathSuffix: 'Search/SearchByElection.aspx'
  });
}


const getPageUrl = (urlPathPrefix: string): string => {
  let urlPathPrefixNoSlashes = trimSlashes(urlPathPrefix);

  return `https://${urlPathPrefixNoSlashes}/CampaignDocsWebRetrieval`;
}

const getPage = async ({ urlPathPrefix, browser, urlPathSuffix }: PageInput): Promise<Page>  => {
  const pageURL = getPageUrl(urlPathPrefix);
  const page = await browser.newPage();
  await page.goto(`${pageURL}/${urlPathSuffix}`);

  return page;
} 

const trimSlashes = (path: string): string => {
  const start = path.startsWith('/') ? 1 : 0;
  const end = path.endsWith('/') ? -1 : path.length;
  return path.slice(start, end);
}
