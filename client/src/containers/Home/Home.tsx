import React from "react";
import MyCalendar, { IEvent } from "./calendar";

const myEvents: IEvent[] = [
  {
    title: "Carlos Perez",
    start: new Date(2020, 1, 13, 14, 0, 0, 0),
    end: new Date(2020, 1, 13, 14, 59, 0, 0),
    desc: "terapia"
  },
  {
    title: "Meeting",
    start: new Date(2020, 1, 13, 10, 30, 0, 0),
    end: new Date(2020, 1, 13, 12, 30, 0, 0),
    desc: "Pre-meeting meeting, to prepare for the meeting"
  }
];

export default function Home() {
  return (
    <div className="Home mt-5">
      <h1>Home Component</h1>
      <p>A simple note taking app</p>
      <MyCalendar events={myEvents} />
    </div>
  );
}
