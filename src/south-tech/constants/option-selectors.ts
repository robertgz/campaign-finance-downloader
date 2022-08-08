
import { OptionItemsCollectionType } from "../pages/types-input";
import { InputItemCategory } from "./enums";

export const OptionItemsCollection: OptionItemsCollectionType = {
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
