import { getElectionTitles } from './elections.js'
import { getCandidates, flattenCandidateTree } from './candidates.js'
import { getTransactionYears } from './transaction-years.js';
import { getXLSXTransactions } from './download-xlsx.js';

const netFile = {
  getElectionTitles,
  getCandidates,
  flattenCandidateTree,
  getTransactionYears,
  getXLSXTransactions,
}

export { netFile };
export default netFile;
