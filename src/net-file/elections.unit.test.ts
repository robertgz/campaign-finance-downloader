import { getElectionTitles } from "./elections";

jest.setTimeout(10000);

test('gets array of strings', async () => {
  const result = await getElectionTitles('CCV');
  expect(Array.isArray(result)).toBe(true);
  expect(result.length > 0).toBe(true);
});
