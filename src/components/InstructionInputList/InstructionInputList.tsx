import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
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
import { deleteInstruction } from "../../lib/actions/recipe/instruction/deleteInstruction";

type InstructionInputListType = {
  control: Control<FieldValues>;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  updateForm: boolean;
  defaultValues: FieldValues | undefined;
};

export const InstructionInputList = ({
  control,
  register,
  errors,
  updateForm,
  defaultValues,
}: InstructionInputListType) => {
  const { user } = useContext(UserContext);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "instructions",
  });

  const handleDeleteInstruction = async (index: number) => {
    const instruction = defaultValues?.instructions?.[index];

    if (updateForm && instruction && instruction?.id) {
      const res = await deleteInstruction(
        instruction?.id,
        defaultValues?.id,
        user
      );

      console.log(res);
    }
    remove(index);
  };

  const handleCreateNewInstruction = async () => {
    append({ step: "" });
  };

  return (
    <>
      <div className={s.fieldsContainer}>
        <h3>Instructions</h3>
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
                defaultValues={defaultValues}
              />
              <p
                onClick={() => {
                  !updateForm ? remove(index) : handleDeleteInstruction(index);
                }}
              >
                Remove Instruction
              </p>
            </>
          );
        })}
        <p
          onClick={() =>
            !updateForm ? append({}) : handleCreateNewInstruction()
          }
        >
          Add Ingredient
        </p>
      </div>
    </>
  );
};
