import {read, utils}  from 'xlsx';

export const getTransactions = (buffer: Buffer) => {
  const data = buffer;
  var workbook = read(data, {
    cellDates: true,
  });
  // const jsonData = workbook.sheet_to_json();
  console.log(workbook.SheetNames)

  const sheet = workbook.Sheets['Sheet'];

  const jsonData = utils.sheet_to_json(sheet, {
    // raw: false,
    // dateNF: 'yyyy-mm-dd'
  });

  console.log(jsonData[0])
}
