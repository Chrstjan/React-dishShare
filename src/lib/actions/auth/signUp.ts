import type { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

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

  const userData = await resp.json();

  if (resp.ok) {
    toast.success(userData?.message || "Sign up successfull");
  } else {
    toast.error(userData.message || "Failed to sign up user, try again");
  }

  return userData;
};
