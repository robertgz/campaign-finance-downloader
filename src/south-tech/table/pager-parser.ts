
export const parsePageCountFromSummary = (summary: string): number => {
  const countText = summary.split('(')[0].split('of')[1].trim();

  return parseInt(countText);
}

export const parseItemCountFromSummary = (summary: string): number => {
  const countText = summary.split('(')[1].split(' ')[0].trim();

  return parseInt(countText);
}

export const getMaxPagerNumber = (pagerNumbers: string[]): number => {
  const pageNumbers = pagerNumbers
    .map((num) => parseInt(num.replaceAll('[','').replaceAll(']','')));

  return Math.max(...pageNumbers)
}
