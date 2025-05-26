import { useEffect, useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { ImagePreview } from "../ImagePreview/ImagePreview";
import { Modal } from "../Modal/Modal";
import { ImageSelect } from "../ImageSelect/ImageSelect";
import { FormInput } from "../FormInput/FormInput";
import s from "./UserForm.module.scss";
import { signUpValidation } from "../../lib/utils/auth/signUpValidation";

type UserFormType = {
  defaultValues?: FieldValues;
  submitType: (data: FieldValues) => void;
};

export const UserForm = ({ defaultValues, submitType }: UserFormType) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (defaultValues && defaultValues?.avatar.length > 2) {
      setImagePreview(defaultValues?.avatar);
    }
  }, [defaultValues]);

  return (
    <form onSubmit={handleSubmit(submitType)} className={s.formStyling}>
      <ImagePreview
        image={
          imagePreview && imagePreview?.length > 1
            ? imagePreview
            : "/images/blank-profile-picture.png"
        }
        type="avatar"
        action={() => setIsModalOpen((prev) => !prev)}
      />
      {isModalOpen ? (
        <Modal setIsModalOpen={setIsModalOpen}>
          <ImageSelect
            control={control}
            setValue={setValue}
            setImagePreview={setImagePreview}
            setIsModalOpen={setIsModalOpen}
          />
        </Modal>
      ) : null}
      <FormInput
        inputType="text"
        register={register}
        registerName="username"
        inputName="username"
        inputValidation={signUpValidation[2]}
        error={errors?.username?.message as string}
        defaultValues={defaultValues}
      />
      <span className={s.submitContainer}>
        <input type="submit" value="Update profile" />
      </span>
    </form>
  );
};
