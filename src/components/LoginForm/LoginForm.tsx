import { useContext, type Dispatch, type SetStateAction } from "react";
import { UserContext } from "../../context/UserContext";
import { useForm, type FieldValues } from "react-hook-form";
import { FormInput } from "../FormInput/FormInput";
import { loginValidation } from "../../lib/utils/auth/loginValidation";
import { useNavigate } from "react-router";
import { login } from "../../lib/actions/auth/login";
import s from "./LoginForm.module.scss";

export const LoginForm = ({
  setShowLoginForm,
}: {
  setShowLoginForm: Dispatch<SetStateAction<boolean>>;
}) => {
  const { loginUser } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  const navigate = useNavigate();

  const handleFormSubmit = async (data: FieldValues) => {
    const res = await login(data);

    if (res?.access_token && res?.access_token?.length > 0) {
      loginUser(res);
      navigate("/profile");
    } else {
      console.log(res);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={s.formStyling}>
        <FormInput
          inputType="email"
          register={register}
          registerName="username"
          inputValidation={loginValidation[0]}
          inputName="username"
          error={errors?.username?.message as string}
        />
        <FormInput
          inputType="password"
          register={register}
          registerName="password"
          inputValidation={loginValidation[1]}
          inputName="password"
          error={errors?.password?.message as string}
        />
        <span className={s.submitContainer}>
          <p>
            Don't have an account?{" "}
            <span onClick={() => setShowLoginForm(false)}>click here</span> to
            sign up
          </p>
          <input type="submit" value="Login" />
        </span>
      </form>
    </>
  );
};
