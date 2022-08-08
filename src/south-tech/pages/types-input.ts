
import { InputItemCategory } from "../constants/enums"

export interface InputItemCommon {
  name: string
  category: InputItemCategory
}

export interface InputItemList extends InputItemCommon {
  dropDownSelector: string
}

export interface InputItemSingleColumn extends InputItemList {
  listSelector: string  
}

export interface InputItemMultiColumn extends InputItemList {
  dataRowSelector: string
  headerRowSelector: string
}

export interface InputItemDatePicker extends InputItemCommon {
  inputSelector: string
}

export interface InputItemText extends InputItemCommon {
  inputSelector: string
}

export interface InputItemCheckbox extends InputItemCommon {
  inputSelector: string
}

export interface OptionItemsCollectionType {
  filingYear: InputItemSingleColumn
  electionDate: InputItemSingleColumn
  electionType: InputItemSingleColumn
  jurisdiction: InputItemSingleColumn
  district: InputItemSingleColumn
  form: InputItemSingleColumn
  ballotItem: InputItemMultiColumn
  formFromDate: InputItemDatePicker
  formToDate: InputItemDatePicker
  allowPartialMatch: InputItemCheckbox
  filerName: InputItemText
  candidateLastName: InputItemText
}

export type InputOptionItem = keyof OptionItemsCollectionType

export interface InputOption {
  key: InputOptionItem;
  value: string;
}

export type OptionTypes = {
  [Property in InputOptionItem]?: string;
}
