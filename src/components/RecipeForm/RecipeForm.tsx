import type { ChosenImageInterface } from "../../lib/types/image/image";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useForm, type FieldValues } from "react-hook-form";
import { RecipeImageSelect } from "../RecipeImageSelect/RecipeImageSelect";
import { FormInput } from "../FormInput/FormInput";
import { createRecipeRelations } from "../../lib/utils/recipe/createRecipe";
import { CreateRecipe } from "../../lib/actions/recipe/createRecipe";
import { createImageRel } from "../../lib/actions/recipe/createImageRel";
import { createIngredient } from "../../lib/actions/recipe/createIngredient";
import { createInstruction } from "../../lib/actions/recipe/createInstruction";
import s from "./RecipeForm.module.scss";

export const RecipeForm = () => {
  const { user } = useContext(UserContext);
  const [showImagesGallery, setShowImagesGallery] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<
    ChosenImageInterface | undefined
  >();
  const [ingredientFields, setIngredientFields] = useState<string[]>([]);
  const [instructionFields, setInstructionFields] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const addIngredientField = () => {
    setIngredientFields((prev) => [...prev, `${prev.length}`]);
  };

  const removeIngredientField = (index: number | string) => {
    setIngredientFields((prev) => prev.filter((item) => item !== index));
  };

  const addInstructionField = () => {
    setInstructionFields((prev) => [...prev, `${prev.length}`]);
  };

  const removeInstructionField = (index: number | string) => {
    setInstructionFields((prev) => prev.filter((item) => item !== index));
  };

  const handleFormSubmit = async (data: FieldValues) => {
    console.log(data);

    try {
      const res = await CreateRecipe(data, user);

      if (!res.ok) {
        console.error(res);
      }

      const recipeData = await res.json();

      if (recipeData && recipeData?.message == "201") {
        const recipeId = { ...recipeData?.data?.id };
        console.log("Recipe bitch", recipeId);

        if (selectedImage && selectedImage?.filename?.length > 0) {
          try {
            const res = await createImageRel(selectedImage?.id, recipeId, user);

            if (!res.ok) {
              console.error(res);
            }

            const imageData = await res.json();

            if (imageData) {
              console.log(imageData);
            }
          } catch (err: unknown | Error) {
            if (err instanceof Error) {
              console.error(
                `Error in creating recipe image request: ${err.message}: ${err}`
              );
            }
          }
        }

        if (
          Array.isArray(data?.ingredients) &&
          data?.ingredients?.length > 0 &&
          recipeId
        ) {
          for (const ingredient of data?.ingredients) {
            try {
              const res = await createIngredient(ingredient, recipeId, user);

              if (!res.ok) {
                console.error(res);
              }

              const ingredientData = await res.json();

              if (ingredientData) {
                console.log(ingredientData);
              }
            } catch (err: unknown | Error) {
              if (err instanceof Error) {
                console.error(
                  `Error in creating recipe ingredient request: ${err.message}: ${err}`
                );
              }
            }
          }
        }

        if (
          Array.isArray(data?.instructions) &&
          data?.instructions?.length > 0 &&
          recipeId
        ) {
          for (const instruction of data?.instructions) {
            try {
              const res = await createInstruction(instruction, recipeId, user);

              if (!res.ok) {
                console.error(res);
              }

              const instructionData = await res.json();

              if (instructionData) {
                console.log(instructionData);
              }
            } catch (err: unknown | Error) {
              if (err instanceof Error) {
                console.error(
                  `Error in creating recipe ingredient request: ${err.message}: ${err}`
                );
              }
            }
          }
        }
      }
    } catch (err: unknown | Error) {
      if (err instanceof Error) {
        console.error(
          `Error in creating recipe request: ${err.message}: ${err}`
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={s.formStyling}>
      <div className={s.imageContainer}>
        {selectedImage == undefined ? (
          <>
            <header>
              <h3>Add image</h3>
            </header>
            <span
              onClick={() => setShowImagesGallery((prev) => !prev)}
              className={s.image}
            >
              +
            </span>
          </>
        ) : null}
        {showImagesGallery && selectedImage == undefined ? (
          <RecipeImageSelect setSelectedImage={setSelectedImage} />
        ) : null}
        {selectedImage && selectedImage?.filename.length > 0 ? (
          <>
            <img src={selectedImage?.filename} />
            <span onClick={() => setSelectedImage(undefined)}>Remove</span>
          </>
        ) : null}
      </div>
      <FormInput
        inputType="text"
        register={register}
        registerName="name"
        inputName="name"
        error={errors?.name?.message as string}
      />
      <FormInput
        inputType="text"
        register={register}
        registerName="description"
        inputName="description"
        error={errors?.description?.message as string}
      />
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
        inputType="number"
        register={register}
        registerName="preptime"
        inputName="prep time"
        error={errors?.preptime?.message as string}
      />
      <FormInput
        inputType="number"
        register={register}
        registerName="cooktime"
        inputName="cook time"
        error={errors?.cooktime?.message as string}
      />
      <div className={s.fieldsContainer}>
        {ingredientFields && ingredientFields?.length > 0
          ? ingredientFields?.map((index) => (
              <>
                <FormInput
                  key={index}
                  inputType="text"
                  register={register}
                  registerName={`ingredients.${index}.name`}
                  inputName="ingredient name"
                />
                <FormInput
                  key={index}
                  inputType="number"
                  register={register}
                  registerName={`ingredients.${index}.amount`}
                  inputName="ingredient amount"
                />
                <p onClick={() => removeIngredientField(index)}>
                  Remove ingredient
                </p>
              </>
            ))
          : null}
        <p onClick={() => addIngredientField()}>Add ingredient</p>
      </div>
      <div className={s.fieldsContainer}>
        {instructionFields && instructionFields?.length > 0
          ? instructionFields?.map((index) => (
              <>
                <FormInput
                  key={index}
                  inputType="text"
                  register={register}
                  registerName={`instructions.step${index}`}
                  inputName="instruction"
                />
                <p onClick={() => removeInstructionField(index)}>
                  Remove instruction
                </p>
              </>
            ))
          : null}
        <p onClick={() => addInstructionField()}>Add instruction</p>
      </div>
      <FormInput
        inputType="number"
        register={register}
        registerName="servings"
        inputName="servings"
        error={errors?.servings?.message as string}
      />
      <FormInput
        inputType="number"
        register={register}
        registerName="calories"
        inputName="calories"
        error={errors?.calories?.message as string}
      />
      <FormInput
        inputType="number"
        register={register}
        registerName="carbs"
        inputName="carbs"
        error={errors?.carbs?.message as string}
      />
      <FormInput
        inputType="number"
        register={register}
        registerName="fat"
        inputName="fat"
        error={errors?.fat?.message as string}
      />
      <FormInput
        inputType="number"
        register={register}
        registerName="protein"
        inputName="protein"
        error={errors?.protein?.message as string}
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
