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

export const FIND_RECORD_BY_PATIENT = gql`
  query FindRecordByPatient($pid: Int!) {
    findRecordByPatient(patientId: $pid) {
      id
      patientId
      knownConditions
      toxicRecord
      medicRecord
      surgicalRecord
      allergies
      symptoms
      healthCondition
      physiatryEvaluation
      rightMotionArc
      leftMotionArc
      rightAnkylosis
      leftAnkylosis
      comments
    }
  }
`;
