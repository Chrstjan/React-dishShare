import { useForm, type FieldValues } from "react-hook-form";
import { FormInput } from "../FormInput/FormInput";
import s from "./CommentForm.module.scss";

type CommentFormType = {
  defaultValues?: FieldValues;
  submitType: (data: FieldValues) => void;
  message?: string;
};

export const CommentForm = ({
  defaultValues,
  submitType,
  message,
}: CommentFormType) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(submitType)} className={s.formStyling}>
      <FormInput
        inputType="text"
        register={register}
        registerName="subject"
        inputName="subject"
        error={errors?.subject?.message as string}
        defaultValues={defaultValues}
      />
      <FormInput
        inputType="textarea"
        register={register}
        registerName="content"
        inputName="content"
        error={errors?.content?.message as string}
        defaultValues={defaultValues}
      />
      <span className={s.submitContainer}>
        <input type="submit" value={message} />
      </span>
    </form>
  );
};
