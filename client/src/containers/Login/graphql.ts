import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
  mutation($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
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

export const ME_QUERY = gql`
  {
    me {
      id
      email
      isAdmin
    }
  }
`;
