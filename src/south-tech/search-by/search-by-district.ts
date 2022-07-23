// search-by-district.ts

import { Page } from "playwright";
import { doSearchByPage } from "../pages/search-by";
import { SearchByPagePaths } from "../constants/search-by-page-paths";
import { setOption, validateOption } from "../page-controls/option-list";
import { OptionSelectors } from "../constants/option-selectors";
import { getList } from "../pages/list-items";

export interface GetDistrictsOptions {
/**
 * @examples '2026', '2024', '2022'
 */
  filingYear?: string
}

export interface DistrictSearchOptions extends GetDistrictsOptions {
  filingYear?: string
  /**
   * Filter the results to a district.
   * Use getDistricts to determine a valid district
   */
  district?: string
}

const setOptions = async (page: Page, options: DistrictSearchOptions): Promise<void> => {
  const {filingYear, district} = options;

  if (filingYear) {
    await validateOption(page, OptionSelectors.filingYear, filingYear);
    await setOption(page, OptionSelectors.filingYear, filingYear);
  }

  if (district) {
    await validateOption(page, OptionSelectors.district, district);
    await setOption(page, OptionSelectors.district, district);
  }

}

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
    applyListOptions: setOptions,
  });
}

export const districtSearch = async (urlPathPrefix: string, inputOptions: DistrictSearchOptions) => {
  return await doSearchByPage({
    urlPathPrefix,
    pageSuffix: SearchByPagePaths.District,
    inputOptions,
    applySearchOptions: setOptions,
  });
}


export const district = {
  getFilingYears,
  search: districtSearch,
}
