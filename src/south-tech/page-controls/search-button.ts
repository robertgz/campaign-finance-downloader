import { Page, Response } from "playwright";

const SearchButtonSelector = '#ctl00_DefaultContent_ASPxRoundPanel1_btnFindFilers';

export const clickSearchButton = async (page: Page): Promise<Response> => {
  let requestMade = false;
  page.once('request', () => {console.log('1. Page request!'); requestMade = true;});
  // page.once('response', (res) => console.log('2. Page response!', !requestMade ? res : ''));
  page.once('response', (res) => console.log('2. Page response!', requestMade));
  page.once('requestfinished', () => console.log('3. Page requestfinished!'));

  /* Error sequence
    clickSearchButton started
    2. Page response!
    3. Page requestfinished!
    1. Page request!
    clickSearchButton done
  */

  console.log('clickSearchButton started');

  // should there be a check for SearchButton exists
  console.log({ isVisible: await page.locator(SearchButtonSelector).isVisible()});

  if (!(await doesSearchButtonExists(page))) {
    console.log('doesSearchButtonExists false');
    throw new Error(`Failed to find SearchButton`);
  };

  const [response] = await Promise.all([
      page.waitForResponse(url => url.url().includes('CampaignDocsWebRetrieval/Search/')),
      
      page.locator(SearchButtonSelector).click(),
      // page.waitForLoadState('networkidle'),
      // page.waitForLoadState('load'),
    ]);

  console.log('clickSearchButton done');

  // response is sometimes incomplete and does not included the found results in the table. 
  return response;
}

const doesSearchButtonExists = async (page: Page):Promise<boolean>  => {
  const locator = await page.locator(SearchButtonSelector);

  if (await locator.count() > 0) {
    return true
  }

  return false;
}
