import type { FieldValues } from "react-hook-form";
import type { UserInterface } from "../../types/auth/user";
import { toast } from "react-toastify";

export const CreateRecipe = async (
  data: FieldValues,
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
    name: name,
    description: description,
    category_id: category,
    cuisine_id: cuisine,
    prep_time: prep_time,
    cook_time: cook_time,
    servings: servings,
    calories: calories,
    carbs: carbs,
    fat: fat,
    protein: protein,
    difficulty_id: difficulty,
    rating: 0,
  };

  const resp = await fetch(`${import.meta.env.VITE_API_URL}/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.access_token}`,
    },
    body: JSON.stringify(formData),
  });

  const recipeData = await resp.json();

  if (resp.ok) {
    toast.success("Recipe created");
  } else {
    toast.error(recipeData.message || "Failed to create recipe");
  }

  return recipeData;
};
