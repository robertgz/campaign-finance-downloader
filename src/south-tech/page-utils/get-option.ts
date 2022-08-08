
import { Page } from "playwright";
import { 
  InputItemCommon,
  InputItemMultiColumn,
  InputItemSingleColumn,
  InputOptionItem,
} from "../pages/types-input";
import { getOptionItem } from "../constants/get-option-item";
import { InputItemCategory } from "../constants/enums";
import { getMultiItemList } from "../page-controls/option-list-multi-column.js";
import { getOptionList } from "../page-controls/option-list.js";


export const getOptionFromInputOptionItem = async (page: Page, inputOption: InputOptionItem)  => {
  const inputItem = getOptionItem(inputOption);
  return await getOptionAny(page, inputItem);
}

export const getOptionAny = async (page: Page, option: InputItemCommon)  => {
  let result;

  const category = option.category;
  switch (category) {
    case InputItemCategory.SingleColumnList:
      result = await getOptionList(page, option as InputItemSingleColumn);
      break;
    case InputItemCategory.MultipleColumnList:
      result = await getMultiItemList(page, option as InputItemMultiColumn);
      break;
    // case InputItemCategory.DatePicker:
    //   break;
    // case InputItemCategory.Text:
    //   break;
    // case InputItemCategory.Checkbox:
    //   break;
    default:
  }

  return result;
}
