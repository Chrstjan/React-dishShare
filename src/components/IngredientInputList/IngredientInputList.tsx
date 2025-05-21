import {
  useFieldArray,
  type Control,
  type FieldValues,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import { FormInput } from "../FormInput/FormInput";
import s from "./IngredientInputList.module.scss";
import { listValidation } from "../../lib/utils/recipe/listValidation";

type IngredientInputListType = {
  control: Control<FieldValues>;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

export const IngredientInputList = ({
  control,
  register,
  errors,
}: IngredientInputListType) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  return (
    <>
      <div className={s.fieldsContainer}>
        <p>Ingredients</p>
        {fields?.map((item, index) => {
          return (
            <>
              <FormInput
                key={index || item?.id}
                inputType="text"
                register={register}
                registerName={`ingredients.${index}.name`}
                inputName="ingredient name"
                inputValidation={listValidation[0]}
                error={errors?.name?.message as string}
              />
              <FormInput
                key={index || item?.id}
                inputType="number"
                register={register}
                registerName={`ingredients.${index}.amount`}
                inputName="ingredient amount"
                inputValidation={listValidation[1]}
                error={errors?.amount?.message as string}
              />
              <p onClick={() => remove(index)}>Remove Ingredient</p>
            </>
          );
        })}
        <p onClick={() => append({})}>Add Ingredient</p>
      </div>
    </>
  );
};
