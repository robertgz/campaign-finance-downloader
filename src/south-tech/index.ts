import { getElectionDates } from './legacy/election-dates.js';
import { getFilers } from './legacy/filers.js';
import { getForms } from './forms.js';
import { getAgencyName } from './agency-name.js';
import { getTransactions } from './transactions.js';
import { searchBy }  from './search-by/index.js';
import { scraper }  from './scraper';

const southTech = {
  getAgencyName,
  getElectionDates,
  getFilers,
  getForms,
  getTransactions,
  searchBy,
  scraper,
}

export { southTech };
export default southTech;
