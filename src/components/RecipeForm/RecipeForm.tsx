import type { ChosenImageInterface } from "../../lib/types/image/image";
import { useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { RecipeImageSelect } from "../RecipeImageSelect/RecipeImageSelect";
import { recipeFields } from "../../lib/utils/recipe/createRecipe";
import { FormInput } from "../FormInput/FormInput";
import { IngredientInputList } from "../IngredientInputList/IngredientInputList";
import { InstructionInputList } from "../InstructionInputList/InstructionInputList";
import s from "./RecipeForm.module.scss";

type RecipeFormType = {
  defaultValues?: FieldValues;
  submitType: (data: FieldValues) => void;
  message: string;
};

export const RecipeForm = ({
  defaultValues,
  submitType,
  message,
}: RecipeFormType) => {
  const [showImagesGallery, setShowImagesGallery] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<
    ChosenImageInterface | undefined
  >();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(submitType)} className={s.formStyling}>
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
      {recipeFields?.slice(0, 6)?.map((item) => {
        return (
          <FormInput
            inputType={item?.inputType}
            register={register}
            registerName={item?.registerName}
            inputName={item?.inputName}
            inputValidation={item?.validation}
            error={errors[item?.registerName]?.message as string}
            endpoint={item?.endpoint ? item?.endpoint : ""}
          />
        );
      })}
      <IngredientInputList
        control={control}
        register={register}
        errors={errors}
      />
      <InstructionInputList
        control={control}
        register={register}
        errors={errors}
      />
      {recipeFields?.slice(6, 12)?.map((item) => {
        return (
          <FormInput
            inputType={item?.inputType}
            register={register}
            registerName={item?.registerName}
            inputName={item?.inputName}
            inputValidation={item?.validation}
            error={errors[item?.registerName]?.message as string}
            endpoint={item?.endpoint ? item?.endpoint : ""}
          />
        );
      })}
      <span className={s.submitContainer}>
        <input type="submit" value={message} />
      </span>
    </form>
  );
};
