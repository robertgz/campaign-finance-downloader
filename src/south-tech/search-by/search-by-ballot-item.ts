
import { getList } from "../pages/list-items";
import { getMultiColumnList } from "../pages/list-items-multi.js";
import { doSearchByPage } from "../pages/search-by";
import { SearchByPagePaths } from "../constants/search-by-page-paths";
import { OptionItemsCollection } from "../constants/option-selectors";
import type { BallotItem } from "./output-types";
import type { OptionTypes } from "../page-controls/apply-options.js";

export type ElectionDateInput = Pick<OptionTypes, "electionType">;
export type BallotItemInput = Pick<OptionTypes, "electionType" | "electionDate">;
export type BallotItemSearch = Pick<OptionTypes, "electionType" | "electionDate" | "ballotItem">;

const pageSuffix = SearchByPagePaths.BallotItem;

export const getElectionTypes = async (urlPathPrefix: string): Promise<string[]> => {
  return await getList({
    urlPathPrefix,
    pageSuffix,
    optionSelector: OptionItemsCollection.electionType,
  });
}

export const getElectionDates = async (urlPathPrefix: string, inputOptions: ElectionDateInput): Promise<string[]> => {
  return await getList({
    urlPathPrefix,
    pageSuffix,
    optionSelector: OptionItemsCollection.electionDate,
    inputOptions,
  });
}

export const getBallotItems = async (urlPathPrefix: string, inputOptions: BallotItemInput): Promise<BallotItem[]> => {
  return await getMultiColumnList<BallotItemInput, BallotItem>({
    urlPathPrefix,
    pageSuffix,
    optionSelector: OptionItemsCollection.ballotItem,
    inputOptions,
  });
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
