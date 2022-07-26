
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

/////////////////
type InputOptionItem = keyof OptionItemsCollectionType

export const getOptionItem = (key: InputOptionItem): OptionItemSingleColumn | OptionItemMultiColumn => {
  return OptionItemsCollection[key];
}

enum Columns {
  Single,
  Multiple,
}

export interface OptionItemCommon {
  name: string
  dropDownSelector: string
  columns: Columns
}

export interface OptionItemSingleColumn extends OptionItemCommon {
  listSelector: string  
}

export interface OptionItemMultiColumn extends OptionItemCommon {
  dataRowSelector: string
  headerRowSelector: string
}

export interface OptionItemsCollectionType {
  filingYear: OptionItemSingleColumn
  electionDate: OptionItemSingleColumn
  electionType: OptionItemSingleColumn
  jurisdiction: OptionItemSingleColumn
  district: OptionItemSingleColumn
  form: OptionItemSingleColumn
  ballotItem: OptionItemMultiColumn
}


export const OptionItemsCollection: OptionItemsCollectionType = {
  filingYear: {
    name: 'filingYear',
    listSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_Years_DDD_L_LBT',
    dropDownSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_Years_B-1',
    columns: Columns.Single,
  },
  electionDate: {
    name: 'electionDate',
    listSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_ElectionDate_DDD_L_LBT',
    dropDownSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_ElectionDate_B-1',
    columns: Columns.Single,
  },
  electionType: {
    name: 'electionType',
    listSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_ElectionType_DDD_L_LBT',
    dropDownSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_ElectionType_B-1',
    columns: Columns.Single,
  },
  jurisdiction: {
    name: 'jurisdiction',
    listSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_Jurisdiction_DDD_L_LBT ',
    dropDownSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_Jurisdiction_B-1',
    columns: Columns.Single,
  },
  district: {
    name: 'district',
    listSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_Districts_DDD_L_LBT',
    dropDownSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_Districts_B-1',
    columns: Columns.Single,
  },
  form: {
    name: 'form',
    listSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_Forms_DDD_L_LBT',
    dropDownSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_Forms_B-1',
    columns: Columns.Single,
  },
  ballotItem: {
    name: 'ballotList',
    dataRowSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_BallotItems_DDD_L_LBT',
    headerRowSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_BallotItems_DDD_L_H',
    dropDownSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_BallotItems_B-1',
    columns: Columns.Multiple,
  },
}
