
import { Page } from "playwright";
import { doSearchByPage } from "../pages/search-by";
import { SearchByPagePaths } from "../constants/search-by-page-paths";
import { setOption, validateOption } from "../page-controls/option-list";
import { getMultiColumnList } from "../pages/list-items-multi.js";
import { OptionSelectors } from "../constants/option-selectors";
import { setMultiColumnOption, validateMultiColumnOption } from "../page-controls/option-list-multi-column.js";
import { getList } from "../pages/list-items";
import { OptionSelectorsMultiColumn } from "../constants/option-multi-column-selectors";


export interface BallotItemSearch {
  electionType?: string
  electionDate?: string
  ballotItem?: string
}

export interface ElectionDateInput {
  electionType?: string
}

export interface BallotItemInput {
  electionType?: string
  electionDate?: string
}


const setOptions = async (page: Page, ballotItemSearch: BallotItemSearch): Promise<void> => {
  const {electionType, electionDate, ballotItem} = ballotItemSearch;

  if (electionType) {
    await validateOption(page, OptionSelectors.electionType, electionType);
    await setOption(page, OptionSelectors.electionType, electionType);
  }

  if (electionDate) {
    await validateOption(page, OptionSelectors.electionDate, electionDate);
    await setOption(page, OptionSelectors.electionDate, electionDate);
  }

  if (ballotItem) {
    await validateMultiColumnOption(page, OptionSelectorsMultiColumn.ballot, ballotItem);
    await setMultiColumnOption(page, OptionSelectorsMultiColumn.ballot, ballotItem);
  }
}

export const getElectionTypes = async (urlPathPrefix: string): Promise<string[]> => {
  return await getList({
    urlPathPrefix,
    pageSuffix: SearchByPagePaths.BallotItem,
    optionSelector: OptionSelectors.electionType,
  });
}

export const getElectionDates = async (urlPathPrefix: string, inputOptions: ElectionDateInput): Promise<string[]> => {
  return await getList({
    urlPathPrefix,
    pageSuffix: SearchByPagePaths.BallotItem,
    optionSelector: OptionSelectors.electionDate,
    inputOptions,
    applyListOptions: setOptions,
  });
}

export const getBallotItems = async (urlPathPrefix: string, inputOptions: BallotItemInput): Promise<string[]> => {

  return await getMultiColumnList({
    urlPathPrefix,
    pageSuffix: SearchByPagePaths.BallotItem,
    optionSelector: OptionSelectorsMultiColumn.ballot,
    inputOptions,
    applyListOptions: setOptions,
  });
}

export const ballotItemSearch = async (urlPathPrefix: string, inputOptions: BallotItemSearch) => {
  return await doSearchByPage({
    urlPathPrefix,
    pageSuffix: SearchByPagePaths.BallotItem,
    inputOptions,
    applySearchOptions: setOptions,
  });
}


export const ballotItem = {
  getElectionTypes,
  getElectionDates,
  getBallotItems,
  search: ballotItemSearch,
}
