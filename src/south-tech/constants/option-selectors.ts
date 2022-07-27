
import { OptionItem } from "../page-controls/types"

export interface OptionCollectionType {
  filingYear: OptionItem
  electionDate: OptionItem
  electionType: OptionItem
  jurisdiction: OptionItem
  district: OptionItem
  form: OptionItem
}

export const OptionSelectors: OptionCollectionType = {
  filingYear: {
    name: 'filingYear',
    listSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_Years_DDD_L_LBT',
    dropDownSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_Years_B-1',
  },
  electionDate: {
    name: 'electionDate',
    listSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_ElectionDate_DDD_L_LBT',
    dropDownSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_ElectionDate_B-1',
  },
  electionType: {
    name: 'electionType',
    listSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_ElectionType_DDD_L_LBT',
    dropDownSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_ElectionType_B-1',
  },
  jurisdiction: {
    name: 'jurisdiction',
    listSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_Jurisdiction_DDD_L_LBT ',
    dropDownSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_Jurisdiction_B-1',
  },
  district: {
    name: 'district',
    listSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_Districts_DDD_L_LBT',
    dropDownSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_Districts_B-1',
  },
  form: {
    name: 'form',
    listSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_Forms_DDD_L_LBT',
    dropDownSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_Forms_B-1',
  },
}

/////// NEW //////////
export enum InputItemCategory {
  SingleColumnList,
  MultipleColumnList,
  DatePicker,
  Text,
  Checkbox,
}

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

export const getOptionItem = (key: InputOptionItem): InputItemSingleColumn | InputItemMultiColumn | InputItemDatePicker => {
  return OptionItemsCollection[key];
}

const OptionItemsCollection: OptionItemsCollectionType = {
  filingYear: {
    name: 'filingYear',
    listSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_Years_DDD_L_LBT',
    dropDownSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_Years_B-1',
    category: InputItemCategory.SingleColumnList,
  },
  electionDate: {
    name: 'electionDate',
    listSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_ElectionDate_DDD_L_LBT',
    dropDownSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_ElectionDate_B-1',
    category: InputItemCategory.SingleColumnList,
  },
  electionType: {
    name: 'electionType',
    listSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_ElectionType_DDD_L_LBT',
    dropDownSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_ElectionType_B-1',
    category: InputItemCategory.SingleColumnList,
  },
  jurisdiction: {
    name: 'jurisdiction',
    listSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_Jurisdiction_DDD_L_LBT ',
    dropDownSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_Jurisdiction_B-1',
    category: InputItemCategory.SingleColumnList,
  },
  district: {
    name: 'district',
    listSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_Districts_DDD_L_LBT',
    dropDownSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_Districts_B-1',
    category: InputItemCategory.SingleColumnList,
  },
  form: {
    name: 'form',
    listSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_Forms_DDD_L_LBT',
    dropDownSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_Forms_B-1',
    category: InputItemCategory.SingleColumnList,
  },
  ballotItem: {
    name: 'ballotList',
    dataRowSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_BallotItems_DDD_L_LBT',
    headerRowSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_BallotItems_DDD_L_H',
    dropDownSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_BallotItems_B-1',
    category: InputItemCategory.MultipleColumnList,
  },
  formFromDate: {
    name: 'fromDate',
    inputSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_Cal_FormDate_From_I',
    category: InputItemCategory.DatePicker,
  },
  formToDate: {
    name: 'toDate',
    inputSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_Cal_FormDate_To_I',
    category: InputItemCategory.DatePicker,
  },
  allowPartialMatch: {
    name: 'allowPartialMatch',
    inputSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_chbAllowPartialMatch_S_D',
    category: InputItemCategory.Checkbox,
  },
  filerName: {
    name: 'filerName',
    inputSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_txtFilerName_I',
    category: InputItemCategory.Text,
  },
  candidateLastName: {
    name: 'candidateLastName',
    inputSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_txtFilerName_I',
    category: InputItemCategory.Text,
  },
}
