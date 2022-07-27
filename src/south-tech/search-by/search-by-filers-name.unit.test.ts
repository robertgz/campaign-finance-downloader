
import * as filersName from "./search-by-filers-name.js";
import { Agencies } from "../test-agencies";
const urlPrefix = Agencies[0].urlPrefix;

describe(`Search by Filer's Name`, () => {
  test(`gets array of Filing Years`, async () => {
    const result = await filersName.getFilingYears(urlPrefix);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length > 0).toBe(true);
    console.log({result: result.slice(0,10)});
  }, 20000);

  test(`search with filingYear input`, async () => {
    const result = await filersName.filersNameSearch(urlPrefix, {filingYear: '2022'});
    expect(Array.isArray(result.results.data)).toBe(true);
    // expect(result?.results?.data.length > 0).toBe(true);
    console.log({result: result?.results?.data?.slice(0,10)});
    console.log({'result.length': result.results.data?.length});
  }, 50000);

  test(`search with filerName input `, async () => {
    const result = await filersName.filersNameSearch(urlPrefix, { filerName: 'sm' });
    expect(Array.isArray(result.results.data)).toBe(true);
    // expect(result.length > 0).toBe(true);
    console.log({result: result?.results?.data?.slice(0,10)});
    console.log({'result.length': result.results.data?.length});
  }, 50000);

  test(`search with filingYear, filerName input `, async () => {
    const result = await filersName
      .filersNameSearch(urlPrefix, {filingYear: '2022', filerName: 'sm' });
    expect(Array.isArray(result.results.data)).toBe(true);
    // expect(result.length > 0).toBe(true);
    console.log({result: result?.results?.data?.slice(0,10)});
    console.log({'result.length': result.results.data?.length});
  }, 50000);

  test.only(`search with invalid year`, async () => {
    const result = await filersName.filersNameSearch(urlPrefix, { filingYear: '202e' });
    expect(Array.isArray(result.results.data)).toBe(true);
    // expect(result.length > 0).toBe(false);
    console.log({result: result?.results?.data?.slice(0,10)});
    console.log({'result.length': result.results.data?.length});
  }, 20000);
});

// npm run test  ./src/south-tech/search-by/search-by-filers-name.unit.test.ts
