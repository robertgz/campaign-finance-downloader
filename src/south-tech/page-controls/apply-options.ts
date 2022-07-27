import { Page } from "playwright";
import { getOptionItem, InputItemMultiColumn, OptionItemsCollectionType, InputItemSingleColumn, InputItemCategory, InputItemDatePicker, InputItemCheckbox, InputItemText } from "../constants/option-selectors";
import { setOption, validateOption } from "./option-list";
import { setMultiColumnOption, validateMultiColumnOption } from "./option-list-multi-column.js";
import { setAllowPartialMatch2 } from "./partial-match.js";
import { setDatePickerOption, validateDate } from "./date-picker.js";
import { setInputText } from "./input.js";

export interface InputOption {
  key: keyof OptionItemsCollectionType;
  value: string;
}

export type OptionTypes = {
  [Property in keyof OptionItemsCollectionType]?: string;
}

export const createGeneralInputOptions = (options: OptionTypes): InputOption[] => {
  return Object.entries(options).map(([key, value]) => ({key, value})) as InputOption[];
}

export const applyListOptions = async (page: Page, options: InputOption[]): Promise<void> => {
  for await (const {key, value} of options) {
    const option = getOptionItem(key);

    if (option.category === InputItemCategory.SingleColumnList) {
      await validateOption(page, option as InputItemSingleColumn, value);
      await setOption(page, option as InputItemSingleColumn, value);
    } else if (option.category === InputItemCategory.MultipleColumnList) {
      await validateMultiColumnOption(page, option as InputItemMultiColumn, value);
      await setMultiColumnOption(page, option as InputItemMultiColumn, value);
    } else if (option.category === InputItemCategory.DatePicker) {
      validateDate(option as InputItemDatePicker, value);
      await setDatePickerOption(page, option as InputItemDatePicker, value);
    } else if (option.category === InputItemCategory.Text) {
      await setInputText(page, option as InputItemText, value);
    } else if (option.category === InputItemCategory.Checkbox) {
      await setAllowPartialMatch2(page, option as InputItemCheckbox, value);
    }
  }

}
