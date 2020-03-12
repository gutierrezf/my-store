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

export const CREATE_PATIENT = gql`
  mutation(
    $name: String!
    $email: String!
    $address: String!
    $phone: String!
    $insured: Boolean!
  ) {
    createPatient(
      input: {
        name: $name
        email: $email
        address: $address
        phone: $phone
        insured: $insured
      }
    ) {
      id
      name
      email
      address
      phone
      insured
    }
  }
`;
