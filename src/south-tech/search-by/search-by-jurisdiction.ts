
import { SearchByPagePaths } from "../constants/search-by-page-paths";
import { OptionSelectors } from "../constants/option-selectors";
import { getList } from "../pages/list-items";
import { doSearchByPage } from "../pages/search-by";
import { OptionTypes } from "../page-controls/apply-options.js";

export type FilingYearInput = Pick<OptionTypes, "filingYear">;
export type JurisdictionOptions = Pick<OptionTypes, "filingYear" | "jurisdiction">;

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
  });
}

export const jurisdictionSearch = async (urlPathPrefix: string, inputOptions: JurisdictionOptions) => {
  return await doSearchByPage({
    urlPathPrefix,
    pageSuffix: SearchByPagePaths.Jurisdiction,
    inputOptions,
  })// as SearchResponse<ByJurisdiction[]>;
}


export const jurisdiction = {
  getFilingYears,
  getJurisdictions,
  search: jurisdictionSearch,
}
