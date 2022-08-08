import { Page } from "playwright";
import { 
  InputItemMultiColumn,
  InputItemSingleColumn,
  InputItemDatePicker,
  InputItemCheckbox,
  InputItemText,
  OptionTypes,
  InputOption,
} from "../pages/types-input";
import { getOptionItem } from "../constants/get-option-item";
import { InputItemCategory } from "../constants/enums";
import { setOption, validateOption } from "../page-controls/option-list";
import { setMultiColumnOption, validateMultiColumnOption } from "../page-controls/option-list-multi-column.js";
import { setAllowPartialMatch2 } from "../page-controls/partial-match.js";
import { setDatePickerOption, validateDate } from "../page-controls/date-picker.js";
import { setInputText } from "../page-controls/input.js";

// export interface InputOption {
//   key: keyof OptionItemsCollectionType;
//   value: string;
// }

// export type OptionTypes = {
//   [Property in keyof OptionItemsCollectionType]?: string;
// }

export const createGeneralInputOptions = (options: OptionTypes): InputOption[] => {
  return Object.entries(options).map(([key, value]) => ({key, value})) as InputOption[];
}

export const applyListOptions = async (page: Page, options: InputOption[]): Promise<void> => {
  for await (const {key, value} of options) {
    const option = getOptionItem(key);

    // change to a switch case
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
