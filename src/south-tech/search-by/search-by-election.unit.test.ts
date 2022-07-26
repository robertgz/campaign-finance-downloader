import { jest } from '@jest/globals'
import * as election from "./search-by-election.js";

import { Agencies } from "../test-agencies";
const urlPrefix = Agencies[0].urlPrefix;

describe('search by election tests', () => {
  
  test(`should get a list of election types`, async () => {
    const result = await election.getElectionTypes(urlPrefix);
    expect(Array.isArray(result)).toBe(true);
    console.log({result});
  }, 50000);

  test(`should get a list of a subset of the election dates`, async () => {
    const result = await election.getElectionDates(urlPrefix, {electionType: 'General'});
    expect(Array.isArray(result)).toBe(true);
    console.log({result});
  }, 50000);

  test(`should get a all of the election dates`, async () => {
    const result = await election.getElectionDates(urlPrefix, {});
    expect(Array.isArray(result)).toBe(true);
    console.log({result});
  }, 50000);


  test(`does search`, async () => {
    const result = await election.electionSearch(urlPrefix, {electionDate: '6/7/2022'});
    expect(Array.isArray(result.results.data)).toBe(true);
    console.log({result});
  }, 50000);
  
});

// npm run test  ./src/south-tech/search-by/search-by-election.unit.test.ts
