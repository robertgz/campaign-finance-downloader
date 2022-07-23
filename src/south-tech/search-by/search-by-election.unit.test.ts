import { jest } from '@jest/globals'
import { electionSearch as search, getElectionDates, getElectionTypes} from "./search-by-election";

import { Agencies } from "../test-agencies";

describe('search by election tests', () => {
  
  test(`should get a list of election types`, async () => {
    const result = await getElectionTypes(Agencies[0].urlPrefix);
    expect(Array.isArray(result)).toBe(true);
    console.log({result});
  }, 50000);

  test(`should get a list of a subset of the election dates`, async () => {
    const result = await getElectionDates(Agencies[0].urlPrefix, {electionType: 'General' });
    expect(Array.isArray(result)).toBe(true);
    console.log({result});
  }, 50000);

  test(`should get a all of the election dates`, async () => {
    const result = await getElectionDates(Agencies[0].urlPrefix);
    expect(Array.isArray(result)).toBe(true);
    console.log({result});
  }, 50000);
  

  test(`does search`, async () => {
    const result = await search(Agencies[0].urlPrefix, {  electionDate: '6/7/2022' });
    expect(Array.isArray(result)).toBe(true);
    console.log({result});
  }, 50000);
  
});

// npm run test  ./src/south-tech/search-by/search-by-election.unit.test.ts
