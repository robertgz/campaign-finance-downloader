// import { jest } from '@jest/globals'
import * as filedForm from "./search-by-filed-form.js";

import { Agencies } from "../test-agencies";
const urlPrefix = Agencies[0].urlPrefix;

describe('search by Filed Form tests', () => {
  test(`should get a list of forms`, async () => {
    const result = await filedForm.getForms(urlPrefix);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length > 0).toBe(true);
    console.log({result: result.slice(0,10)});
  }, 50000);

  test(`should get a list of Filed Forms with fromDate input`, async () => {
    const result = await filedForm.formSearch(urlPrefix, {formFromDate: '7/19/2022'});
    expect(Array.isArray(result.results.data)).toBe(true);
    console.log({result: result.results.data?.slice(0,10)});
    console.log({'result.length': result?.results?.data?.length});
  }, 50000);

  test(`should get a list of Filed Forms with formFromDate, formToDate input`, async () => {
    const result = await filedForm.formSearch(urlPrefix, {formFromDate: '7/19/2022', formToDate: '7/20/2022'});
    expect(Array.isArray(result.results.data)).toBe(true);
    console.log({result: result.results.data?.slice(0,10)});
    console.log({'result.length': result?.results?.data?.length});
  }, 50000);

  test(`should get a list of Filed Forms with form, fromDate input`, async () => {
    const result = await filedForm.formSearch(urlPrefix, {form: '460  Recipient Committee Campaign Statement', formFromDate: '7/19/2022'});
    expect(Array.isArray(result.results.data)).toBe(true);
    console.log({result: result.results.data?.slice(0,10)});
    console.log({'result.length': result?.results?.data?.length});
  }, 50000);

  test(`should get a list of Filed Forms with form, formFromDate, formToDate input`, async () => {
    const result = await filedForm.formSearch(urlPrefix, {form: '460  Recipient Committee Campaign Statement', formFromDate: '7/19/2022', formToDate: '7/20/2022'});
    expect(Array.isArray(result.results.data)).toBe(true);
    console.log({result: result.results.data?.slice(0,10)});
    console.log({'result.length': result?.results?.data?.length});
  }, 50000);
});

// npm run test  ./src/south-tech/search-by/search-by-filed-form.unit.test.ts
