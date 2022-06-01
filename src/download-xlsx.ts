const playwright = require('playwright');
const AdmZip = require("adm-zip");

interface MetaData {
  name: string;
  time: string;
}

export const getXLSXTransactions = async (aid: string, year: string) => {
  const pageURL = `https://public.netfile.com/pub2/Default.aspx?aid=${aid}`;
  const optionSelector = '#ctl00_phBody_DateSelect';
  const downloadCommand = `javascript:__doPostBack('ctl00$phBody$GetExcelAmend','')`;
  const fileExtension = '.xlsx';

  const browser = await playwright.chromium.launch({
    headless: true,
  });

  const page = await browser.newPage();
  await page.goto(pageURL);
  await page.selectOption(optionSelector, year);

  const [ download ] = await Promise.all([
    page.waitForEvent('download'),
    page.evaluate(downloadCommand),
  ]);
  
  const path = await download.path();
  const zip = new AdmZip(path);
  await browser.close();
 
  const zipEntries = zip.getEntries();
  const expectedXLSXFile = zipEntries[0];

  if (!expectedXLSXFile.entryName.endsWith(fileExtension)) throw `Error extracting file with extension: ${fileExtension}`;

  const XLSXTransactionsFile: Buffer = expectedXLSXFile.getData();

  const metaData: MetaData = {
    name: expectedXLSXFile.entryName,
    time: expectedXLSXFile.header.time,
  };

  return { XLSXTransactionsFile, metaData }
}
