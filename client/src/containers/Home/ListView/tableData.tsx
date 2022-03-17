import moment from "moment";
import { IEvent } from "../calendar";

const columns = [
  {
    label: "Nombre",
    field: "title",
    sort: "asc",
    searchable: true,
  },
  {
    label: "Fecha",
    field: "day",
    sort: "asc",
  },
  {
    label: "Hora",
    field: "time",
    sort: "asc",
  },
];

const getPatientsTableData = (appointments: IEvent[]) => {
  return {
    columns,
    rows: appointments.map((appointment) => ({
      ...appointment,
      day: moment(appointment?.start).format("LL"),
      time: `${moment(appointment?.start).format("LT")} - ${moment(
        appointment?.end
      ).format("LT")}`,
    })),
  };
};

export default getPatientsTableData;
