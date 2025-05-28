import { toast } from "react-toastify";
import type { UserInterface } from "../../../types/auth/user";

export const createFavorite = async (
  recipeId: number,
  user: UserInterface | null
) => {
  const resp = await fetch(
    `${import.meta.env.VITE_API_URL}/favorites/${recipeId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.access_token}`,
      },
    }
  );

  const data = await resp.json();

  if (resp.ok) {
    toast.success(data.message || "Favorite created");
  } else {
    toast.error(data.message || "Failed to create favorite");
  }

  return data;
};
