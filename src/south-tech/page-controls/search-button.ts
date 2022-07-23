import { Page } from "playwright";

export const clickSearchButton = async (page: Page): Promise<void> => {
  const dataRowsSelector = `#ctl00_GridContent_gridFilers_DXDataRow0`;
  const popupSelector = `#ctl00_GridContent_popupCantContinueDialog_PW-1 #ctl00_GridContent_popupCantContinueDialog_msgDiv`;

  await page.locator('#ctl00_DefaultContent_ASPxRoundPanel1_btnFindFilers').click();
  await page.waitForSelector(`${dataRowsSelector}, ${popupSelector}`);
}
