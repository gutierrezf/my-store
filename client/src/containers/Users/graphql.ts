import gql from "graphql-tag";

export const FIND_USERS = gql`
  {
    users {
      email
      id
      isAdmin
    }
  }
`;

export const CREATE_USER = gql`
  mutation($email: String!, $password: String!) {
    register(input: { email: $email, password: $password }) {
      user {
        id
        email
        isAdmin
      }
      errors {
        path
        message
      }
    }
  }
`;

export const EDIT_USER_ROLE = gql`
  mutation($email: String!, $isAdmin: Boolean!) {
    updateUserRole(input: { email: $email, isAdmin: $isAdmin }) {
      user {
        id
        email
        isAdmin
      }
      errors {
        path
        message
      }
    }
  }
`;
