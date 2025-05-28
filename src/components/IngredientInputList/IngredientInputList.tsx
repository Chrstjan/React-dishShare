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
import { listValidation } from "../../lib/utils/recipe/listValidation";
import { deleteIngredient } from "../../lib/actions/recipe/ingredient/deleteIngredient";
import s from "./IngredientInputList.module.scss";

type IngredientInputListType = {
  control: Control<FieldValues>;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  updateForm: boolean;
  defaultValues: FieldValues | undefined;
};

export const IngredientInputList = ({
  control,
  register,
  errors,
  updateForm,
  defaultValues,
}: IngredientInputListType) => {
  const { user } = useContext(UserContext);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const handleDeleteIngredient = async (index: number) => {
    const ingredient = defaultValues?.ingredients?.[index];

    if (updateForm && ingredient && ingredient?.id) {
      const res = await deleteIngredient(
        ingredient?.id,
        defaultValues?.id,
        user
      );

      console.log(res);
    }
    remove(index);
  };

  const handleCreateNewIngredient = async () => {
    append({ name: "", amount: "" });
  };

  return (
    <>
      <div className={s.fieldsContainer}>
        <h3>Ingredients</h3>
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
                defaultValues={defaultValues}
              />
              <FormInput
                key={index || item?.id}
                inputType="text"
                register={register}
                registerName={`ingredients.${index}.amount`}
                inputName="ingredient amount"
                inputValidation={listValidation[1]}
                error={errors?.amount?.message as string}
                defaultValues={defaultValues}
              />
              <p
                onClick={() => {
                  !updateForm ? remove(index) : handleDeleteIngredient(index);
                }}
              >
                Remove Ingredient
              </p>
            </>
          );
        })}
        <p
          onClick={() =>
            !updateForm ? append({}) : handleCreateNewIngredient()
          }
        >
          Add Ingredient
        </p>
      </div>
    </>
  );
};
