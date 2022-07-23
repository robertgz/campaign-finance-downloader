
export const areStringsEqual = (a: string, b: string) => {
  return a.localeCompare(b, undefined, { sensitivity: 'base' } ) === 0;
}

export const buildObjects = (rowData: string[][], rowHeader: string[]): any[] => {
  const headers = rowHeader
    .map((header) => header
      .replaceAll(' ', '_')
      .replaceAll('/', '_')
      .toLocaleLowerCase().trim());

  const newObjects = rowData.map((row) => {
    const newRow = row
      .map((item, index) => [headers[index], item.trim()])
    return Object.fromEntries(newRow);
  })

  return newObjects
}
