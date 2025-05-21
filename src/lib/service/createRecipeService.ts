import type { FieldValues } from "react-hook-form";
import type { UserInterface } from "../types/auth/user";
import { CreateRecipe } from "../actions/recipe/createRecipe";
import { createImageRel } from "../actions/recipe/createImageRel";
import { createIngredient } from "../actions/recipe/createIngredient";
import { createInstruction } from "../actions/recipe/createInstruction";

export const submitRecipe = async (
  data: FieldValues,
  user: UserInterface | null
) => {
  const res = await CreateRecipe(data, user);
  const recipeData = await res.json();

  if (!res.ok || !recipeData?.data?.id) {
    throw new Error("Failed to create recipe");
  }

  const recipeId = recipeData?.data?.id;

  if (data?.image?.id) {
    await createImageRel(data?.image?.id, recipeId, user);
    for (const item of data?.ingredients || [])
      await createIngredient(item, recipeId, user);
    for (const item of data?.instructions || [])
      await createInstruction(item, recipeId, user);
  }

  return recipeData?.data;
};
