
import { Page } from "playwright";
import { doSearchByPage } from "../pages/search-by";
import { SearchByPagePaths } from "../constants/search-by-page-paths";
import { setOption, validateOption } from "../page-controls/option-list";
import { OptionSelectors } from "../constants/option-selectors";
import { getList } from "../pages/list-items";
import { setAllowPartialMatch } from "../page-controls/partial-match";
import { setInputText } from '../page-controls/input';

export interface FilersNameSearch {
  filingYear?: string
  filerName?: string
  allowPartialMatch?: boolean
}

const setOptions = async (page: Page, options: FilersNameSearch): Promise<void> => {
  const {filingYear, filerName, allowPartialMatch } = options;

  if (filingYear) {
    await validateOption(page, OptionSelectors.filingYear, filingYear);
    await setOption(page, OptionSelectors.filingYear, filingYear);
  }

  if (filerName) {
    await setInputText(page, filerName);
  }

  if (allowPartialMatch !== undefined) {
    await setAllowPartialMatch(page, allowPartialMatch);
  }
}

export const getFilingYears = async (urlPathPrefix: string): Promise<String[]> => {
  return await getList({
    urlPathPrefix,
    pageSuffix: SearchByPagePaths.FilerName,
    optionSelector: OptionSelectors.filingYear,
  });
}

export const filersNameSearch = async (urlPathPrefix: string, inputOptions: FilersNameSearch) => {
  return await doSearchByPage({
    urlPathPrefix,
    pageSuffix: SearchByPagePaths.FilerName,
    inputOptions,
    applySearchOptions: setOptions,
  });
}


export const filersName = {
  getFilingYears,
  search: filersNameSearch,
}
