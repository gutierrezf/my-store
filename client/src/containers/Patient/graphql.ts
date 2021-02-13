import gql from "graphql-tag";

export const FIND_PATIENT = gql`
  query FindPatient($pid: Int!) {
    findPatient(id: $pid) {
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
