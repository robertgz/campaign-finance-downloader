
import { Page } from 'playwright';
import { doSearchByPage } from '../pages/search-by';
import { SearchByPagePaths } from "../constants/search-by-page-paths";
import { setOption, validateOption } from '../page-controls/option-list';
import { OptionSelectors } from '../constants/option-selectors';
import { getList } from '../pages/list-items';
import { setAllowPartialMatch } from '../page-controls/partial-match';
import { setInputText } from '../page-controls/input';

export interface CandidateLastNameSearch {
  filingYear?: string
  candidateLastName?: string
  allowPartialMatch?: boolean
}

const setOptions = async (page: Page, options: CandidateLastNameSearch): Promise<void> => {
  const {filingYear, candidateLastName, allowPartialMatch} = options;

  if (filingYear) {
    await validateOption(page, OptionSelectors.filingYear, filingYear);
    await setOption(page, OptionSelectors.filingYear, filingYear);
  }

  if (candidateLastName) {
    await setInputText(page, candidateLastName);
  }

  if (allowPartialMatch !== undefined) {
    await setAllowPartialMatch(page, allowPartialMatch);
  }
}

export const getFilingYears = async (urlPathPrefix: string): Promise<String[]> => {
  return await getList({
    urlPathPrefix,
    pageSuffix: SearchByPagePaths.CandidateLastName,
    optionSelector: OptionSelectors.filingYear,
  });
}

export const lastNameSearch = async (urlPathPrefix: string, inputOptions: CandidateLastNameSearch) => {
  return await doSearchByPage({
    urlPathPrefix,
    pageSuffix: SearchByPagePaths.CandidateLastName,
    inputOptions,
    applySearchOptions: setOptions,
  });
}

export const candidateLastName = {
  getFilingYears,
  search: lastNameSearch,
}
