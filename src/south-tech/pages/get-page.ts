import { Page, Browser } from 'playwright';
import { PageSuffix, UrlPathPrefix } from '../types';

interface PageInput extends UrlPathPrefix {
  browser: Browser
  urlPathPrefix: string
  urlPathSuffix: PageSuffix['pageSuffix']
}

// export const getSearchPage = async (pageInput: PageInput): Promise<Page> => {}
export const getSearchPage = async (browser: Browser, urlPathPrefix: string, pageSuffix: string): Promise<Page> => {
  return await getPage({
    browser,
    urlPathPrefix,
    urlPathSuffix: pageSuffix,
  });
}

// Searches Only show the first 400 results.
export const getPage = async ({ urlPathPrefix, browser, urlPathSuffix }: PageInput): Promise<Page>  => {
  const pageURL = getPageUrl(urlPathPrefix);
  const page = await browser.newPage();
  await page.goto(`${pageURL}/${urlPathSuffix}`);

  return page;
} 

const getPageUrl = (urlPathPrefix: string): string => {
  let urlPathPrefixNoSlashes = trimSlashes(urlPathPrefix);

  return `https://${urlPathPrefixNoSlashes}/CampaignDocsWebRetrieval`;
}

const trimSlashes = (path: string): string => {
  const start = path.startsWith('/') ? 1 : 0;
  const end = path.endsWith('/') ? -1 : path.length;
  return path.slice(start, end);
}
