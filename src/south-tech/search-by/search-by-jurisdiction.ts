
import { getList } from "../pages/get-list";
import { doSearchByPage } from "../pages/search-by";
import { SearchByPagePaths } from "../constants/search-by-page-paths";
import { OptionItemsCollection, OptionTypes } from "../constants/option-selectors";

export type FilingYearInput = Pick<OptionTypes, "filingYear">;
export type JurisdictionOptions = Pick<OptionTypes, "filingYear" | "jurisdiction">;

const pageSuffix = SearchByPagePaths.Jurisdiction;

export const getFilingYears = async (urlPathPrefix: string) => {
  return await getList({
    urlPathPrefix,
    pageSuffix,
    optionSelector: OptionItemsCollection.filingYear,
  }) as string[];
}

export const getJurisdictions = async (urlPathPrefix: string, filingYearInput: FilingYearInput) => {
  return await getList({
    urlPathPrefix,
    pageSuffix,
    optionSelector: OptionItemsCollection.jurisdiction,
    inputOptions: filingYearInput,
  }) as string[];
}

export const jurisdictionSearch = async (urlPathPrefix: string, inputOptions: JurisdictionOptions) => {
  return await doSearchByPage({
    urlPathPrefix,
    pageSuffix,
    inputOptions,
  });
}


export const jurisdiction = {
  getFilingYears,
  getJurisdictions,
  search: jurisdictionSearch,
}
