
import { getList } from '../pages/get-list';
import { doSearchByPage } from '../pages/search-by';
import { SearchByPagePaths } from "../constants/search-by-page-paths";
import { OptionItemsCollection, OptionTypes } from '../constants/option-selectors';

export type CandidateLastNameSearch = Pick<OptionTypes, "filingYear" | "candidateLastName" | "allowPartialMatch">;

const pageSuffix = SearchByPagePaths.CandidateLastName;

export const getFilingYears = async (urlPathPrefix: string) => {
  return await getList({
    urlPathPrefix,
    pageSuffix,
    optionSelector: OptionItemsCollection.filingYear,
  }) as string[];
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
