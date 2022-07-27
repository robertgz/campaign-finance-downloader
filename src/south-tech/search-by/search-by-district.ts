
import { getList } from "../pages/list-items";
import { doSearchByPage } from "../pages/search-by";
import { SearchByPagePaths } from "../constants/search-by-page-paths";
import { OptionItemsCollection } from "../constants/option-selectors";
import type { OptionTypes } from "../page-controls/apply-options.js";

export type GetDistrictsOptions = Pick<OptionTypes, "filingYear">;
export type DistrictSearchOptions = Pick<OptionTypes, "filingYear" | "district">;

const pageSuffix = SearchByPagePaths.District;

export const getFilingYears = async (urlPathPrefix: string): Promise<string[]> => {
  return await getList({
    urlPathPrefix,
    pageSuffix,
    optionSelector: OptionItemsCollection.filingYear,
  });
}

export const getDistricts = async (urlPathPrefix: string, inputOptions: GetDistrictsOptions): Promise<string[]> => {

  return await getList({
    urlPathPrefix,
    pageSuffix,
    optionSelector: OptionItemsCollection.district,
    inputOptions,
  });
}

export const districtSearch = async (urlPathPrefix: string, inputOptions: DistrictSearchOptions) => {
  return await doSearchByPage({
    urlPathPrefix,
    pageSuffix,
    inputOptions,
  });
}


export const district = {
  getFilingYears,
  search: districtSearch,
}
