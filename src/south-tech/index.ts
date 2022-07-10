import { getElectionDates } from './election-dates.js';
import { getFilers } from './filers.js';
import { getForms } from './forms.js';
import { getAgencyName } from './agency-name.js';

const southTech = {
  getAgencyName,
  getElectionDates,
  getFilers,
  getForms,
}

export { southTech };
export default southTech;
