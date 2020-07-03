import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { MDBDataTable } from "mdbreact";
import { Modal, Button } from "react-bootstrap";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdbreact/dist/css/mdb.css";

import { FIND_USERS, CREATE_USER, EDIT_USER_ROLE } from "./graphql";
import Loading from "../../components/Loading";
import { IUser } from "../../interfaces";
import getUsersTableData from "./tableData";
import UserForm from "../../components/UserForm";

export interface IGraphqlUsers {
  users: IUser[];
}

const Users = () => {
  const { loading, data, refetch } = useQuery<IGraphqlUsers>(FIND_USERS);
  const [createUser] = useMutation(CREATE_USER);
  const [updateUserRole] = useMutation(EDIT_USER_ROLE);
  const [modalShow, setModalShow] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  const closeModal = () => setModalShow(false);
  const showModal = () => setModalShow(true);

  const handleFormSubmit = async (user: IUser) => {
    if (user.id) {
      await updateUserRole({
        variables: user,
      });
    } else {
      console.log(user);
      try {
        await createUser({
          variables: user,
        });
      } catch (error) {
        console.log(error);
      }
    }

    refetch();
    closeModal();
    setCurrentUser(undefined);
  };

  if (loading) return <Loading />;

  const users = data?.users || [];
  const tableData = getUsersTableData(users, (id: number) => {
    setCurrentUser(users.find((user) => user.id === id));
    showModal();
  });

  return (
    <div>
      <Button
        variant="primary"
        onClick={() => {
          setCurrentUser(undefined);
          showModal();
        }}
      >
        Crear nuevo Usuario
      </Button>

      <MDBDataTable
        striped
        bordered
        noBottomColumns={true}
        small
        responsive
        sortable
        paging={users.length > 10}
        displayEntries={users.length > 10}
        data={tableData}
      />

      <Modal size="lg" show={modalShow} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserForm pushFormData={handleFormSubmit} user={currentUser} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Users;
