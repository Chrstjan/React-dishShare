import { toast } from "react-toastify";
import type { UserInterface } from "../../../types/auth/user";

export const updateIngredient = async (
  ingredient: { id: number; name: string; amount: string },
  recipeId: number,
  user: UserInterface | null
) => {
  const formData = {
    recipe_id: recipeId,
    id: ingredient.id,
    name: ingredient.name,
    amount: ingredient.amount,
  };

  const resp = await fetch(`${import.meta.env.VITE_API_URL}/ingredient`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.access_token}`,
    },
    body: JSON.stringify(formData),
  });

  const data = await resp.json();

  if (resp.ok) {
    toast.success(data?.message || "Ingredient updated for recipe");
  } else {
    toast.error(data.message || "Failed to update ingredient from recipe");
  }

  return data;
};
