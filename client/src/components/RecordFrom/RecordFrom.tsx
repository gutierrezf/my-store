import React from "react";
import { Button, FormGroup, FormControl, FormCheck } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { IRecord } from "../../interfaces";

interface FormData extends IRecord {
  knownConditions: any;
}
export interface RecordFormProps {
  pushFormData: (data: FormData) => void;
  record?: IRecord;
}

const RecordForm = ({ pushFormData, record }: RecordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useForm<FormData>({
    defaultValues: {
      ...record,
      knownConditions: [
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
      ],
    },
  });

  const onSubmit = handleSubmit((formData) => {
    pushFormData({ ...record, ...formData });
  });

  return (
    <form className="pt-3" onSubmit={onSubmit}>
      <FormGroup controlId="name">
        <Controller
          as={Select}
          options={[
            { value: "chocolate", label: "Chocolate" },
            { value: "strawberry", label: "Strawberry" },
            { value: "vanilla", label: "Vanilla" },
          ]}
          name="knownConditions"
          isClearable
          isMulti
          control={control}
        />
      </FormGroup>

      <Button variant="success" block disabled={isSubmitting} type="submit">
        {record?.id ? "Actualizar" : "Crear"}
      </Button>
    </form>
  );
};

export default RecordForm;
