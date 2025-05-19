import type { FieldValues } from "react-hook-form";

export const login = async (data: FieldValues) => {
  const { username, password } = { ...data };

  const formData = {
    username: username,
    password: password,
  };

  const resp = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return resp;
};
