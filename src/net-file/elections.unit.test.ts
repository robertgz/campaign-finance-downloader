import { jest } from '@jest/globals'
import { getElectionTitles } from "./elections";

// jest.setTimeout(10000);

test.skip('gets array of strings', async () => {
  const result = await getElectionTitles('CCV');
  expect(Array.isArray(result)).toBe(true);
  expect(result.length > 0).toBe(true);
}, 10000);
