import React from "react";
import { Button, FormGroup, FormControl, FormCheck } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { IPatient } from "../../interfaces";

type FormData = IPatient;
export interface PatientFormProps {
  pushFormData: (data: FormData) => void;
}

const PatientForm = ({ pushFormData }: PatientFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<FormData>();

  const onSubmit = handleSubmit(patient => {
    pushFormData(patient);
  });

  return (
    <form className="pt-3" onSubmit={onSubmit}>
      <FormGroup controlId="name">
        <FormControl
          autoFocus
          placeholder="Nombre"
          name="name"
          type="text"
          ref={register}
        />
      </FormGroup>
      <FormGroup controlId="email">
        <FormControl
          placeholder="email"
          name="email"
          type="text"
          ref={register}
        />
      </FormGroup>
      <FormGroup controlId="address">
        <FormControl
          placeholder="Dirección"
          name="address"
          type="text"
          ref={register}
        />
      </FormGroup>
      <FormGroup controlId="phone">
        <FormControl
          placeholder="Tel."
          name="phone"
          type="text"
          ref={register}
        />
      </FormGroup>
      <FormGroup controlId="insured">
        <FormCheck
          name="insured"
          label="Asegurado"
          type="checkbox"
          ref={register}
        />
      </FormGroup>
      <Button variant="success" block disabled={isSubmitting} type="submit">
        Crear
      </Button>
    </form>
  );
};

export default PatientForm;
