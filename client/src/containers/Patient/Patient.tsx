import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import { FIND_PATIENT, FIND_RECORD_BY_PATIENT } from "./graphql";
import { IPatient } from "../../interfaces";

interface IGraphqlPatient {
  findPatient: IPatient;
}
interface IGraphqlRecord {
  findRecordByPatient: any;
}

interface ParamTypes {
  id?: string;
}

const Patient = () => {
  const { id = "" } = useParams<ParamTypes>();
  const patientId = parseInt(id, 10);
  const {
    loading: patientLoading,
    data: patientData,
  } = useQuery<IGraphqlPatient>(FIND_PATIENT, {
    variables: { pid: patientId },
  });

  const { data: recordData } = useQuery<IGraphqlRecord>(
    FIND_RECORD_BY_PATIENT,
    {
      variables: { pid: patientId },
    }
  );

  if (patientLoading) {
    return <h1>loading</h1>;
  }

  const patient = patientData?.findPatient;
  const record = recordData?.findRecordByPatient;

  if (!patient) {
    return <h1>El paciente no existe.</h1>;
  }

  return (
    <>
      <div style={{ textAlign: "left" }}>
        <pre>{JSON.stringify({ patient, record }, null, 2)}</pre>
      </div>
    </>
  );
};

export default Patient;
