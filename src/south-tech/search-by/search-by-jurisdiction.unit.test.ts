import { jest } from '@jest/globals'
import { getFilingYears, getJurisdictions, jurisdictionSearch as search} from "./search-by-jurisdiction";

import { Agencies } from "../test-agencies";

describe('search by jurisdiction tests', () => {
  test(`should get a list of filing years`, async () => {
    const result = await getFilingYears(Agencies[0].urlPrefix);
    expect(Array.isArray(result)).toBe(true);
    console.log({result});
  }, 50000);

  test(`should get a list of Jurisdictions with no input`, async () => {
    const result = await getJurisdictions(Agencies[0].urlPrefix, {});
    expect(Array.isArray(result)).toBe(true);
    console.log({'result.length': result.length});
  }, 50000);

  test(`should get a list of Jurisdictions for filingYear 2024`, async () => {
    const result = await getJurisdictions(Agencies[0].urlPrefix, {filingYear: '2024'});
    expect(Array.isArray(result)).toBe(true);
    console.log({result});
    console.log({'result.length': result.length});
  }, 50000);

  test.only(`should get a list of filings for filingYear 2020 '`, async () => {
    const result = await search(Agencies[0].urlPrefix, {filingYear: '2020'});
    expect(Array.isArray(result)).toBe(true);
    // console.log({result});
    console.log({'result.length': result.length});
  }, 50000);

  test(`should get a list of filings for filingYear 2022 and jurisdiction 'SAN DIEGO COMMUNITY COLLEGE'`, async () => {
    const result = await search(Agencies[0].urlPrefix, {filingYear: '2022', jurisdiction: 'SAN DIEGO COMMUNITY COLLEGE'});
    expect(Array.isArray(result)).toBe(true);
    console.log({result});
    console.log({'result.length': result.length});
  }, 50000);
});

// npm run test  ./src/south-tech/search-by/search-by-jurisdiction.unit.test.ts
