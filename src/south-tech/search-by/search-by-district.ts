// search-by-district.ts

import { doSearchByPage } from "../pages/search-by";
import { SearchByPagePaths } from "../constants/search-by-page-paths";
import { OptionSelectors } from "../constants/option-selectors";
import { getList } from "../pages/list-items";
import type { OptionTypes } from "../page-controls/apply-options.js";

export type GetDistrictsOptions = Pick<OptionTypes, "filingYear">;
export type DistrictSearchOptions = Pick<OptionTypes, "filingYear" | "district">;

export const getFilingYears = async (urlPathPrefix: string): Promise<string[]> => {
  return await getList({
    urlPathPrefix,
    pageSuffix: SearchByPagePaths.District,
    optionSelector: OptionSelectors.filingYear,
  });
}

export const getDistricts = async (urlPathPrefix: string, inputOptions: GetDistrictsOptions): Promise<string[]> => {

  return await getList({
    urlPathPrefix,
    pageSuffix: SearchByPagePaths.District,
    optionSelector: OptionSelectors.district,
    inputOptions,
  });
}

export const districtSearch = async (urlPathPrefix: string, inputOptions: DistrictSearchOptions) => {
  return await doSearchByPage({
    urlPathPrefix,
    pageSuffix: SearchByPagePaths.District,
    inputOptions,
  });
}


export const district = {
  getFilingYears,
  search: districtSearch,
}
