import type { FieldValues } from "react-hook-form";
import type { UserInterface } from "../types/auth/user";
import { updateRecipe } from "../actions/recipe/updateRecipe";
import { updateImageRel } from "../actions/recipe/imageRel/updateImageRel";
import { updateIngredient } from "../actions/recipe/ingredient/updateIngredient";
import { updateInstruction } from "../actions/recipe/instruction/updateInstruction";
import { createIngredient } from "../actions/recipe/ingredient/createIngredient";
import { createInstruction } from "../actions/recipe/instruction/createInstruction";

export const submitRecipeUpdate = async (
  data: FieldValues,
  recipeId: number,
  user: UserInterface | null
) => {
  const res = await updateRecipe(data, recipeId, user);
  const recipeData = res;

  if (!recipeData?.data) {
    throw new Error("Error in updating recipe");
  }

  if (recipeData && recipeData?.message == "Recipe updated successfully") {
    if (Array.isArray(data?.images) && data?.images[0]?.id) {
      const relId = data?.images[0]?.id;
      await updateImageRel(relId, data?.images[0]?.image?.id, recipeId, user);
    }

    for (const item of data?.ingredients || []) {
      //Skips empty objects
      if (!item?.name.trim() && !item?.amount.trim()) continue;

      // If the ingredient has an id (already in db) update
      // Else creates new ingredient for recipe
      if (item?.id) {
        await updateIngredient(item, recipeId, user);
      } else {
        await createIngredient(item, recipeId, user);
      }
    }
    for (const item of data?.instructions || []) {
      //Skips empty objects
      if (!item?.step.trim()) continue;

      // If the instruction has an id (already in db) update
      // Else creates new instruction for recipe
      if (item?.id) {
        await updateInstruction(item, recipeId, user);
      } else {
        createInstruction(item, recipeId, user);
      }
    }

    console.log("Recipe updated", recipeData?.data);

    return recipeData?.data;
  }
};
