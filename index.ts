import { getElectionTitles } from './src/elections'
import { getCandidates, flattenCandidateTree } from './src/candidates'
import { getTransactionYears } from './src/transaction-years';
import { getXLSXTransactions } from './src/download-xlsx';

module.exports = {
  getElectionTitles,
  getCandidates,
  flattenCandidateTree,
  getTransactionYears,
  getXLSXTransactions,
};
