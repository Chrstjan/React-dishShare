import type { FieldValues } from "react-hook-form";
import type { UserInterface } from "../../types/auth/user";
import { toast } from "react-toastify";

export const updateUser = async (
  data: FieldValues,
  user: UserInterface | null
) => {
  console.log(data);

  const { avatar, username } = { ...data };

  const formData = {
    avatar: avatar,
    username: username,
  };

  const resp = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.access_token}`,
    },
    body: JSON.stringify(formData),
  });

  const userData = await resp.json();

  if (resp.ok) {
    toast.success(userData.message || "User updated");
  } else {
    toast.error(userData.message || "Failed to update user");
  }

  return userData;
};
