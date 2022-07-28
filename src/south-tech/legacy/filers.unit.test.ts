import { jest } from '@jest/globals'
import { getFilers } from "./filers";

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
const electionDates = [
  '6/7/2022',
  '11/3/2020',
];

describe.skip('getFilers tests', () => {
  test(`gets filers from urlPrefix`, async () => {
    const result = await getFilers(agencies[0].urlPrefix, electionDates[0]);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length > 0).toBe(true);
    const resultItem = result[0];
    expect(resultItem).toHaveProperty('election_type');
    expect(resultItem).toHaveProperty('election_date');
    expect(resultItem).toHaveProperty('filer_name');
    expect(resultItem).toHaveProperty('candidate_last_name');
    expect(resultItem).toHaveProperty('ballot_item');
  }, 25000);
});