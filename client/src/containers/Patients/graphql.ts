import gql from "graphql-tag";

export const FIND_PATIENTS = gql`
  {
    patients {
      id
      name
      email
      address
      phone
      insured
    }
  }
`;
