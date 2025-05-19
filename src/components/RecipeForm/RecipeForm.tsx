import { useForm, type FieldValues } from "react-hook-form";
import { FormInput } from "../FormInput/FormInput";
import { createRecipeRelations } from "../../lib/utils/recipe/createRecipe";
import s from "./RecipeForm.module.scss";

export const RecipeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const handleFormSubmit = async (data: FieldValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <FormInput
        inputType="select"
        register={register}
        registerName="category"
        inputName="category"
        inputValidation={createRecipeRelations[0]}
        error={errors?.category?.message as string}
        endpoint="categories"
      />
      <FormInput
        inputType="select"
        register={register}
        registerName="cuisine"
        inputName="cuisine"
        inputValidation={createRecipeRelations[1]}
        error={errors?.cuisine?.message as string}
        endpoint="cuisine"
      />
      <FormInput
        inputType="select"
        register={register}
        registerName="difficulty"
        inputName="difficulty"
        inputValidation={createRecipeRelations[2]}
        error={errors?.difficulty?.message as string}
        endpoint="difficulty"
      />
      <span className={s.submitContainer}>
        <input type="submit" value="Create" />
      </span>
    </form>
  );
};
