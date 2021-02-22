import React from "react";
import {
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  FormCheck,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { IRecord } from "../../interfaces";

type FormData = IRecord;
export interface RecordFormProps {
  pushFormData: (data: FormData) => void;
  record?: IRecord;
}

const toxicGroups = [
  ["Alcohol", "Medicamentos dormir"],
  ["Café", "Cigarrillos"],
];

const issueGroups = [
  [
    "Pérdida Apetito",
    "Fatiga",
    "Taquicardia",
    "Dolor de pecho",
    "Dific. respirar",
    "Asma",
    "Enficema",
    "HTA",
    "Mareos",
    "Várices",
    "Diabetes",
  ],
  [
    "Debilidad Muscular",
    "Temblor",
    "Dolor articular",
    "Osteoporosis",
    "Ansiedad",
    "Depresión",
    "Irritabilidad",
    "Dific. dormir",
    "Gatritis",
    "Constipación",
    "Diarrea",
  ],
  [
    "Trauma Craneal",
    "Pérdidca equilibrio",
    "Desorientación",
    "Transtornos Memoria",
    "Convulciones",
    "Dificultadad orientación",
    "Dificultadad oír",
    "Dificultadad ver de lejos",
    "Dificultadad ver de cerca",
    "Ortesis",
    "Prótesis",
  ],
];

const RecordForm = ({ pushFormData, record }: RecordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      ...record,
    },
  });

  const onSubmit = handleSubmit((formData) => {
    pushFormData({ ...record, ...formData });
  });

  return (
    <Container fluid>
      <form className="pt-3 text-left" onSubmit={onSubmit}>
        <FormGroup controlId="knownConditions">
          <FormLabel>Antecedentes</FormLabel>
          <Row>
            {issueGroups.map((optionGroup, index) => (
              <Col key={`issues-${index}`}>
                {optionGroup.map((option) => (
                  <FormCheck
                    type="checkbox"
                    name="knownConditions"
                    label={option}
                    value={option}
                    id={option}
                    key={option}
                    ref={register}
                  />
                ))}
              </Col>
            ))}
          </Row>
        </FormGroup>

        <FormGroup controlId="medicRecord">
          <FormLabel>Antecedentes Médicos</FormLabel>
          <FormControl
            name="medicRecord"
            as="textarea"
            rows={5}
            ref={register}
          />
        </FormGroup>

        <FormGroup controlId="surgicalRecord">
          <FormLabel>Antecedentes Quirúrgicos</FormLabel>
          <FormControl
            name="surgicalRecord"
            as="textarea"
            rows={5}
            ref={register}
          />
        </FormGroup>

        <FormGroup controlId="toxicRecord">
          <FormLabel>Antecedentes Tóxicos</FormLabel>
          <Row>
            {toxicGroups.map((optionGroup, index) => (
              <Col key={`toxic-${index}`}>
                {optionGroup.map((option) => (
                  <FormCheck
                    type="checkbox"
                    name="toxicRecord"
                    label={option}
                    value={option}
                    id={option}
                    key={option}
                    ref={register}
                  />
                ))}
              </Col>
            ))}
          </Row>
        </FormGroup>

        <FormGroup controlId="allergies">
          <FormLabel>Alergias</FormLabel>
          <FormControl name="allergies" as="textarea" rows={5} ref={register} />
        </FormGroup>

        <FormGroup controlId="symptoms">
          <FormLabel>Síntomas o signos de presentación</FormLabel>
          <FormControl name="symptoms" as="textarea" rows={5} ref={register} />
        </FormGroup>

        <FormGroup controlId="healthCondition">
          <FormLabel>Historia de Condición de Salud Actual</FormLabel>
          <FormControl
            name="healthCondition"
            as="textarea"
            rows={5}
            ref={register}
          />
        </FormGroup>

        <FormGroup controlId="physiatryEvaluation">
          <FormLabel>Evaluacion Fisiatría</FormLabel>
          <FormControl
            name="physiatryEvaluation"
            as="textarea"
            rows={5}
            ref={register}
          />
        </FormGroup>

        <Row>
          <Col>
            <FormGroup controlId="rightMotionArc">
              <FormLabel>Arco de Movimiento Derecho</FormLabel>
              <FormControl
                name="rightMotionArc"
                as="textarea"
                rows={5}
                ref={register}
              />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup controlId="leftMotionArc">
              <FormLabel>Arco de Movimiento Izquierdo</FormLabel>
              <FormControl
                name="leftMotionArc"
                as="textarea"
                rows={5}
                ref={register}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            <FormGroup controlId="rightAnkylosis">
              <FormLabel>Anquilosis Derecho</FormLabel>
              <FormControl
                name="rightAnkylosis"
                as="textarea"
                rows={5}
                ref={register}
              />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup controlId="leftAnkylosis">
              <FormLabel>Anquilosis Izquierdo</FormLabel>
              <FormControl
                name="leftAnkylosis"
                as="textarea"
                rows={5}
                ref={register}
              />
            </FormGroup>
          </Col>
        </Row>

        <FormGroup controlId="comments">
          <FormLabel>Comentarios</FormLabel>
          <FormControl name="comments" as="textarea" rows={5} ref={register} />
        </FormGroup>

        <Button variant="success" block disabled={isSubmitting} type="submit">
          {record?.id ? "Actualizar" : "Crear"}
        </Button>
      </form>
    </Container>
  );
};

export default RecordForm;
