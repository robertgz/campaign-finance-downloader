import { Page } from "playwright";

export const clickSearchButton = async (page: Page): Promise<void> => {
  const dataRowsSelector = `#ctl00_GridContent_gridFilers_DXDataRow0`;
  const popupSelector = `#ctl00_GridContent_popupCantContinueDialog_PW-1 #ctl00_GridContent_popupCantContinueDialog_msgDiv`;

  // console.log({'page.url': page.url()});
  const [response] = await Promise.all([
    page.waitForSelector(`${dataRowsSelector}, ${popupSelector}`),
    page.locator(`#PageUpdateLoadingPanel`).isHidden(),
    // page.waitForLoadState('networkidle'),

    // This action triggers the request
    page.locator('#ctl00_DefaultContent_ASPxRoundPanel1_btnFindFilers').click()
  ]);
}
