import { Page, Response } from "playwright";

export const clickSearchButton = async (page: Page): Promise<Response> => {
  // console.log('clickSearchButton started');

  const [response] = await Promise.all([
      page.waitForResponse(url => url.url().includes('CampaignDocsWebRetrieval/Search/')),
      
      // This action triggers the request
      page.locator('#ctl00_DefaultContent_ASPxRoundPanel1_btnFindFilers').click(),
    ]);
  
  // await page.locator('#ctl00_DefaultContent_ASPxRoundPanel1_btnFindFilers').click();
  // const response = await page.waitForResponse(url => url.url().includes('CampaignDocsWebRetrieval/Search/'));

  // console.log('clickSearchButton done');

  return response;
}
