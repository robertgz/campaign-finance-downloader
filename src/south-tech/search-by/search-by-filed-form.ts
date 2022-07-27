
import { getList } from "../pages/list-items";
import { doSearchByPage } from "../pages/search-by";
import { SearchByPagePaths } from "../constants/search-by-page-paths";
import { OptionItemsCollection } from "../constants/option-selectors";
import { OptionTypes } from "../page-controls/apply-options.js";

export type FormSearchOptions = Pick<OptionTypes, "form" | "formFromDate" | "formToDate">;

const pageSuffix = SearchByPagePaths.FiledForm;

export const getForms = async (urlPathPrefix: string): Promise<string[]> => {
  return await getList({
    urlPathPrefix,
    pageSuffix,
    optionSelector: OptionItemsCollection.form,
  });
}

export const formSearch = async (urlPathPrefix: string, inputOptions: FormSearchOptions) => {
  return await doSearchByPage({
    urlPathPrefix,
    pageSuffix,
    inputOptions,
  });
}


export const filedForm = {
  getForms,
  search: formSearch,
}
