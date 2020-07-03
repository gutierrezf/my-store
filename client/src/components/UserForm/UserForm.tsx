import React from "react";
import { Button, FormGroup, FormControl, FormCheck } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { IUser } from "../../interfaces";

type FormData = IUser;
export interface PatientFormProps {
  pushFormData: (data: FormData) => void;
  user?: IUser;
}

const PatientForm = ({ pushFormData, user }: PatientFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>({ defaultValues: user });

  const onSubmit = handleSubmit((formData) => {
    pushFormData({ ...user, ...formData });
  });

  const isUpdating = Boolean(user?.id);

  return (
    <form className="pt-3" onSubmit={onSubmit}>
      <FormGroup controlId="email">
        <FormControl
          placeholder="Usuario"
          name="email"
          type="text"
          ref={register}
          disabled={isUpdating}
        />
      </FormGroup>

      {isUpdating ? (
        <FormGroup controlId="isAdmin">
          <FormCheck
            name="isAdmin"
            label="Admin?"
            type="checkbox"
            ref={register}
          />
        </FormGroup>
      ) : (
        <FormGroup controlId="password">
          <FormControl
            placeholder="Contraseña"
            name="password"
            type="password"
            ref={register}
          />
        </FormGroup>
      )}

      <Button variant="success" block disabled={isSubmitting} type="submit">
        {isUpdating ? "Actualizar" : "Crear"}
      </Button>
    </form>
  );
};

export default PatientForm;
