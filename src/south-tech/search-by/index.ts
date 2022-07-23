import { filersName } from "./search-by-filers-name"
import { candidateLastName } from "./search-by-candidates-last-name"
import { ballotItem } from "./search-by-ballot-item"
import { election } from "./search-by-election"
import { jurisdiction } from "./search-by-jurisdiction"
import { district } from "./search-by-district"
import { filedForm } from "./search-by-filed-form"

export const searchBy = {
  filersName,
  candidateLastName,
  ballotItem,
  election,
  jurisdiction,
  district,
  filedForm,
}


// south-tech/get-election-dates -> search-by/election/getElectionDates
// south-tech/get-jurisdictions -> jurisdiction/getJurisdictions
// south-tech/get-filers
// south-tech/get-agency-name
