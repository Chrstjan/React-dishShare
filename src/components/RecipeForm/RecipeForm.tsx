import { useEffect, useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { Modal } from "../Modal/Modal";
import { RecipeImageSelect } from "../RecipeImageSelect/RecipeImageSelect";
import { ImagePreview } from "../ImagePreview/ImagePreview";
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
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: defaultValues,
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    if (defaultValues && defaultValues?.images?.length > 0) {
      setImagePreview(defaultValues?.images[0]?.image?.filename);
    }
  }, [defaultValues]);

  return (
    <form onSubmit={handleSubmit(submitType)} className={s.formStyling}>
      {imagePreview?.length < 1 ? (
        <span onClick={() => setIsModalOpen((prev) => !prev)}>Add Image</span>
      ) : null}
      {isModalOpen ? (
        <Modal setIsModalOpen={setIsModalOpen}>
          <RecipeImageSelect
            control={control}
            setImagePreview={setImagePreview}
            setIsModalOpen={setIsModalOpen}
          />
        </Modal>
      ) : null}
      {imagePreview?.length > 0 ? (
        <>
          <ImagePreview image={imagePreview} />
          <span onClick={() => setImagePreview("")}>Remove Image</span>
        </>
      ) : null}

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
            defaultOption
            defaultValues={defaultValues}
          />
        );
      })}
      <IngredientInputList
        control={control}
        register={register}
        errors={errors}
        updateForm={defaultValues ? true : false}
        defaultValues={defaultValues}
      />
      <InstructionInputList
        control={control}
        register={register}
        errors={errors}
        updateForm={defaultValues ? true : false}
        defaultValues={defaultValues}
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
            defaultOption
            defaultValues={defaultValues}
          />
        );
      })}
      <span className={s.submitContainer}>
        <input type="submit" value={message} />
      </span>
    </form>
  );
};
