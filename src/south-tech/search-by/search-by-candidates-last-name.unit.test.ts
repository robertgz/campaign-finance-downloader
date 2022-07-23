import { jest } from '@jest/globals'
import { getFilingYears, lastNameSearch as search } from "./search-by-candidates-last-name";

import { Agencies as agencies } from "../test-agencies";


describe(`Search by Candidate's Last Name`, () => {
  test(`gets array of Filing Years`, async () => {
    const result = await getFilingYears(agencies[0].urlPrefix);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length > 0).toBe(true);
    console.log({result: result.slice(0,10)});
  }, 20000);
  
  test(`search candidates-last-name with filingYear input`, async () => {
    const result = await search(agencies[0].urlPrefix, { filingYear: '2022'});
    expect(Array.isArray(result)).toBe(true);
    expect(result.length > 0).toBe(true);
    console.log({result: result.slice(0,10)});
  }, 50000);
  
  test(`search candidates-last-name with candidateLastName input`, async () => {
    const result = await search(agencies[0].urlPrefix, {  candidateLastName: 'sm' });
    expect(Array.isArray(result)).toBe(true);
    expect(result.length > 0).toBe(true);
    console.log({result: result.slice(0,10)});
  }, 50000);

  test(`search candidates-last-name with year, candidateLastName input`, async () => {
    const result = await search(agencies[0].urlPrefix, { filingYear: '2022', candidateLastName: 'sa' });
    expect(Array.isArray(result)).toBe(true);
    expect(result.length > 0).toBe(true);
    console.log({result: result.slice(0,10)});
  }, 50000);
  
  test(`search candidates-last-name with invalid year`, async () => {
    const result = await search(agencies[0].urlPrefix, { filingYear: '202e' });
    expect(Array.isArray(result)).toBe(true);
    expect(result.length > 0).toBe(false);
  }, 20000);
  
});

// npm run test  ./src/south-tech/search-by/search-by-candidates-last-name.unit.test.ts
