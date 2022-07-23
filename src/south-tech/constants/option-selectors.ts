
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
