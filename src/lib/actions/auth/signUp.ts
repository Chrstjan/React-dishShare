import type { FieldValues } from "react-hook-form";

export const signUp = async (data: FieldValues) => {
  const { email, password, username } = { ...data };

  const formData = {
    email: email,
    password: password,
    username: username,
  };

  const resp = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return resp;
};
