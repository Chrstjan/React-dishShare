import { toast } from "react-toastify";
import type { UserInterface } from "../../../types/auth/user";

export const deleteIngredient = async (
  id: number,
  recipeId: number,
  user: UserInterface | null
) => {
  const resp = await fetch(
    `${import.meta.env.VITE_API_URL}/ingredient/${recipeId}/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.access_token}`,
      },
    }
  );

  const data = await resp.json();

  if (resp.ok) {
    toast.success(data?.message || "Ingredient removed from recipe");
  } else {
    toast.error(data.message || "Failed to remove ingredient from recipe");
  }

  return data;
};
