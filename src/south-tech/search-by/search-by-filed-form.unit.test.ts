// import { jest } from '@jest/globals'
import * as filedForm from "./search-by-filed-form";
import {getForms, formSearch} from "./search-by-filed-form";

import { Agencies } from "../test-agencies";

describe('search by Filed Form tests', () => {
  test(`should get a list of forms`, async () => {
    const result = await getForms(Agencies[0].urlPrefix);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length > 0).toBe(true);
    console.log({result: result.slice(0,10)});
  }, 50000);

  test(`should get a list of Filed Forms with fromDate input`, async () => {
    const result = await formSearch(Agencies[0].urlPrefix, {fromDate: '7/19/2022'});
    expect(Array.isArray(result)).toBe(true);
    console.log({result: result.slice(0,10)});
    console.log({'result.length': result.length});
  }, 50000);

  test(`should get a list of Filed Forms with fromDate, toDate input`, async () => {
    const result = await formSearch(Agencies[0].urlPrefix, {fromDate: '7/19/2022', toDate: '7/20/2022'});
    expect(Array.isArray(result)).toBe(true);
    console.log({result: result.slice(0,10)});
    console.log({'result.length': result.length});
  }, 50000);

  test(`should get a list of Filed Forms with form, fromDate input`, async () => {
    const result = await formSearch(Agencies[0].urlPrefix, {form: '460  Recipient Committee Campaign Statement', fromDate: '7/19/2022'});
    expect(Array.isArray(result)).toBe(true);
    console.log({result: result.slice(0,10)});
    console.log({'result.length': result.length});
  }, 50000);

  test(`should get a list of Filed Forms with form, fromDate, toDate input`, async () => {
    const result = await formSearch(Agencies[0].urlPrefix, {form: '460  Recipient Committee Campaign Statement', fromDate: '7/19/2022', toDate: '7/20/2022'});
    expect(Array.isArray(result)).toBe(true);
    console.log({result: result.slice(0,10)});
    console.log({'result.length': result.length});
  }, 50000);
});

// npm run test  ./src/south-tech/search-by/search-by-filed-form.unit.test.ts
