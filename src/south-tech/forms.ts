
import { readFile } from 'fs/promises';
import { Page, chromium, Locator } from 'playwright';
import { getSearchFilersNamePage } from './pages.js';

export interface Form {
  form_type: string;
  form_description: string;
  filing_date: string;
  filing_period: string;
  export?: Buffer | null;
}

export interface FormWithLocator extends Form {
  export_locator?: Locator;
}

export interface Options {
  includeTransactionExports?: boolean;
  fromFilingDate?: string;
  toFilingDate?: string;
}

export const getForms = async (pathSegment: string, filerName: string, options: Options = {}): Promise<Form[]> => {
  const includeTransactionExports = options?.includeTransactionExports;
  const getExports = includeTransactionExports ? includeTransactionExports : false;

  const browser = await chromium.launch({
    headless: true,
  });

  const page = await getSearchFilersNamePage(browser, pathSegment);
  await browseToFiledFormsPage(page, filerName);

  await page.waitForSelector('#ctl00_DefaultContent_gridFilingForms');

  const formWithLocatorRows = await getFormWithLocatorRows(page);
  const filteredRows = getFilteredByDateRows(formWithLocatorRows, options);
  const formRows = await getFormRow(getExports, filteredRows, page);

  await browser.close();
  return formRows;
}

const getFilteredByDateRows = (forms: FormWithLocator[], options: Options): FormWithLocator[] => {
  const { fromFilingDate, toFilingDate } = options;

  let filteredForms = [...forms];

  if (fromFilingDate) {
    const fromDate = new Date(fromFilingDate);
    filteredForms = filteredForms.filter(form => (new Date(form.filing_date) >= fromDate))
  }

  if (toFilingDate) {
    const toDate = new Date(toFilingDate);
    filteredForms = filteredForms.filter(form => (new Date(form.filing_date) <= toDate))
  }

  return filteredForms;
}

const getExportBuffer = async (form: FormWithLocator, page: Page): Promise<Buffer | null> => {
  const downloadLocatorLink = form.export_locator?.locator(' > a ');
  if (!downloadLocatorLink) return null;
  
  const count = await downloadLocatorLink.count();
  if (count < 1) return null;
  
  const [ download ] = await Promise.all([
    page.waitForEvent('download'),
    downloadLocatorLink.click(),
  ]);

  const path = await download.path();
 
  if (!path) return null; // Should something be returned or an error thrown?

  return await readFile(path);;
}

const getFormRow = async (getExports: boolean, formRows: FormWithLocator[], page: Page): Promise<Form[]> => {
  const newRows: Form[] = [];

  for (let j = 0; j < formRows.length; ++j) {
    const row = { ...formRows[j] };
    if (getExports) {
      row.export = await getExportBuffer(formRows[j], page);
    }
    delete row.export_locator;
    newRows.push(row);
  }

  return newRows as Form[];
}

const getFormWithLocatorRow = async (row: Locator): Promise<FormWithLocator> => {
  const getElement = async (row: Locator, index: number) => {
    const element = await row.nth(index).textContent();
    return element?.trim() ? element.trim() : '';
  }

  return {
    form_type: await getElement(row, 0),
    form_description: await getElement(row, 1),
    filing_date: await getElement(row, 2),
    filing_period: await getElement(row, 3),
    export_locator: await row.nth(5),
  }
}

const getFormWithLocatorRows = async (page: Page): Promise<FormWithLocator[]> => {
  const rowsSelector = 
    `#ctl00_DefaultContent_gridFilingForms_DXMainTable > tbody > tr.dxgvDataRow_Glass`;

  const rows: Locator = page.locator(rowsSelector);
  const rowsCount = await rows.count();

  const formRows = [];
  for (let i = 0; i < rowsCount; ++i) {
    const rowArray = await getFormWithLocatorRow(await rows.nth(i).locator('> td'));
    formRows.push(rowArray); 
  }

  return formRows;
}

const browseToFiledFormsPage = async (page: Page, filerName: string): Promise<void> => {
  await setFilerNameInput(page, filerName);
  await clickSearchButton(page);
  await clickViewFormsLink(page);
}

const clickSearchButton = async (page: Page): Promise<void> => {
  await page.locator('#ctl00_DefaultContent_ASPxRoundPanel1_btnFindFilers_CD').click();
  await page.waitForLoadState('networkidle');
}

const clickViewFormsLink = async (page: Page): Promise<void> => {
  const row = 0;
  await page.locator(`#ctl00_GridContent_gridFilers_DXCBtn${row}`).click();
  await page.waitForLoadState('networkidle');
}

const setFilerNameInput = async (page: Page, filerName: string): Promise<void> => {
  const filerNameInput 
    = `#ctl00_DefaultContent_ASPxRoundPanel1_txtFilerName_I`;
  
  return await page.fill(filerNameInput, filerName);
}
