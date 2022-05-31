import { getElections } from './src/elections'
import { getCandidates, flattenCandidateTree } from './src/candidates'
import { getTransactionYears } from './src/transaction-years';

;(async () => {
  const list = await getElections('CCV');
  console.log({ list });
})()

module.exports = {
  getElections,
  getCandidates,
  flattenCandidateTree,
  getTransactionYears,
};
