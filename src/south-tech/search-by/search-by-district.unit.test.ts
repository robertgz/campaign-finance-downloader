import { jest } from '@jest/globals'
import { getFilingYears, getDistricts, districtSearch as search} from "./search-by-district.js";
import * as district from "./search-by-district.js";

import { Agencies } from "../test-agencies";

describe('search by Districts tests', () => {
  test(`should get a list of filing years`, async () => {
    const result = await district.getFilingYears(Agencies[0].urlPrefix);
    expect(Array.isArray(result)).toBe(true);
    console.log({result});
  }, 50000);

  test(`should get a list of Districts with no input`, async () => {
    const result = await district.getDistricts(Agencies[0].urlPrefix, {});
    expect(Array.isArray(result)).toBe(true);
    console.log({'result.length': result.length});
  }, 50000);

  test(`should get a list of Districts for filingYear 2024`, async () => {
    const result = await district.getDistricts(Agencies[0].urlPrefix, {filingYear: '2024'});
    expect(Array.isArray(result)).toBe(true);
    console.log({result});
    console.log({'result.length': result.length});
  }, 50000);

  test(`should get a list of filings for filingYear 2021 and district 'HIGH SCHOOL'`, async () => {
    const result = await district.districtSearch(Agencies[0].urlPrefix, {filingYear: '2021', district: 'HIGH SCHOOL'});
    expect(Array.isArray(result)).toBe(true);
    console.log({result});
    console.log({'result.length': result.length});
  }, 50000);
});

// npm run test  ./src/south-tech/search-by/search-by-district.unit.test.ts