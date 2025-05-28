import { useForm, type FieldValues } from "react-hook-form";
import { FormInput } from "../FormInput/FormInput";
import s from "./CommentForm.module.scss";

type CommentFormType = {
  defaultValues?: FieldValues;
  submitType: (data: FieldValues) => Promise<any>;
  message?: string;
  onSuccess?: () => void;
};

export const CommentForm = ({
  defaultValues,
  submitType,
  message,
  onSuccess,
}: CommentFormType) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "all",
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await submitType(data);
      if (res.message == "Comment created") {
        reset();
        onSuccess?.();
      }
    } catch (err) {}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.formStyling}>
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
