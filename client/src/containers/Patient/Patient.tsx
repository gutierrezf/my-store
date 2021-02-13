import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import { FIND_PATIENT } from "./graphql";
import { IPatient } from "../../interfaces";

export interface IGraphqlPatient {
  findPatient: IPatient;
}

const Patient = () => {
  const { id = "" } = useParams();
  const patientId = parseInt(id, 10);
  const { loading, data } = useQuery<IGraphqlPatient>(FIND_PATIENT, {
    variables: { pid: patientId },
  });

  if (loading) {
    return <h1>loading</h1>;
  }

  const patient = data?.findPatient;
  if (!patient) {
    return <h1>El paciente no existe.</h1>;
  }

  return (
    <>
      <div style={{ textAlign: "left" }}>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </>
  );
};

export default Patient;
