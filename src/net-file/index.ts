import { getElectionTitles } from './elections'
import { getCandidates, flattenCandidateTree } from './candidates'
import { getTransactionYears } from './transaction-years';
import { getXLSXTransactions } from './download-xlsx';

const netFile = {
  getElectionTitles,
  getCandidates,
  flattenCandidateTree,
  getTransactionYears,
  getXLSXTransactions,
}

export { netFile };
export default netFile;
