
import * as ballotItem from "./search-by-ballot-item.js";

import { Agencies } from "../test-agencies";
const urlPrefix = Agencies[0].urlPrefix;

describe('Search by Ballot Item', () => {
  // test(`getElectionTypes`, async () => {
  //   const result = await ballotItem.getElectionTypes(urlPrefix);
  //   expect(Array.isArray(result)).toBe(true);
  //   expect(result.length > 0).toBe(true);
  //   console.log({result});
  // }, 50000);

  // test(`getElectionDates without input`, async () => {
  //   const result = await ballotItem.getElectionDates(urlPrefix, {});
  //   expect(Array.isArray(result)).toBe(true);
  //   expect(result.length > 0).toBe(true);
  //   console.log({result});
  // }, 50000);

  // test(`getElectionDates with input 'Primary'`, async () => {
  //   const result = await ballotItem.getElectionDates(urlPrefix, { electionType: 'Primary'});
  //   expect(Array.isArray(result)).toBe(true);
  //   expect(result.length > 0).toBe(true);
  //   console.log({result});
  // }, 50000);

  // test(`getElectionTypes with input 'General'`, async () => {
  //   const result = await ballotItem.getElectionDates(urlPrefix, { electionType:'General' });
  //   expect(Array.isArray(result)).toBe(true);
  //   expect(result.length > 0).toBe(true);
  //   console.log({result});
  // }, 50000);

  // test(`getBallotItems without input`, async () => {
  //   const result = await ballotItem.getBallotItems(urlPrefix, {});
  //   expect(Array.isArray(result)).toBe(true);
  //   expect(result.length > 0).toBe(true);
  //   console.log({result: result.slice(0,10)});
  // }, 50000);

  // test(`getBallotItems with electionType input 'Special'`, async () => {
  //   const result = await ballotItem.getBallotItems(urlPrefix, { electionType: 'Special'});
  //   expect(Array.isArray(result)).toBe(true);
  //   expect(result.length > 0).toBe(true);
  //   console.log({result: result.slice(0,10)});
  // }, 50000);

  // test(`getBallotItems with electionDate input`, async () => {
  //   const result = await ballotItem.getBallotItems(urlPrefix, { electionDate: '6/7/2022'});
  //   expect(Array.isArray(result)).toBe(true);
  //   expect(result.length > 0).toBe(true);
  //   console.log({result: result.slice(0,10)});
  // }, 50000);

  // test(`getBallotItems with electionDate, electionType input`, async () => {
  //   const result = await ballotItem.getBallotItems(urlPrefix, { electionDate: '11/3/2020', electionType: 'General'});
  //   expect(Array.isArray(result)).toBe(true);
  //   expect(result.length > 0).toBe(true);
  //   console.log({result: result.slice(0,10)});
  // }, 50000);

  test(`ballotItemSearch with electionDate and ballotItem input, should get 0 results`, async () => {
    const result = await ballotItem.ballotItemSearch(urlPrefix, { electionDate: '3/3/2026', ballotItem: 'CONTROLLER'});
    expect(Array.isArray(result.results.data)).toBe(true);
    // expect(result?.results?.data?.length > 0).toBe(true);
    expect(result.results.data?.length === 0 ).toBe(true);

    // console.log({result: result.results.data?.slice(0,3)});
    console.log({'result.length': result.results.data?.length});
    console.log({'result.length.found': result.results.found});
    console.log({'result.length.returned': result.results.returned});
  }, 50000);

  test(`ballotItemSearch with electionDate and ballotItem, should get 2 results`, async () => {
    const result = await ballotItem.ballotItemSearch(urlPrefix, { electionDate: '6/7/2022', ballotItem: 'ASSESSOR RECORDER county CLERK'});
    expect(Array.isArray(result.results.data)).toBe(true);
    expect(result.results?.data?.length === 2).toBe(true);

    // console.log({result: result.results.data?.slice(0,3)});
    console.log({'result.length': result.results.data?.length});
    console.log({'result.length.found': result.results.found});
    console.log({'result.length.returned': result.results.returned});
  }, 50000);

  test(`ballotItemSearch with electionDate and ballotItem, should get 18 results`, async () => {
    const result = await ballotItem.ballotItemSearch(urlPrefix, { electionDate: '3/5/2024'});
    expect(Array.isArray(result.results.data)).toBe(true);
    expect(result.results?.data?.length ===18).toBe(true);

    // console.log({result: result.results.data?.slice(0,3)});
    console.log({'result.length': result.results.data?.length});
    console.log({'result.length.found': result.results.found});
    console.log({'result.length.returned': result.results.returned});
  }, 50000);

  test(`ballotItemSearch with electionDate, should get over 400`, async () => {
    const result = await ballotItem.ballotItemSearch(urlPrefix, { electionDate: '11/3/2020'});
    
    // console.log({result: result.results.data?.slice(0,3)});
    console.log({'result.length': result.results.data?.length});
    console.log({'result.length.found': result.results.found});
    console.log({'result.length.returned': result.results.returned});
    
    expect(Array.isArray(result.results.data)).toBe(true);
    expect(result.results?.found > 400).toBe(true);
  }, 50000);

});

// npm run test  ./src/south-tech/search-by/search-by-ballot-item.unit.test.ts
