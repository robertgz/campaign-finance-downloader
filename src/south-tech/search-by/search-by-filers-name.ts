
import { getList } from "../pages/get-list";
import { doSearchByPage } from "../pages/search-by";
import { SearchByPagePaths } from "../constants/search-by-page-paths";
import { OptionItemsCollection, OptionTypes } from "../constants/option-selectors";

export type FilersNameSearch2 = Pick<OptionTypes, "filingYear" | "filerName" | "allowPartialMatch">;

const pageSuffix = SearchByPagePaths.FilerName;

export const getFilingYears = async (urlPathPrefix: string) => {
  return await getList({
    urlPathPrefix,
    pageSuffix,
    optionSelector: OptionItemsCollection.filingYear,
  }) as string[];
}

export const filersNameSearch = async (urlPathPrefix: string, inputOptions: FilersNameSearch2) => {
  return await doSearchByPage({
    urlPathPrefix,
    pageSuffix,
    inputOptions,
  });
}


export const filersName = {
  getFilingYears,
  search: filersNameSearch,
}
