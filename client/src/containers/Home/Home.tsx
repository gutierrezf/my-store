import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useQuery } from "@apollo/react-hooks";
import Select from "react-select";

import MyCalendar, { IEvent, IEventTimeSlot } from "./calendar";
import { FIND_PATIENTS } from "../Patients/graphql";
import { IGraphqlPatients } from "../Patients/Patients";
import getSelectOptions, { ISelectOption } from "./selectOptions";

export default function Home() {
  const { data } = useQuery<IGraphqlPatients>(FIND_PATIENTS);
  const patients = data?.patients || [];

  const [modalShow, setModalShow] = useState(false);
  const [myEvents, setMyEvents] = useState<IEvent[]>([]);
  const [newDateRange, setNewDateRange] = useState<IEventTimeSlot | null>(null);

  const closeModal = () => setModalShow(false);
  const showModal = () => setModalShow(true);

  const onNewEvent = ({ startDate, endDate }: IEventTimeSlot) => {
    showModal();
    setNewDateRange({ startDate, endDate });
  };

  const handleChange = (selectedOption: ISelectOption) => {
    if (newDateRange && selectedOption) {
      setMyEvents([
        ...myEvents,
        {
          start: newDateRange!.startDate,
          title: selectedOption.label,
          end: newDateRange!.endDate
        }
      ]);
    }

    closeModal();
    setNewDateRange(null);
  };

  return (
    <div className="Home">
      <MyCalendar events={myEvents} onNewEvent={onNewEvent} />

      <Modal size="lg" show={modalShow} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Paciente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Select
            options={getSelectOptions(patients)}
            placeholder="Choose your option"
            onChange={value => {
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
