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
      gender
      birthday
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
      gender
      birthday
    }
  }
`;

export const UPDATE_PATIENT = gql`
  mutation(
    $id: Int!
    $name: String!
    $email: String!
    $address: String!
    $phone: String!
    $insured: Boolean!
  ) {
    updatePatient(
      id: $id
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
      gender
      birthday
    }
  }
`;
