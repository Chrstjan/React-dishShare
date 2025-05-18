import { useContext, type Dispatch, type SetStateAction } from "react";
import { UserContext } from "../../context/UserContext";
import { useForm, type FieldValues } from "react-hook-form";
import { useNavigate } from "react-router";
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
    const { username, password } = { ...data };

    const formData = {
      username: username,
      password: password,
    };

    try {
      const res = await fetch("https://dishshare.up.railway.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Error in login with credentials");
      }

      const userData = await res.json();

      if (userData?.access_token && userData?.access_token?.length > 0) {
        loginUser(userData);
        navigate("/profile");
      }
    } catch (err: unknown | Error) {
      if (err instanceof Error) {
        console.error(`Error in login request: ${err.message}: ${err}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={s.formStyling}>
      <span className={s.inputContainer}>
        <label htmlFor="username">Email</label>
        <input
          {...register("username", {
            required: "Email is required",
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid email format",
            },
            minLength: {
              value: 8,
              message: "Email must be at least 8 characters long",
            },
          })}
          type="email"
          id="username"
          name="username"
        />
      </span>
      {errors.username ? <p>{errors?.username?.message as string}</p> : null}
      <span className={s.inputContainer}>
        <label htmlFor="password">Password</label>
        <input
          {...register("password", {
            required: "Password is required",
            pattern: {
              value: /^[A-Za-z\d@$!%*?&]{5,}$/,
              message: "Invalid password format",
            },
            minLength: {
              value: 5,
              message: "Password must be at least 5 characters",
            },
          })}
          type="password"
          id="password"
          name="password"
        />
      </span>
      {errors.password ? <p>{errors?.password?.message as string}</p> : null}
      <span className={s.submitContainer}>
        <p>
          Don't have an account?{" "}
          <span onClick={() => setShowLoginForm(false)}>click here</span> to
          sign up
        </p>
        <input type="submit" value="Login" />
      </span>
    </form>
  );
};
