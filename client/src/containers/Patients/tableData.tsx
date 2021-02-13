import React from "react";
import { Link } from "react-router-dom";
import { IPatient } from "../../interfaces";

const columns = [
  {
    label: "Nombre",
    field: "name",
    sort: "asc",
    searchable: true,
  },
  {
    label: "Email",
    field: "email",
    sort: "asc",
  },
  {
    label: "Dirección",
    field: "address",
  },
  {
    label: "Tel.",
    field: "phone",
  },
  {
    label: "Asegurado",
    field: "insured",
  },
  {
    label: "",
    field: "edit",
  },
];

const getPatientsTableData = (
  patients: IPatient[],
  onEdit: (id: number) => void,
  isAdmin: Boolean = false
) => {
  return {
    columns,
    rows: patients.map((patient) => {
      return {
        ...patient,
        insured: patient.insured ? "SI" : "NO",
        edit: (
          <>
            <span className="link-like" onClick={() => onEdit(patient.id)}>
              <i className="fa fa-edit mr-2" />
              editar
            </span>
            {isAdmin && (
              <Link className="link-like ml-2" to={`patient/${patient.id}`}>
                <i className="fa fa-history mr-2" />
                Historial
              </Link>
            )}
          </>
        ),
      };
    }),
  };
};

export default getPatientsTableData;
