
import { getList } from "../pages/get-list.js";
import { doSearchByPage } from "../pages/search-by";
import { OptionItemsCollection } from "../constants/option-selectors.js";
import type { OptionTypes } from "../page-utils/apply-options.js";

export type GetElectionDatesOptions = Pick<OptionTypes, "electionType">;
export type ElectionSearchOptions = Pick<OptionTypes, "electionType" | "electionDate">;

const PageRoute = 'Search/SearchByElection.aspx';

export const getElectionTypes = async (urlPathPrefix: string) => {
  return await getList({
    urlPathPrefix: urlPathPrefix,
    pageSuffix: PageRoute,
    optionSelector: OptionItemsCollection.electionType,
  });
}

export const getElectionDates = async (urlPathPrefix: string, options: GetElectionDatesOptions) => {
  return await getList({
    urlPathPrefix: urlPathPrefix,
    pageSuffix: PageRoute,
    optionSelector: OptionItemsCollection.electionDate,
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
