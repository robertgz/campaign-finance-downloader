
import { getList } from "../pages/get-list";
import { doSearchByPage } from "../pages/search-by";
import { SearchByPagePaths } from "../constants/search-by-page-paths";
import { OptionItemsCollection, OptionTypes } from "../constants/option-selectors";

export type GetDistrictsOptions = Pick<OptionTypes, "filingYear">;
export type DistrictSearchOptions = Pick<OptionTypes, "filingYear" | "district">;

const pageSuffix = SearchByPagePaths.District;

export const getFilingYears = async (urlPathPrefix: string) => {
  return await getList({
    urlPathPrefix,
    pageSuffix,
    optionSelector: OptionItemsCollection.filingYear,
  }) as string[];
}

export const getDistricts = async (urlPathPrefix: string, inputOptions: GetDistrictsOptions) => {

  return await getList({
    urlPathPrefix,
    pageSuffix,
    optionSelector: OptionItemsCollection.district,
    inputOptions,
  }) as string[];
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
