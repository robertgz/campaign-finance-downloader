import { InputItemDatePicker } from "../constants/option-selectors.js";
import { DatePickerElement } from "../page-controls/date-picker";

export const validateDate = (item: DatePickerElement, date: string): void => {
  const isValid = !isNaN(Date.parse(date));

  if (!isValid) throw `Invalid  ${item.name} provided: ${date}`;
}

export const validateDate2 = (item: InputItemDatePicker, date: string): void => {
  const isValid = !isNaN(Date.parse(date));

  if (!isValid) throw `Invalid  ${item.name} provided: ${date}`;
}
