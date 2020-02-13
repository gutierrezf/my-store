import React, { useState } from "react";
import { render } from "react-dom";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

BigCalendar.momentLocalizer(moment);

const myEvents = [
  {
    title: "Carlos Perez",
    start: new Date(2020, 1, 13, 14, 0, 0, 0),
    end: new Date(2020, 1, 13, 14, 59, 0, 0),
    desc: "terapia"
  },
  {
    id: 6,
    title: "Meeting",
    start: new Date(2020, 1, 13, 10, 30, 0, 0),
    end: new Date(2020, 1, 13, 12, 30, 0, 0),
    desc: "Pre-meeting meeting, to prepare for the meeting"
  }
];

const App = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState(myEvents);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title) {
      setEvents([
        ...events,
        {
          start,
          end,
          title
        }
      ]);
    }
  };

  function Event({ event }) {
    return (
      <span>
        <strong>{event.title}</strong>
        {event.desc && ":  " + event.desc}
      </span>
    );
  }

  return (
    <div style={{ height: 900 }}>
      <BigCalendar
        selectable
        events={events}
        views={["month", "day"]}
        date={date}
        onNavigate={date => setDate(date)}
        onSelectEvent={event => alert(event.desc)}
        onSelectSlot={handleSelect}
        timeslots={1}
        step={30}
        dayLayoutAlgorithm={"no-overlap"}
        components={{
          event: Event,
          month: true
        }}
      />
    </div>
  );
};

render(<App />, document.getElementById("root"));
