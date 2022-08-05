import { Page, Browser, BrowserContext } from 'playwright';
import { PageSuffix, UrlPathPrefix, UrlPrefixType } from '../types';

interface PageInput {
  browser: Browser
  urlPathPrefix: UrlPrefixType
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

interface UrlInput {
  urlPathPrefix: UrlPrefixType
  urlPathSuffix: PageSuffix['pageSuffix']
}

export const gotoPage = async (page: Page, { urlPathPrefix, urlPathSuffix }: UrlInput): Promise<Page> => {
  const pageURL = getPageUrl(urlPathPrefix);
  await page.goto(`${pageURL}/${urlPathSuffix}`);

  return page;
}

export const getPageFromContext = async (context: BrowserContext, { urlPathPrefix, urlPathSuffix }: UrlInput): Promise<Page> => {
  const page = await context.newPage();
  const pageURL = getPageUrl(urlPathPrefix);

  await page.goto(`${pageURL}/${urlPathSuffix}`);

  return page;
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
