// search-by-filed-form.ts
import { Page } from "playwright";
import { doSearchByPage } from "../pages/search-by";
import { SearchByPagePaths } from "../constants/search-by-page-paths";
import { DatePickerElements, setDatePickerOption } from "../page-controls/date-picker";
import { OptionSelectors } from "../constants/option-selectors";
import { setOption, validateOption } from "../page-controls/option-list";
import { validateDate } from "../lib/validate-date";
import { getList } from "../pages/list-items";

export interface FormSearchOptions {
  form?: string
  fromDate?: string
  toDate?: string
}

const setOptions = async (page: Page, options: FormSearchOptions): Promise<void> => {
  const {form, fromDate, toDate} = options;

  if (form) {
    await validateOption(page, OptionSelectors.form, form);
    await setOption(page, OptionSelectors.form, form);
  }

  if (fromDate) {
    validateDate(DatePickerElements.fromDate, fromDate)
    await setDatePickerOption(page, DatePickerElements.fromDate, fromDate);
  }

  if (toDate) {
    validateDate(DatePickerElements.toDate, toDate)
    await setDatePickerOption(page, DatePickerElements.toDate, toDate);
  }

}

export const getForms = async (urlPathPrefix: string): Promise<string[]> => {
  return await getList({
    urlPathPrefix,
    pageSuffix: SearchByPagePaths.FiledForm,
    optionSelector: OptionSelectors.form,
  });
}

export const formSearch = async (urlPathPrefix: string, inputOptions: FormSearchOptions) => {
  return await doSearchByPage({
    urlPathPrefix,
    pageSuffix: SearchByPagePaths.FiledForm,
    inputOptions,
    applySearchOptions: setOptions,
  });
}


export const filedForm = {
  getForms,
  search: formSearch,
}
