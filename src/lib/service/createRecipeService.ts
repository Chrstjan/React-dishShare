import type { FieldValues } from "react-hook-form";
import type { UserInterface } from "../types/auth/user";
import { CreateRecipe } from "../actions/recipe/createRecipe";
import { createImageRel } from "../actions/recipe/imageRel/createImageRel";
import { createIngredient } from "../actions/recipe/ingredient/createIngredient";
import { createInstruction } from "../actions/recipe/instruction/createInstruction";

export const submitRecipe = async (
  data: FieldValues,
  user: UserInterface | null
) => {
  const res = await CreateRecipe(data, user);
  const recipeData = res;

  if (!recipeData?.data?.id) {
    throw new Error("Failed to create recipe");
  }

  if (recipeData && recipeData?.data) {
    const recipeId = recipeData?.data?.id;

    if (Array.isArray(data?.image) && recipeId) {
      await createImageRel(data?.image[0]?.image_id, recipeId, user);
    }

    for (const item of data?.ingredients || [])
      await createIngredient(item, recipeId, user);
    for (const item of data?.instructions || [])
      await createInstruction(item, recipeId, user);

    return recipeData?.data;
  }
};
