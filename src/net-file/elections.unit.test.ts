import { getElectionTitles } from "./elections";
import { jest } from '@jest/globals'

jest.setTimeout(10000);

test('gets array of strings', async () => {
  const result = await getElectionTitles('CCV');
  expect(Array.isArray(result)).toBe(true);
  expect(result.length > 0).toBe(true);
});
