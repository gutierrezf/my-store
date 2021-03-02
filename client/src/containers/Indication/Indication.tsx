import React from "react";
import {
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Container,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

interface FormData {
  patient: string;
}

interface ParamTypes {
  name: string;
}

const Indication = () => {
  const { name = "" } = useParams<ParamTypes>();

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      patient: name,
    },
  });

  const onSubmit = handleSubmit(() => {
    if (window) {
      window.print();
    }
  });

  return (
    <Container fluid>
      <h2>Dr. Juan Francisco Matos</h2>
      <h5>Medico Fisiátra</h5>
      <p>
        C/ Garcia Godoy
        <br />
        Tel: (809) 555-5555
      </p>
      <form className="pt-3 text-left" onSubmit={onSubmit}>
        <FormGroup controlId="date">
          <FormLabel>Fecha</FormLabel>
          <FormControl name="date" type="date" ref={register} />
        </FormGroup>

        <FormGroup controlId="patient">
          <FormLabel>Paciente</FormLabel>
          <FormControl name="patient" type="text" ref={register} />
        </FormGroup>

        <FormGroup controlId="comments">
          <FormLabel>Receta</FormLabel>
          <FormControl name="comments" as="textarea" rows={12} ref={register} />
        </FormGroup>

        <Button variant="primary" block type="submit">
          Imprimir
        </Button>
      </form>
    </Container>
  );
};

export default Indication;
