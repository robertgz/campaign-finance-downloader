import { jest } from '@jest/globals'
import { getAgencyName } from "./agency-name";

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

describe.skip('getAgencyName tests', () => {

  test(`gets "${agencies[0].name}" from urlPrefix`, async () => {
    const result = await getAgencyName(agencies[0].urlPrefix);
    expect(typeof result).toBe('string');
    expect(result).toBe(agencies[0].name);
  }, 20000);

  test(`gets "${agencies[1].name}" from urlPrefix`, async () => {
    const result = await getAgencyName(agencies[1].urlPrefix);
    expect(typeof result).toBe('string');
    expect(result).toBe(agencies[1].name);
  }, 20000);

});
