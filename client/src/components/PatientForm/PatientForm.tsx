import React from "react";
import { Button, FormGroup, FormControl, FormCheck } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { IPatient } from "../../interfaces";

type FormData = IPatient;
export interface PatientFormProps {
  pushFormData: (data: FormData) => void;
  patient?: IPatient;
}

const PatientForm = ({ pushFormData, patient }: PatientFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>({ defaultValues: { ...patient } });

  const onSubmit = handleSubmit((formData) => {
    pushFormData({ ...patient, ...formData });
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

      <FormGroup controlId="birthday">
        <FormControl
          placeholder="Fecha de Nacimiento"
          name="birthday"
          type="date"
          ref={register}
        />
      </FormGroup>

      <FormGroup controlId="gender">
        <FormCheck
          inline
          label="Masculino"
          type="radio"
          name="gender"
          value="m"
          id="m"
          ref={register}
        />
        <FormCheck
          inline
          label="Femenino"
          type="radio"
          name="gender"
          value="f"
          id="f"
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
        {patient?.id ? "Actualizar" : "Crear"}
      </Button>
    </form>
  );
};

export default PatientForm;
