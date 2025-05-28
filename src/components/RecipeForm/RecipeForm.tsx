import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useForm, type FieldValues } from "react-hook-form";
import { Modal } from "../Modal/Modal";
import { ImagePreview } from "../ImagePreview/ImagePreview";
import { ImageSelect } from "../ImageSelect/ImageSelect";
import { recipeFields } from "../../lib/utils/recipe/createRecipe";
import { FormInput } from "../FormInput/FormInput";
import { IngredientInputList } from "../IngredientInputList/IngredientInputList";
import { InstructionInputList } from "../InstructionInputList/InstructionInputList";
import { deleteImageRel } from "../../lib/actions/recipe/imageRel/deleteImageRel";
import s from "./RecipeForm.module.scss";

type RecipeFormType = {
  defaultValues?: FieldValues;
  submitType: (data: FieldValues) => Promise<any>;
  message: string;
};

export const RecipeForm = ({
  defaultValues,
  submitType,
  message,
}: RecipeFormType) => {
  const { user } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    mode: "all",
    defaultValues: defaultValues,
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    if (defaultValues && defaultValues?.images?.length > 0) {
      console.log(defaultValues);

      setImagePreview(defaultValues?.images[0]?.image?.filename);
    }
  }, [defaultValues]);

  const handleRemoveImage = async () => {
    if (defaultValues && defaultValues?.images) {
      const res = await deleteImageRel(
        defaultValues?.images[0]?.id,
        defaultValues?.id,
        user
      );

      console.log(res);
      setImagePreview("");
    }
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await submitType(data);
      if (
        res.message == "201" ||
        res.data == "201" ||
        res.message == "Recipe updated successfully"
      ) {
        reset();
      }
    } catch {}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.formStyling}>
      {imagePreview?.length < 1 ? (
        <span onClick={() => setIsModalOpen((prev) => !prev)}>Add Image</span>
      ) : null}
      {isModalOpen ? (
        <Modal setIsModalOpen={setIsModalOpen}>
          <ImageSelect
            control={control}
            setImagePreview={setImagePreview}
            setIsModalOpen={setIsModalOpen}
          />
        </Modal>
      ) : null}
      {imagePreview?.length > 0 ? (
        <>
          <ImagePreview image={imagePreview} />
          <span onClick={() => handleRemoveImage()}>Remove Image</span>
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
