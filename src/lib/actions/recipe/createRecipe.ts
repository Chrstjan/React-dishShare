import type { FieldValues } from "react-hook-form";
import type { UserInterface } from "../../types/auth/user";

export const CreateRecipe = async (
  data: FieldValues,
  user: UserInterface | null
) => {
  const {
    name,
    description,
    category,
    cuisine,
    preptime,
    cooktime,
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
    prep_time: preptime,
    cook_time: cooktime,
    servings: servings,
    calories: calories,
    carbs: carbs,
    fat: fat,
    protein: protein,
    difficulty_id: difficulty,
    rating: 0,
  };

  console.log(data);
  console.log(formData);

  const resp = await fetch(`${import.meta.env.VITE_API_URL}/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.access_token}`,
    },
    body: JSON.stringify(formData),
  });

  return resp;
};
