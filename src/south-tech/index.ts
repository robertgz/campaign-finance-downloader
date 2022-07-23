import { getElectionDates } from './election-dates.js';
import { getFilers } from './filers.js';
import { getForms } from './forms.js';
import { getAgencyName } from './agency-name.js';
import { getTransactions } from './transactions.js';
import { searchBy }  from './search-by/index.js';

const southTech = {
  getAgencyName,
  getElectionDates,
  getFilers,
  getForms,
  getTransactions,
  searchBy,
}

export { southTech };
export default southTech;
