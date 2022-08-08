
import { getList } from "../pages/get-list";
import { doSearchByPage } from "../pages/search-by";
import { SearchByPagePaths } from "../constants/search-by-page-paths";
import { OptionItemsCollection } from "../constants/option-selectors";
import { BallotItem } from "../pages/types-output";
import { OptionTypes } from "../pages/types-input";

export type ElectionDateInput = Pick<OptionTypes, "electionType">;
export type BallotItemInput = Pick<OptionTypes, "electionType" | "electionDate">;
export type BallotItemSearch = Pick<OptionTypes, "electionType" | "electionDate" | "ballotItem">;

const pageSuffix = SearchByPagePaths.BallotItem;

export const getElectionTypes = async (urlPathPrefix: string) => {
  return await getList({
    urlPathPrefix,
    pageSuffix,
    optionSelector: OptionItemsCollection.electionType,
  }) as string[];
}

export const getElectionDates = async (urlPathPrefix: string, inputOptions: ElectionDateInput) => {
  return await getList({
    urlPathPrefix,
    pageSuffix,
    optionSelector: OptionItemsCollection.electionDate,
    inputOptions,
  }) as string[];
}

export const getBallotItems = async (urlPathPrefix: string, inputOptions: BallotItemInput) => {
  return await getList({
    urlPathPrefix,
    pageSuffix,
    optionSelector: OptionItemsCollection.ballotItem,
    inputOptions,
  }) as BallotItem[];
}

export const ballotItemSearch = async (urlPathPrefix: string, inputOptions: BallotItemSearch) => {
  return await doSearchByPage({
    urlPathPrefix,
    pageSuffix,
    inputOptions,
  });
}


export const ballotItem = {
  getElectionTypes,
  getElectionDates,
  getBallotItems,
  search: ballotItemSearch,
}
