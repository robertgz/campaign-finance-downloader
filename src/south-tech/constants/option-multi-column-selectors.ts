import { OptionItemMultiColumn } from "../page-controls/types"

export interface OptionMultiColumnCollectionType {
  ballot: OptionItemMultiColumn
}

export const OptionSelectorsMultiColumn: OptionMultiColumnCollectionType = {
  ballot: {
    name: 'ballotList',
    dataRowSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_BallotItems_DDD_L_LBT',
    headerRowSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_BallotItems_DDD_L_H',
    dropDownSelector: '#ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_BallotItems_B-1',
  },
}
