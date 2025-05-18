import { type Dispatch, type SetStateAction } from "react";
import { useForm, type FieldValues } from "react-hook-form";
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
  } = useForm({
    mode: "all",
  });

  const handleFormSubmit = async (data: FieldValues) => {
    const { email, password, username } = { ...data };

    const formData = {
      email: email,
      password: password,
      username: username,
    };

    try {
      const res = await fetch("https://dishshare.up.railway.app/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        console.error(res);
        throw new Error("Error in sign up with credentials");
      }

      const userData = await res.json();

      if (userData) {
        console.log("Sign up successfull", userData);
      }
    } catch (err: unknown | Error) {
      if (err instanceof Error) {
        console.error(`Error in sign up request: ${err.message}: ${err}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={s.formStyling}>
      <span className={s.inputContainer}>
        <label htmlFor="email">Email</label>
        <input
          {...register("email", {
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
          id="email"
          name="email"
        />
      </span>
      {errors.email ? <p>{errors?.email?.message as string}</p> : null}
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
      <span className={s.inputContainer}>
        <label htmlFor="username">Username</label>
        <input
          {...register("username", {
            required: "Username is required",
            pattern: {
              value: /^[A-Za-z\d@$!%*?&]{3,}$/,
              message: "Invalid username format",
            },
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters long",
            },
          })}
          type="text"
          id="username"
          name="username"
        />
      </span>
      {errors.username ? <p>{errors?.username?.message as string}</p> : null}
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
