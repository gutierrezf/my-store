import React from "react";
import {
  Button,
  FormGroup,
  FormControl,
  FormCheck,
  FormLabel,
} from "react-bootstrap";
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
    <form className="pt-3 text-left" onSubmit={onSubmit}>
      <FormGroup controlId="name">
        <FormLabel>Nombre</FormLabel>
        <FormControl autoFocus name="name" type="text" ref={register} />
      </FormGroup>
      <FormGroup controlId="email">
        <FormLabel>E-mail</FormLabel>
        <FormControl name="email" type="text" ref={register} />
      </FormGroup>
      <FormGroup controlId="address">
        <FormLabel>Dirección</FormLabel>
        <FormControl name="address" type="text" ref={register} />
      </FormGroup>
      <FormGroup controlId="phone">
        <FormLabel>Teléfono</FormLabel>
        <FormControl name="phone" type="text" ref={register} />
      </FormGroup>

      <FormGroup controlId="birthday">
        <FormLabel>Fecha de Nacimiento</FormLabel>
        <FormControl name="birthday" type="date" ref={register} />
      </FormGroup>

      <FormGroup controlId="gender">
        <FormLabel>Género</FormLabel>
        <FormCheck
          label="Masculino"
          type="radio"
          name="gender"
          value="m"
          id="m"
          ref={register}
        />
        <FormCheck
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
