import { IPatient } from "../../interfaces";

export interface ISelectOption {
  label: string;
  value: number;
}

const getSelectOptions = (patients: IPatient[]): ISelectOption[] =>
  patients.map(({ id, name }) => {
    return {
      label: name,
      value: id
    };
  });

export default getSelectOptions;
