
import { doSearchByPage } from "../pages/search-by";
import { SearchByPagePaths } from "../constants/search-by-page-paths";
import { OptionSelectors } from "../constants/option-selectors";
import { getList } from "../pages/list-items";
import { OptionTypes } from "../page-controls/apply-options.js";

export type FilersNameSearch2 = Pick<OptionTypes, "filingYear" | "filerName" | "allowPartialMatch">;

export const getFilingYears = async (urlPathPrefix: string): Promise<String[]> => {
  return await getList({
    urlPathPrefix,
    pageSuffix: SearchByPagePaths.FilerName,
    optionSelector: OptionSelectors.filingYear,
  });
}

export const filersNameSearch = async (urlPathPrefix: string, inputOptions: FilersNameSearch2) => {
  return await doSearchByPage({
    urlPathPrefix,
    pageSuffix: SearchByPagePaths.FilerName,
    inputOptions,
  });
}


export const filersName = {
  getFilingYears,
  search: filersNameSearch,
}
