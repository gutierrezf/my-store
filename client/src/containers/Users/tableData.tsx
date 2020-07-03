import React from "react";
import { IUser } from "../../interfaces";

const columns = [
  {
    label: "Nombre",
    field: "email",
    sort: "asc",
    searchable: true,
  },
  {
    label: "Admin?",
    field: "isAdmin",
  },
  {
    label: "",
    field: "edit",
  },
];

const getUsersTableData = (users: IUser[], onEdit: (id: number) => void) => {
  return {
    columns,
    rows: users.map((user) => {
      return {
        ...user,
        isAdmin: user.isAdmin ? "SI" : "NO",
        edit: (
          <span className="link-like" onClick={() => onEdit(user.id)}>
            <i className="fa fa-edit mr-2" />
            edit
          </span>
        ),
      };
    }),
  };
};
export default getUsersTableData;
