import { jest } from '@jest/globals'
import { getElectionDates } from "./election-dates";

const agencies = [
  {
    urlPrefix: 'www.southtechhosting.com/SanDiegoCounty',
    name: 'San Diego County',
  },
  {
    urlPrefix: 'campaigndocs.co.fresno.ca.us',
    name: 'County of Fresno',
  },
];

describe.skip('getElectionDates tests', () => {
  test(`gets "${agencies[0].name}" from urlPrefix`, async () => {
    const result = await getElectionDates(agencies[0].urlPrefix);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length > 0).toBe(true);
  }, 20000);
  
  test(`gets "${agencies[1].name}" from urlPrefix`, async () => {
    const result = await getElectionDates(agencies[1].urlPrefix);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length > 0).toBe(true);
  }, 20000);
});