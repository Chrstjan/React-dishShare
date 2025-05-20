import type { UserInterface } from "../../types/auth/user";

export const createIngredient = async (
  ingredient: { name: string; amount: string },
  recipeId: number,
  user: UserInterface | null
) => {
  const formData = {
    recipe_id: recipeId,
    name: ingredient.name,
    amount: ingredient.amount,
  };

  const resp = await fetch(`${import.meta.env.VITE_API_URL}/ingredient`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.access_token}`,
    },
    body: JSON.stringify(formData),
  });

  return resp;
};
