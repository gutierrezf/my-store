import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Accordion, Card, Breadcrumb } from "react-bootstrap";

import PatientForm from "../../components/PatientForm";
import RecordFrom from "../../components/RecordFrom";
import {
  FIND_PATIENT,
  FIND_RECORD_BY_PATIENT,
  CREATE_RECORD,
  UPDATE_RECORD,
} from "./graphql";
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
  const [updateRecord] = useMutation(UPDATE_RECORD);
  const [createRecord] = useMutation(CREATE_RECORD);

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
    formData.patientId = parseInt(id, 10);
    if (formData.id) {
      await updateRecord({
        variables: formData,
      });
    } else {
      await createRecord({
        variables: formData,
      });
    }

    refetchRecord();
  };

  if (!patient) {
    return <h1>El paciente no existe.</h1>;
  }

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="/patients">Pacientes</Breadcrumb.Item>
        <Breadcrumb.Item active>{patient.name}</Breadcrumb.Item>
      </Breadcrumb>
      <Link
        className="nav-link btn btn-primary"
        to={`/indication/${patient.name}`}
      >
        Recéta
      </Link>
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
              <Link
                className="nav-link btn btn-primary"
                to={`/indication/${patient.name}`}
              >
                Recéta
              </Link>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
};

export default Patient;
