import type { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

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

  const userData = await resp.json();

  if (resp.ok) {
    toast.success("Login successfull");
  } else {
    toast.error("Failed to login user, try again");
  }

  return userData;
};
