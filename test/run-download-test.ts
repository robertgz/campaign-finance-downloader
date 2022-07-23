// var fs = require('fs');
// var netFile = require('../index');
// import { NetFile, SouthTech } from "../src/index.js"
import * as software from "../src/index"
const SouthTech = software.SouthTech;

const list =  [
  '06/07/2022 Primary Election',
  '11/03/2020 Special Election',
  '03/03/2020 Primary Election',
  '11/06/2018 Special Election',
  '06/05/2018 General Election',
  '11/08/2016 Runoff Election',
  '06/07/2016 General Election',
  '11/04/2014 Runoff Election',
  '11/06/2012 Runoff Election'
];

export async function runTests() {
  // const list = await getElections('CCV');
  // console.log({ list });

  // const forest = await getCandidates('CCV', ['06/07/2022 Primary Election']);
  // // // console.log({ forest });
  // // console.log(JSON.stringify(forest, null, 2));
  // console.log(flattenCandidateTree(forest));
  
  // const years = await getTransactionYears('CCV');
  // console.log(years);

  // const years = await getXLSXBuffer('CCV', '2017');
  await runDownloadTest();
}

export async function runDownloadTest() {
  const aid = 'CCV';
  const year = '2015';

  // const { XLSXTransactionsFile: fileBuffer, metaData } = await NetFile.getXLSXTransactions(aid, year);
  // const filename = metaData.name;

  // if (fileBuffer === null) return null;

  // fs.writeFile(filename, fileBuffer, function (err: any) {
  //   if (err) return console.log(err);
  //   console.log('File written: ', filename);
  // })
}

async function runSTTest() {
  // const dates = await southTech.getElectionDates('SanDiegoCounty');
  // console.log(dates);
  // const filers = await southTech.getFilers('SanDiegoCounty', '6/7/2022');
  // console.log(filers);

  const forms = await SouthTech.getForms('SanDiegoCounty', 'Amy Reichert for Supervisor 2022', {
    includeTransactionExports: true,
    fromFilingDate: '2/2/2022',
    toFilingDate: '5/25/2022',
  })

  // console.log({forms});

  const { export: buffer } = forms[0];

  if (!buffer) return [];
  SouthTech.getTransactions(buffer)
}

;(async () => {
  // await runDownloadTest();
  // await runSTTest();
})()
