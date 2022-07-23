
import { ballotItemSearch, getBallotItems, getElectionDates, getElectionTypes } from './search-by-ballot-item';

import { Agencies } from "../test-agencies";

describe('Search by Ballot Item', () => {
  test(`getElectionTypes`, async () => {
    const result = await getElectionTypes(Agencies[0].urlPrefix);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length > 0).toBe(true);
    console.log({result});
  }, 50000);

  test(`getElectionDates without input`, async () => {
    const result = await getElectionDates(Agencies[0].urlPrefix, {});
    expect(Array.isArray(result)).toBe(true);
    expect(result.length > 0).toBe(true);
    console.log({result});
  }, 50000);

  test(`getElectionDates with input 'Primary'`, async () => {
    const result = await getElectionDates(Agencies[0].urlPrefix, { electionType: 'Primary'});
    expect(Array.isArray(result)).toBe(true);
    expect(result.length > 0).toBe(true);
    console.log({result});
  }, 50000);

  test(`getElectionTypes with input 'General'`, async () => {
    const result = await getElectionDates(Agencies[0].urlPrefix, { electionType:'General' });
    expect(Array.isArray(result)).toBe(true);
    expect(result.length > 0).toBe(true);
    console.log({result});
  }, 50000);

  test(`getBallotItems without input`, async () => {
    const result = await getBallotItems(Agencies[0].urlPrefix, {});
    expect(Array.isArray(result)).toBe(true);
    expect(result.length > 0).toBe(true);
    console.log({result: result.slice(0,10)});
  }, 50000);

  test(`getBallotItems with electionType input 'Special'`, async () => {
    const result = await getBallotItems(Agencies[0].urlPrefix, { electionType: 'Special'});
    expect(Array.isArray(result)).toBe(true);
    expect(result.length > 0).toBe(true);
    console.log({result: result.slice(0,10)});
  }, 50000);

  test(`getBallotItems with electionDate input`, async () => {
    const result = await getBallotItems(Agencies[0].urlPrefix, { electionDate: '6/7/2022'});
    expect(Array.isArray(result)).toBe(true);
    expect(result.length > 0).toBe(true);
    console.log({result: result.slice(0,10)});
  }, 50000);

  test(`getBallotItems with electionDate, electionType input`, async () => {
    const result = await getBallotItems(Agencies[0].urlPrefix, { electionDate: '11/3/2020', electionType: 'General'});
    expect(Array.isArray(result)).toBe(true);
    expect(result.length > 0).toBe(true);
    console.log({result: result.slice(0,10)});
  }, 50000);

  test(`ballotItemSearch with electionDate and ballotItem input`, async () => {
    const result = await ballotItemSearch(Agencies[0].urlPrefix, { electionDate: '6/7/2022', ballotItem: 'ASSESSOR RECORDER county CLERK'});
    expect(Array.isArray(result)).toBe(true);
    expect(result.length > 0).toBe(true);
    console.log({result: result.slice(0,10)});
  }, 50000);

});

// npm run test  ./src/south-tech/search-by/search-by-ballot-item.unit.test.ts
