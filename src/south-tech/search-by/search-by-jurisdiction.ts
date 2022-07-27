
import { getList } from "../pages/list-items";
import { doSearchByPage } from "../pages/search-by";
import { SearchByPagePaths } from "../constants/search-by-page-paths";
import { OptionItemsCollection } from "../constants/option-selectors";
import type { OptionTypes } from "../page-controls/apply-options.js";

export type FilingYearInput = Pick<OptionTypes, "filingYear">;
export type JurisdictionOptions = Pick<OptionTypes, "filingYear" | "jurisdiction">;

const pageSuffix = SearchByPagePaths.Jurisdiction;

export const getFilingYears = async (urlPathPrefix: string) => {
  return await getList({
    urlPathPrefix,
    pageSuffix,
    optionSelector: OptionItemsCollection.filingYear,
  });
}

export const getJurisdictions = async (urlPathPrefix: string, filingYearInput: FilingYearInput) => {
  return await getList({
    urlPathPrefix,
    pageSuffix,
    optionSelector: OptionItemsCollection.jurisdiction,
    inputOptions: filingYearInput,
  });
}

export const jurisdictionSearch = async (urlPathPrefix: string, inputOptions: JurisdictionOptions) => {
  return await doSearchByPage({
    urlPathPrefix,
    pageSuffix,
    inputOptions,
  })// as SearchResponse<ByJurisdiction[]>;
}


export const jurisdiction = {
  getFilingYears,
  getJurisdictions,
  search: jurisdictionSearch,
}
