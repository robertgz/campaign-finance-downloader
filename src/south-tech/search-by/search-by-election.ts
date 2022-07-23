import { Page } from "playwright";
import { SearchByPagePaths } from "../constants/search-by-page-paths";
import { setOption, validateOption } from "../page-controls/option-list";
import { OptionSelectors } from "../constants/option-selectors.js";
import { getList } from "../pages/list-items.js";
import { doSearchByPage } from "../pages/search-by";

export interface ElectionTypeInput {
  /**
   * @examples 'Primary', 'General', 'Special', 'Recall'
   */
  electionType?: string
}

export interface ElectionOptions extends ElectionTypeInput {
  electionType?: string
  /**
   * @format m/d/yyyy
   * @examples '11/8/2022', '11/6/2018'
   */
  electionDate?: string
}
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

export const getElectionTypes = async (urlPathPrefix: string) => {
  return await getList({
    urlPathPrefix,
    pageSuffix: SearchByPagePaths.Election,
    optionSelector: OptionSelectors.electionType,
  });
}

export const getElectionDates = async (urlPathPrefix: string, inputOptions?: ElectionTypeInput) => {
  return await getList({
    urlPathPrefix,
    pageSuffix: SearchByPagePaths.Election,
    optionSelector: OptionSelectors.electionDate,
    inputOptions,
    applyListOptions: setOptions,
  });
}

export const electionSearch = async (urlPathPrefix: string, inputOptions: ElectionOptions) => {
  return await doSearchByPage({
    urlPathPrefix,
    pageSuffix: SearchByPagePaths.Election,
    inputOptions,
    applySearchOptions: setOptions,
  });
}


export const election = {
  getElectionTypes,
  getElectionDates,
  search: electionSearch,
}
