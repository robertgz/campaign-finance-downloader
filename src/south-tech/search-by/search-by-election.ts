import { OptionSelectors } from "../constants/option-selectors.js";
import { getList } from "../pages/list-items.js";
import { doSearchByPage } from "../pages/search-by";
import type { OptionTypes } from "../page-controls/apply-options.js";

export type GetElectionDatesOptions = Pick<OptionTypes, "electionType">;
export type ElectionSearchOptions = Pick<OptionTypes, "electionType" | "electionDate">;

const PageRoute = 'Search/SearchByElection.aspx';

export const getElectionTypes = async (urlPathPrefix: string) => {
  return await getList({
    urlPathPrefix: urlPathPrefix,
    pageSuffix: PageRoute,
    optionSelector: OptionSelectors.electionType,
  });
}

export const getElectionDates = async (urlPathPrefix: string, options: GetElectionDatesOptions) => {
  return await getList({
    urlPathPrefix: urlPathPrefix,
    pageSuffix: PageRoute,
    optionSelector: OptionSelectors.electionDate,
    inputOptions: options,
  });
}

export const electionSearch = async (urlPathPrefix: string, options: ElectionSearchOptions) => {
  return await doSearchByPage({
    urlPathPrefix: urlPathPrefix,
    pageSuffix: PageRoute,
    inputOptions: options,
  });
}


export const election = {
  getElectionTypes,
  getElectionDates,
  search: electionSearch,
}
