import { jest } from '@jest/globals'
import * as candidatesLastName from "./search-by-candidates-last-name.js";
import { Agencies } from "../test-agencies";
const urlPrefix = Agencies[0].urlPrefix;

describe(`Search by Candidate's Last Name`, () => {
  test(`gets array of Filing Years`, async () => {
    const result = await candidatesLastName.getFilingYears(urlPrefix);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length > 0).toBe(true);
    console.log({result: result.slice(0,10)});
  }, 20000);
  
  test(`search candidates-last-name with filingYear input`, async () => {
    const result = await candidatesLastName.lastNameSearch(urlPrefix, { filingYear: '2022'});
    expect(Array.isArray(result.results.data)).toBe(true);
    // expect(result.length > 0).toBe(true);
    console.log({result: result?.results?.data?.slice(0,10)});
    console.log({'result.length': result.results.data?.length});
  }, 50000);
  
  test(`search candidates-last-name with candidateLastName input`, async () => {
    const result = await candidatesLastName.lastNameSearch(urlPrefix, {  candidateLastName: 'sm' });
    expect(Array.isArray(result.results.data)).toBe(true);
    // expect(result.length > 0).toBe(true);
    console.log({result: result?.results?.data?.slice(0,10)});
    console.log({'result.length': result.results.data?.length});
  }, 50000);

  test(`search candidates-last-name with year, candidateLastName input`, async () => {
    const result = await candidatesLastName.lastNameSearch(urlPrefix, { filingYear: '2022', candidateLastName: 'sa' });
    expect(Array.isArray(result.results.data)).toBe(true);
    // expect(result.length > 0).toBe(true);
    console.log({result: result?.results?.data?.slice(0,10)});
    console.log({'result.length': result.results.data?.length});
  }, 50000);
  
  test(`search candidates-last-name with invalid year`, async () => {
    const result = await candidatesLastName.lastNameSearch(urlPrefix, { filingYear: '202e' });
    expect(Array.isArray(result.results.data)).toBe(true);
    // expect(result.length > 0).toBe(false);
    console.log({result: result?.results?.data?.slice(0,10)});
    console.log({'result.length': result.results.data?.length});
  }, 20000);
  
});

// npm run test  ./src/south-tech/search-by/search-by-candidates-last-name.unit.test.ts
