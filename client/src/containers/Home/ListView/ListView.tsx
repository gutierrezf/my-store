import React, { useMemo } from "react";
import { MDBDataTable } from "mdbreact";
import { IEvent } from "../calendar";
import getAgendaListTableData from "./tableData";

export interface ListViewProps {
  appointments: IEvent[];
}

const ListView = ({ appointments }: ListViewProps) => {
  const tableData = useMemo(
    () => getAgendaListTableData(appointments),
    [appointments]
  );

  console.log(appointments);

  return (
    <div className="AgendaListView">
      <MDBDataTable
        striped
        bordered
        noBottomColumns={true}
        small
        responsive
        sortable
        paging={appointments.length > 10}
        displayEntries={appointments.length > 10}
        data={tableData}
      />
    </div>
  );
};

export default ListView;
