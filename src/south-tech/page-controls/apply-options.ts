import { Page } from "playwright";
import { getOptionItem, OptionCollectionType, OptionItemsCollectionType } from "../constants/option-selectors";
import { setOption, validateOption } from "./option-list";

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

export const applyListOptions = async (page: Page, options: InputOption[]) => {
  for await (const {key, value} of options) {
    // await validateOption(page, getOptionItem(key), value);
    // await setOption(page, getOptionItem(key), value);
  }

}
