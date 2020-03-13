import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { MDBDataTable } from "mdbreact";
import { Modal, Button } from "react-bootstrap";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdbreact/dist/css/mdb.css";

import { FIND_PATIENTS, CREATE_PATIENT, UPDATE_PATIENT } from "./graphql";
import Loading from "../../components/Loading";
import { IPatient } from "../../interfaces";
import getPatientsTableData from "./tableData";
import PatientForm from "../../components/PatientForm";

export interface IGraphqlPatients {
  patients: IPatient[];
}

const Patients = () => {
  const { loading, data, refetch } = useQuery<IGraphqlPatients>(FIND_PATIENTS);
  const [createPatient] = useMutation(CREATE_PATIENT);
  const [updatePatient] = useMutation(UPDATE_PATIENT);
  const [modalShow, setModalShow] = useState(false);
  const [currentPatient, setCurrentPatient] = useState<IPatient | undefined>(
    undefined
  );

  const closeModal = () => setModalShow(false);
  const showModal = () => setModalShow(true);

  const handleFormSubmit = async (patient: IPatient) => {
    if (patient.id) {
      await updatePatient({
        variables: patient
      });
    } else {
      await createPatient({
        variables: patient
      });
    }

    refetch();
    closeModal();
    setCurrentPatient(undefined);
  };

  if (loading) return <Loading />;

  const patients = data?.patients || [];
  const tableData = getPatientsTableData(patients, (id: number) => {
    setCurrentPatient(patients.find(patient => patient.id === id));
    showModal();
  });

  return (
    <div>
      <Button
        variant="primary"
        onClick={() => {
          setCurrentPatient(undefined);
          showModal();
        }}
      >
        Crear nuevo Paciente
      </Button>

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

      <Modal size="lg" show={modalShow} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Paciente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PatientForm
            pushFormData={handleFormSubmit}
            patient={currentPatient}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Patients;
