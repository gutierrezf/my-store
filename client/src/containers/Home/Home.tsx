import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Select from "react-select";

import MyCalendar, { IEvent, IEventTimeSlot } from "./calendar";
import { IAppointment } from "../../interfaces";
import { FIND_PATIENTS } from "../Patients/graphql";
import {
  FIND_APPOINTMENTS,
  CREATE_APPOINTMENT,
  // UPDATE_APPOINTMENT,
} from "./graphql";
import { IGraphqlPatients } from "../Patients/Patients";
import getSelectOptions, { ISelectOption } from "./selectOptions";

export interface IGraphqlAppointments {
  appointments: IAppointment[];
}

export default function Home() {
  const [createAppointment] = useMutation(CREATE_APPOINTMENT);
  // const [updateAppointment] = useMutation(UPDATE_APPOINTMENT);
  const { data } = useQuery<IGraphqlPatients>(FIND_PATIENTS);
  const { data: appointmentData, refetch: refetchAppointments } = useQuery<
    IGraphqlAppointments
  >(FIND_APPOINTMENTS);

  const patients = data?.patients || [];
  const appointments =
    appointmentData?.appointments.map((appointment) => {
      const event: IEvent = {
        ...appointment,
        start: new Date(appointment.start.toString()),
        end: new Date(appointment.end.toString()),
      };
      return event;
    }) || [];

  const [modalShow, setModalShow] = useState(false);
  const [newDateRange, setNewDateRange] = useState<IEventTimeSlot | null>(null);

  const closeModal = () => setModalShow(false);
  const showModal = () => setModalShow(true);

  const onNewEvent = ({ startDate, endDate }: IEventTimeSlot) => {
    showModal();
    setNewDateRange({ startDate, endDate });
  };

  const handleChange = async (selectedOption: ISelectOption) => {
    if (newDateRange && selectedOption) {
      await createAppointment({
        variables: {
          start: newDateRange!.startDate.toString(),
          title: selectedOption.label,
          end: newDateRange!.endDate.toString(),
        },
      });
    }

    closeModal();
    setNewDateRange(null);
    refetchAppointments();
  };

  return (
    <div className="Home">
      <MyCalendar events={appointments} onNewEvent={onNewEvent} />

      <Modal size="lg" show={modalShow} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Paciente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Select
            options={getSelectOptions(patients)}
            placeholder="Seleccione un paciente"
            onChange={(value) => {
              handleChange(value as ISelectOption);
            }}
            isSearchable
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
}
