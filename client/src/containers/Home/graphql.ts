import gql from "graphql-tag";

export const FIND_APPOINTMENTS = gql`
  {
    appointments {
      id
      title
      start
      end
    }
  }
`;

export const CREATE_APPOINTMENT = gql`
  mutation($title: String!, $start: String!, $end: String!) {
    createAppointment(input: { title: $title, start: $start, end: $end }) {
      id
      title
      start
      end
    }
  }
`;

export const UPDATE_APPOINTMENT = gql`
  mutation($id: Int!, $title: String!, $start: String!, $end: String!) {
    updateAppointment(
      id: $id
      input: { title: $title, start: $start, end: $end }
    ) {
      id
      title
      start
      end
    }
  }
`;

export const DELETE_APPOINTMENT = gql`
  mutation($id: Int!) {
    deleteAppointment(id: $id) {
      id
      title
      start
      end
    }
  }
`;
