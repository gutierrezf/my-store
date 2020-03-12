import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { MDBDataTable } from "mdbreact";
import { Modal, Button } from "react-bootstrap";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdbreact/dist/css/mdb.css";

import { FIND_PATIENTS, CREATE_PATIENT } from "./graphql";
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
  const [modalShow, setModalShow] = useState(false);

  const closeModal = () => setModalShow(false);
  const showModal = () => setModalShow(true);

  const handleFormSubmit = async (patient: IPatient) => {
    await createPatient({
      variables: patient
    });

    refetch();
    closeModal();
  };

  if (loading) return <Loading />;

  const patients = data?.patients || [];
  const tableData = getPatientsTableData(patients);

  return (
    <div>
      <Button variant="primary" onClick={showModal}>
        Crear nuevo Paciente
      </Button>

      <Modal size="lg" show={modalShow} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Paciente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PatientForm pushFormData={handleFormSubmit} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

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
