
import { getList } from "../pages/get-list";
import { doSearchByPage } from "../pages/search-by";
import { SearchByPagePaths } from "../constants/search-by-page-paths";
import { OptionItemsCollection, OptionTypes } from "../constants/option-selectors";

export type FormSearchOptions = Pick<OptionTypes, "form" | "formFromDate" | "formToDate">;

const pageSuffix = SearchByPagePaths.FiledForm;

export const getForms = async (urlPathPrefix: string)=> {
  return await getList({
    urlPathPrefix,
    pageSuffix,
    optionSelector: OptionItemsCollection.form,
  }) as string[];
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
