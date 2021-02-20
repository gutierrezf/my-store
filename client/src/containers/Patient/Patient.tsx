import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Accordion, Card } from "react-bootstrap";

import PatientForm from "../../components/PatientForm";
import RecordFrom from "../../components/RecordFrom";
import { FIND_PATIENT, FIND_RECORD_BY_PATIENT } from "./graphql";
import { UPDATE_PATIENT } from "../Patients/graphql";
import { IPatient, IRecord } from "../../interfaces";

interface IGraphqlPatient {
  findPatient: IPatient;
}
interface IGraphqlRecord {
  findRecordByPatient: IRecord;
}

interface ParamTypes {
  id?: string;
}

const Patient = () => {
  const { id = "" } = useParams<ParamTypes>();
  const patientId = parseInt(id, 10);

  const [updatePatient] = useMutation(UPDATE_PATIENT);

  const {
    loading: pIsLoading,
    data: patientData,
    refetch: refetchPatient,
  } = useQuery<IGraphqlPatient>(FIND_PATIENT, {
    variables: { pid: patientId },
  });

  const {
    data: recordData,
    loading: rIsLoading,
    refetch: refetchRecord,
  } = useQuery<IGraphqlRecord>(FIND_RECORD_BY_PATIENT, {
    variables: { pid: patientId },
  });

  if (pIsLoading || rIsLoading) {
    return <h1>loading</h1>;
  }

  const patient = patientData?.findPatient;
  const record = recordData?.findRecordByPatient;

  const handlePatientFormSubmit = async (formData: IPatient) => {
    if (formData.id) {
      await updatePatient({
        variables: formData,
      });
    }

    refetchPatient();
  };

  const handleRecordFormSubmit = async (formData: IRecord) => {
    console.log(formData);
    // if (formData.id) {
    //   await updatePatient({
    //     variables: formData,
    //   });
    // }

    // refetchRecord();
  };

  if (!patient) {
    return <h1>El paciente no existe.</h1>;
  }

  return (
    <>
      <Accordion defaultActiveKey="1">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Datos Generales
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <div className="m-auto" style={{ maxWidth: "700px" }}>
                <PatientForm
                  pushFormData={handlePatientFormSubmit}
                  patient={patient}
                />
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            Historial Medico
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <div className="m-auto" style={{ maxWidth: "700px" }}>
                <RecordFrom
                  pushFormData={handleRecordFormSubmit}
                  record={record}
                />
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

      <div style={{ textAlign: "left" }}>
        <pre>{JSON.stringify({ patient, record }, null, 2)}</pre>
      </div>
    </>
  );
};

export default Patient;
