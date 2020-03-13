import React from "react";
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
  },
  {
    label: "",
    field: "edit"
  }
];

const getPatientsTableData = (
  patients: IPatient[],
  onEdit: (id: number) => void
) => {
  return {
    columns,
    rows: patients.map(patient => {
      return {
        ...patient,
        insured: patient.insured ? "SI" : "NO",
        edit: (
          <span className="link-like" onClick={() => onEdit(patient.id)}>
            <i className="fa fa-edit mr-2" />
            edit
          </span>
        )
      };
    })
  };
};
export default getPatientsTableData;
