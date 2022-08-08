
export interface ByElection {
  election_type: string;
  election_date: string;
  filer_name: string;
  candidate_last_name: string;
  candidate_first_name: string;
  candidate_middle_name: string;
  ballot_item: string;
  support_oppose: string;
  ballot_type: string;
}

export interface ByCandidatesLastName {
  filer_name: string;
  candidate_last_name: string;
  candidate_first_name: string;
  candidate_middle_name: string;
}

export interface ByBallotItem {
  ballot_item: string;
  support_oppose: string;
  ballot_type: string;
  election_date: string;
  election_type: string;
  filer_name: string;
  candidate_last_name: string;
  candidate_first_name: string;
  candidate_middle_name: string;
}

export interface BallotItem {
  ballot_item: string;
  jurisdiction: string;
  district: string;
}

export interface ByElection {
  election_type: string;
  election_date: string;
  filer_name: string;
  candidate_last_name: string;
  candidate_first_name: string;
  candidate_middle_name: string;
  ballot_item: string;
  support_oppose: string;
  ballot_type: string;
}

export interface ByJurisdiction {
  jurisdiction: string;
  ballot_item: string;
  election_date: string;
  election_type: string;
  filer_name: string;
  candidate_last_name: string;
  candidate_first_name: string;
  candidate_middle_name: string;
}

export interface ByDistrict {
  district: string;
  ballot_item: string;
  election_date: string;
  election_type: string;
  filer_name: string;
  candidate_last_name: string;
  candidate_first_name: string;
  candidate_middle_name: string;
}

export interface ByFiledForm {
  form_type: string;
  filing_date: string; 
  filer_name: string; 
  candidate_last_name: string; 
  candidate_first_name: string; 
  candidate_middle_name: string;
}


// export interface Form {
//   form_type: string;
//   form_description: string;
//   filing_date: string;
//   filing_period: string;
//   export?: Buffer | null;
// }


export interface SearchResponse<T = unknown[]> {
  status: string; // 'Complete' | 'Partial' | 'Error'
  message: string | null;
  results: {
    data: T | null;
    returned: number;
    found: number;
  };
}
