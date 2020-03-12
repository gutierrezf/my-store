import { IPatient } from "../../interfaces";

const columns = [
  {
    label: "Nombre",
    field: "name",
    sort: "asc",
    searchable: true
  },
  {
    label: "Email",
    field: "email",
    sort: "asc"
  },
  {
    label: "Dirección",
    field: "address"
  },
  {
    label: "Tel.",
    field: "phone"
  },
  {
    label: "Asegurado",
    field: "insured"
  }
];

const getPatientsTableData = (patients: IPatient[]) => {
  return {
    columns,
    rows: patients.map(patient => {
      return {
        ...patient,
        insured: patient.insured ? "SI" : "NO"
      };
    })
  };
};
export default getPatientsTableData;
