import { InputOptionItem } from "../pages/types-input";
import { OptionItemsCollection } from "./option-selectors";

export const getOptionItem = (key: InputOptionItem) => {
  return OptionItemsCollection[key];
}
