import { jest } from '@jest/globals'
import * as jurisdiction from "./search-by-jurisdiction.js";

import { Agencies } from "../test-agencies";
const urlPrefix = Agencies[0].urlPrefix;

describe('search by jurisdiction tests', () => {
  test(`should get a list of filing years`, async () => {
    const result = await jurisdiction.getFilingYears(urlPrefix);
    expect(Array.isArray(result)).toBe(true);
    console.log({result});
  }, 50000);

  test(`should get a list of Jurisdictions with no input`, async () => {
    const result = await jurisdiction.getJurisdictions(urlPrefix, {});
    expect(Array.isArray(result)).toBe(true);
    console.log({'result.length': result.length});
  }, 50000);

  test(`should get a list of Jurisdictions for filingYear 2024`, async () => {
    const result = await jurisdiction.getJurisdictions(urlPrefix, {filingYear: '2024'});
    expect(Array.isArray(result)).toBe(true);
    console.log({result});
    console.log({'result.length': result.length});
  }, 50000);

  test(`should get a list of filings for filingYear 2020`, async () => {
    const result = await jurisdiction.jurisdictionSearch(urlPrefix, {filingYear: '2020'});
    expect(Array.isArray(result.results.data)).toBe(true);
    console.log({result});
    console.log({'result.length': result?.results?.data?.length});
  }, 50000);

  test(`should get a list of filings for filingYear 2022 and jurisdiction 'SAN DIEGO COMMUNITY COLLEGE'`, async () => {
    const result = await jurisdiction.jurisdictionSearch(urlPrefix, {filingYear: '2022', jurisdiction: 'SAN DIEGO COMMUNITY COLLEGE'});
    expect(Array.isArray(result.results.data)).toBe(true);
    console.log({result});
    console.log({'result.length': result?.results?.data?.length});
  }, 50000);
});

// npm run test  ./src/south-tech/search-by/search-by-jurisdiction.unit.test.ts
