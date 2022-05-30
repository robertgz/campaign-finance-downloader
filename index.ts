import { getElections } from './src/elections'
import { getCandidates, flattenCandidateTree } from './src/candidates'

;(async () => {
  const list = await getElections('CCV');
  console.log({ list });
})()

module.exports = {
  getElections,
  getCandidates,
  flattenCandidateTree,
};
