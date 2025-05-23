import type { FieldValues } from "react-hook-form";
import type { UserInterface } from "../../types/auth/user";

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

  console.log(data);
  console.log(formData);

  const resp = await fetch(`${import.meta.env.VITE_API_URL}/recipes/${id}`, {
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
