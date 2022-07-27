
import { doSearchByPage } from '../pages/search-by';
import { SearchByPagePaths } from "../constants/search-by-page-paths";
import { OptionSelectors } from '../constants/option-selectors';
import { getList } from '../pages/list-items';
import { OptionTypes } from '../page-controls/apply-options';

export type CandidateLastNameSearch = Pick<OptionTypes, "filingYear" | "candidateLastName" | "allowPartialMatch">;

export const getFilingYears = async (urlPathPrefix: string): Promise<String[]> => {
  return await getList({
    urlPathPrefix,
    pageSuffix: SearchByPagePaths.CandidateLastName,
    optionSelector: OptionSelectors.filingYear,
  });
}

export const lastNameSearch = async (urlPathPrefix: string, inputOptions: CandidateLastNameSearch) => {
  return await doSearchByPage({
    urlPathPrefix,
    pageSuffix: SearchByPagePaths.CandidateLastName,
    inputOptions,
  });
}

export const candidateLastName = {
  getFilingYears,
  search: lastNameSearch,
}
