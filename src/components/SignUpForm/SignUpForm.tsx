import { type Dispatch, type SetStateAction } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { FormInput } from "../FormInput/FormInput";
import { signUpValidation } from "../../lib/utils/auth/signUpValidation";
import { signUp } from "../../lib/actions/auth/signUp";
import s from "./SignUpForm.module.scss";

export const SignUpForm = ({
  setShowLoginForm,
}: {
  setShowLoginForm: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "all",
  });

  const handleFormSubmit = async (data: FieldValues) => {
    try {
      const res = await signUp(data);

      if (res.message == "Account created successfully") {
        reset();
      }
    } catch {}
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={s.formStyling}>
      <FormInput
        inputType="email"
        register={register}
        registerName="email"
        inputValidation={signUpValidation[0]}
        inputName="email"
        error={errors?.email?.message as string}
      />
      <FormInput
        inputType="password"
        register={register}
        registerName="password"
        inputValidation={signUpValidation[1]}
        inputName="password"
        error={errors?.password?.message as string}
      />
      <FormInput
        inputType="text"
        register={register}
        registerName="username"
        inputValidation={signUpValidation[2]}
        inputName="username"
        error={errors?.username?.message as string}
      />
      <span className={s.submitContainer}>
        <p>
          Already have an account?{" "}
          <span onClick={() => setShowLoginForm(true)}>click here</span> to
          login
        </p>
        <input type="submit" value="Sign Up" />
      </span>
    </form>
  );
};
