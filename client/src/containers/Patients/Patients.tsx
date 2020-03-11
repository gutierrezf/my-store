import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { MDBDataTable } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdbreact/dist/css/mdb.css";

import { FIND_PATIENTS } from "./graphql";
import Loading from "../../components/Loading";
import { IPatient } from "../../interfaces";

export interface IGraphqlPatients {
  patients: IPatient[];
}

const Patients = () => {
  const { loading, data } = useQuery<IGraphqlPatients>(FIND_PATIENTS);

  if (loading) return <Loading />;

  const patients = data?.patients || [];
  const tableData = {
    columns: [
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
        label: "Direccion",
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
    ],
    rows: patients
  };

  return (
    <div>
      <MDBDataTable
        striped
        bordered
        noBottomColumns={true}
        small
        responsive
        sortable
        paging={patients.length > 10}
        displayEntries={patients.length > 10}
        data={tableData}
      />
    </div>
  );
};

export default Patients;
