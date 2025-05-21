import {
  useFieldArray,
  type Control,
  type FieldValues,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import { FormInput } from "../FormInput/FormInput";
import s from "./InstructionInputList.module.scss";
import { listValidation } from "../../lib/utils/recipe/listValidation";

type InstructionInputListType = {
  control: Control<FieldValues>;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

export const InstructionInputList = ({
  control,
  register,
  errors,
}: InstructionInputListType) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "instructions",
  });

  return (
    <>
      <div className={s.fieldsContainer}>
        <p>Instructions</p>
        {fields?.map((item, index) => {
          return (
            <>
              <FormInput
                key={index || item?.id}
                inputType="text"
                register={register}
                registerName={`instructions.${index}.step`}
                inputName="step"
                inputValidation={listValidation[2]}
                error={errors?.step?.message as string}
              />
              <p onClick={() => remove(index)}>Remove Instruction</p>
            </>
          );
        })}
        <p onClick={() => append({})}>Add Instruction</p>
      </div>
    </>
  );
};
