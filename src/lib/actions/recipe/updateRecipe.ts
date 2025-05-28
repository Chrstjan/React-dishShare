import type { FieldValues } from "react-hook-form";
import type { UserInterface } from "../../types/auth/user";
import { toast } from "react-toastify";

export const updateRecipe = async (
  data: FieldValues,
  id: number,
  user: UserInterface | null
) => {
  const {
    name,
    description,
    category,
    cuisine,
    prep_time,
    cook_time,
    servings,
    calories,
    carbs,
    fat,
    protein,
    difficulty,
  } = { ...data };

  const formData = {
    id: id,
    name: name,
    description: description,
    category_id: category.id,
    cuisine_id: cuisine.id,
    prep_time: prep_time,
    cook_time: cook_time,
    servings: servings,
    calories: calories,
    carbs: carbs,
    fat: fat,
    protein: protein,
    difficulty_id: difficulty | difficulty.id,
    rating: 0,
  };

  const resp = await fetch(`${import.meta.env.VITE_API_URL}/recipes`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.access_token}`,
    },
    body: JSON.stringify(formData),
  });

  const recipeData = await resp.json();

  if (resp.ok) {
    toast.success(recipeData?.message || "Recipe updated");
  } else {
    toast.error(recipeData.message || "Failed to update recipe");
  }

  return recipeData;
};
