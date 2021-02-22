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

export const CREATE_RECORD = gql`
  mutation(
    $patientId: Int!
    $knownConditions: [String!]!
    $toxicRecord: [String!]!
    $medicRecord: String!
    $surgicalRecord: String!
    $allergies: String!
    $symptoms: String!
    $healthCondition: String!
    $physiatryEvaluation: String!
    $rightMotionArc: String!
    $leftMotionArc: String!
    $rightAnkylosis: String!
    $leftAnkylosis: String!
    $comments: String!
  ) {
    createRecord(
      input: {
        patientId: $patientId
        knownConditions: $knownConditions
        toxicRecord: $toxicRecord
        medicRecord: $medicRecord
        surgicalRecord: $surgicalRecord
        allergies: $allergies
        symptoms: $symptoms
        healthCondition: $healthCondition
        physiatryEvaluation: $physiatryEvaluation
        rightMotionArc: $rightMotionArc
        leftMotionArc: $leftMotionArc
        rightAnkylosis: $rightAnkylosis
        leftAnkylosis: $leftAnkylosis
        comments: $comments
      }
    ) {
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

export const UPDATE_RECORD = gql`
  mutation(
    $id: Int!
    $patientId: Int!
    $knownConditions: [String!]!
    $toxicRecord: [String!]!
    $medicRecord: String!
    $surgicalRecord: String!
    $allergies: String!
    $symptoms: String!
    $healthCondition: String!
    $physiatryEvaluation: String!
    $rightMotionArc: String!
    $leftMotionArc: String!
    $rightAnkylosis: String!
    $leftAnkylosis: String!
    $comments: String!
  ) {
    updateRecord(
      id: $id
      input: {
        patientId: $patientId
        knownConditions: $knownConditions
        toxicRecord: $toxicRecord
        medicRecord: $medicRecord
        surgicalRecord: $surgicalRecord
        allergies: $allergies
        symptoms: $symptoms
        healthCondition: $healthCondition
        physiatryEvaluation: $physiatryEvaluation
        rightMotionArc: $rightMotionArc
        leftMotionArc: $leftMotionArc
        rightAnkylosis: $rightAnkylosis
        leftAnkylosis: $leftAnkylosis
        comments: $comments
      }
    ) {
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
