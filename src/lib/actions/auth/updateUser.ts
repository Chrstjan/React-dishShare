import type { FieldValues } from "react-hook-form";
import type { UserInterface } from "../../types/auth/user";

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

  const updateData = await resp.json();

  console.log(updateData);

  return updateData;
};
