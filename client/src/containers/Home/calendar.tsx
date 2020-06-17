import React, { useState } from "react";
import { Calendar, momentLocalizer, View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.scss";

export interface IEvent {
  id: number;
  title: string;
  desc?: string;
  start: Date;
  end: Date;
}

interface EventProps {
  event: IEvent;
}

interface SlotInfo {
  start: Date | string;
  end: Date | string;
}
export interface IEventTimeSlot {
  startDate: Date;
  endDate: Date;
}

export interface MyCalendarProps {
  events: IEvent[];
  onNewEvent: (eventTime: IEventTimeSlot) => void;
}

const localizer = momentLocalizer(moment);

const Event = ({ event }: EventProps) => {
  return (
    <span>
      <strong>{event.title}</strong>
      {event.desc && ":  " + event.desc}
    </span>
  );
};

const MyCalendar = ({ events, onNewEvent }: MyCalendarProps) => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<View>("week");

  const handleSelect = ({ start, end }: SlotInfo) => {
    const startDate = new Date(start.toString());
    const endDate = new Date(end.toString());

    onNewEvent({ startDate, endDate });
  };

  return (
    <div style={{ height: 1200 }}>
      <Calendar
        localizer={localizer}
        selectable
        events={events}
        view={view}
        views={["week", "day"]}
        onView={(newView) => setView(newView)}
        date={date}
        onNavigate={(date) => setDate(date)}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
        timeslots={1}
        step={30}
        dayLayoutAlgorithm={"no-overlap"}
        min={new Date(0, 0, 0, 7, 30, 0, 0)}
        max={new Date(0, 0, 0, 18, 0, 0, 0)}
        components={{
          event: Event,
        }}
      />
    </div>
  );
};

export default MyCalendar;
