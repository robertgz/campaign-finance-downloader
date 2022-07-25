
export const areStringsEqual = (a: string, b: string) => {
  return a.localeCompare(b, undefined, { sensitivity: 'base' } ) === 0;
}

export const buildObjects = <O>(rowData: string[][], rowHeader: string[]): O[] => {
  const headers = rowHeader
    .map((header) => header
      .replaceAll(' ', '_')
      .replaceAll('/', '_')
      .toLocaleLowerCase().trim());

  const newObjects: O[] = rowData.map((row) => {
    const newRow = row
      .map((item, index) => [headers[index], item.trim()])
    return Object.fromEntries(newRow);
  })

  return newObjects
}
