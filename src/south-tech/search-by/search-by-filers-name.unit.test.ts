
import { getFilingYears, filersNameSearch as search } from "./search-by-filers-name";

import { Agencies as agencies } from "../test-agencies";

describe(`Search by Filer's Name`, () => {
  test(`gets array of Filing Years`, async () => {
    const result = await getFilingYears(agencies[0].urlPrefix);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length > 0).toBe(true);
    console.log({result: result.slice(0,10)});
  }, 20000);

  test(`search with filingYear input`, async () => {
    const result = await search(agencies[0].urlPrefix, {filingYear: '2022'});
    expect(Array.isArray(result)).toBe(true);
    expect(result.length > 0).toBe(true);
    console.log({result: result.slice(0,10)});
  }, 50000);

  test(`search with filerName input `, async () => {
    const result = await search(agencies[0].urlPrefix, { filerName: 'sm' });
    expect(Array.isArray(result)).toBe(true);
    expect(result.length > 0).toBe(true);
    console.log({result: result.slice(0,10)});
  }, 50000);

  test(`search with filingYear, filerName input `, async () => {
    const result = await search(agencies[0].urlPrefix, {filingYear: '2022', filerName: 'sm' });
    expect(Array.isArray(result)).toBe(true);
    expect(result.length > 0).toBe(true);
    console.log({result: result.slice(0,10)});
  }, 50000);

  test(`search with invalid year`, async () => {
    const result = await search(agencies[0].urlPrefix, { filingYear: '202e' });
    expect(Array.isArray(result)).toBe(true);
    expect(result.length > 0).toBe(false);
  }, 20000);
});

// npm run test  ./src/south-tech/search-by/search-by-filers-name.unit.test.ts
