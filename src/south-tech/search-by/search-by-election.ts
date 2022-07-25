import { Page } from "playwright";
import { setOption, validateOption } from "../page-controls/option-list";
import { OptionSelectors } from "../constants/option-selectors.js";
import { getList } from "../pages/list-items.js";
import { doSearchByPage } from "../pages/search-by";
import type { ElectionDate, ElectionType, UrlPrefixType } from "../types";

export type ElectionTypesInput = {
  urlPathPrefix: UrlPrefixType;
}

export type ElectionDatesInput = {
  urlPathPrefix: UrlPrefixType;
  electionType?: ElectionType
}

export type ElectionSearchInput = {
  urlPathPrefix: UrlPrefixType;
  electionType?: ElectionType
  electionDate?: ElectionDate
}

export type ElectionOptions = {
  electionType?: ElectionType
  electionDate?: ElectionDate
}

const PageRoute = 'Search/SearchByElection.aspx';

const setOptions = async (page: Page, options: ElectionOptions): Promise<void> => {
  const {electionType, electionDate} = options;

  if (electionType) {
    await validateOption(page, OptionSelectors.electionType, electionType);
    await setOption(page, OptionSelectors.electionType, electionType);
  }

  if (electionDate) {
    await validateOption(page, OptionSelectors.electionDate, electionDate);
    await setOption(page, OptionSelectors.electionDate, electionDate);
  }

}

export const getElectionTypes = async (input: ElectionTypesInput) => {
  const {urlPathPrefix} = input;

  return await getList({
    urlPathPrefix: urlPathPrefix,
    pageSuffix: PageRoute,
    optionSelector: OptionSelectors.electionType,
  });
}

export const getElectionDates = async (input: ElectionDatesInput) => {
  const {urlPathPrefix, electionType} = input;

  return await getList({
    urlPathPrefix: urlPathPrefix,
    pageSuffix: PageRoute,
    optionSelector: OptionSelectors.electionDate,
    inputOptions: {electionType},
    applyListOptions: setOptions,
  });
}

export const electionSearch = async (input: ElectionSearchInput) => {
  const {urlPathPrefix, electionDate, electionType} = input;
  return await doSearchByPage({
    urlPathPrefix: urlPathPrefix,
    pageSuffix: PageRoute,
    inputOptions: {electionDate, electionType},
    applySearchOptions: setOptions,
  });
}


export const election = {
  getElectionTypes,
  getElectionDates,
  search: electionSearch,
}
