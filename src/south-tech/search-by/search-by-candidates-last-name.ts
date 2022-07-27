
import { getList } from '../pages/list-items';
import { doSearchByPage } from '../pages/search-by';
import { SearchByPagePaths } from "../constants/search-by-page-paths";
import { OptionItemsCollection } from '../constants/option-selectors';
import type { OptionTypes } from '../page-controls/apply-options';

export type CandidateLastNameSearch = Pick<OptionTypes, "filingYear" | "candidateLastName" | "allowPartialMatch">;

const pageSuffix = SearchByPagePaths.CandidateLastName;

export const getFilingYears = async (urlPathPrefix: string): Promise<String[]> => {
  return await getList({
    urlPathPrefix,
    pageSuffix,
    optionSelector: OptionItemsCollection.filingYear,
  });
}

export const lastNameSearch = async (urlPathPrefix: string, inputOptions: CandidateLastNameSearch) => {
  return await doSearchByPage({
    urlPathPrefix,
    pageSuffix,
    inputOptions,
  });
}

export const candidateLastName = {
  getFilingYears,
  search: lastNameSearch,
}
