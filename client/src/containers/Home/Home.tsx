import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Select from "react-select";
import moment from "moment";

import MyCalendar, { IEvent, IEventTimeSlot } from "./calendar";
import { IAppointment } from "../../interfaces";
import { FIND_PATIENTS } from "../Patients/graphql";
import {
  FIND_APPOINTMENTS,
  CREATE_APPOINTMENT,
  DELETE_APPOINTMENT,
} from "./graphql";
import { IGraphqlPatients } from "../Patients/Patients";
import getSelectOptions, { ISelectOption } from "./selectOptions";

export interface IGraphqlAppointments {
  appointments: IAppointment[];
}

export default function Home() {
  const [createAppointment] = useMutation(CREATE_APPOINTMENT);
  const [deleteAppointment] = useMutation(DELETE_APPOINTMENT);
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

  const [showPatientsModal, setShowPatientsModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [newDateRange, setNewDateRange] = useState<IEventTimeSlot | null>(null);

  const onNewEvent = ({ startDate, endDate }: IEventTimeSlot) => {
    setShowPatientsModal(true);
    setNewDateRange({ startDate, endDate });
  };

  const onDeleteEvent = async () => {
    if (selectedEvent) {
      await deleteAppointment({
        variables: {
          id: selectedEvent.id,
        },
      });

      refetchAppointments();
      setShowAppointmentModal(false);
      setSelectedEvent(null);
    }
  };

  const onAppointmentSelected = (event: IEvent) => {
    setSelectedEvent(event);
    setShowAppointmentModal(true);
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

    setShowPatientsModal(false);
    setNewDateRange(null);
    refetchAppointments();
  };

  return (
    <div className="Home">
      <MyCalendar
        events={appointments}
        onNewEvent={onNewEvent}
        onSelectEvent={onAppointmentSelected}
      />

      <Modal
        size="lg"
        show={showPatientsModal}
        onHide={() => setShowPatientsModal(false)}
      >
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
          <Button
            variant="secondary"
            onClick={() => setShowPatientsModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        size="lg"
        show={showAppointmentModal}
        onHide={() => setShowAppointmentModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Detalle de Cita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{moment(selectedEvent?.start).format("LL")}</p>
          <p>
            <b>Paciente:</b> {selectedEvent?.title}
          </p>
          <p>
            {moment(selectedEvent?.start).format("LT")}
            {" - "}
            {moment(selectedEvent?.end).format("LT")}
          </p>
        </Modal.Body>
        <Modal.Footer className="border-top-0">
          <Button
            variant="secondary"
            onClick={() => setShowAppointmentModal(false)}
          >
            Close
          </Button>
          <Button variant="danger" onClick={onDeleteEvent}>
            Cancelar Cita
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
