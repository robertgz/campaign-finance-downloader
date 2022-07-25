import { Page } from "playwright";
import { SearchByPagePaths } from "../constants/search-by-page-paths";
import { setOption, validateOption } from "../page-controls/option-list";
import { OptionSelectors } from "../constants/option-selectors";
import { getList } from "../pages/list-items";
import { doSearchByPage } from "../pages/search-by";
import { ByJurisdiction, SearchResponse } from "./output-types.js";

export interface FilingYearInput {
  /**
   * @examples '2026', '2024', '2022'
   */
  filingYear?: string
}

export interface JurisdictionOptions extends FilingYearInput {
  filingYear?: string
  jurisdiction?: string
}

const setOptions = async (page: Page, options: JurisdictionOptions): Promise<void> => {
  const {filingYear, jurisdiction} = options;

  if (filingYear) {
    await validateOption(page, OptionSelectors.filingYear, filingYear);
    await setOption(page, OptionSelectors.filingYear, filingYear);
  }

  if (jurisdiction) {
    await validateOption(page, OptionSelectors.jurisdiction, jurisdiction);
    await setOption(page, OptionSelectors.jurisdiction, jurisdiction);
  }

}

export const getFilingYears = async (urlPathPrefix: string) => {
  return await getList({
    urlPathPrefix,
    pageSuffix: SearchByPagePaths.Jurisdiction,
    optionSelector: OptionSelectors.filingYear,
  });
}

export const getJurisdictions = async (urlPathPrefix: string, filingYearInput: FilingYearInput) => {
  return await getList({
    urlPathPrefix,
    pageSuffix: SearchByPagePaths.Jurisdiction,
    optionSelector: OptionSelectors.jurisdiction,
    inputOptions: filingYearInput,
    applyListOptions: setOptions,
  });
}

export const jurisdictionSearch = async (urlPathPrefix: string, inputOptions: JurisdictionOptions) => {
  return await doSearchByPage({
    urlPathPrefix,
    pageSuffix: SearchByPagePaths.Jurisdiction,
    inputOptions,
    applySearchOptions: setOptions,
  }) as SearchResponse<ByJurisdiction[]>;
}


export const jurisdiction = {
  getFilingYears,
  getJurisdictions,
  search: jurisdictionSearch,
}
