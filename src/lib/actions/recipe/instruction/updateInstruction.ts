import type { UserInterface } from "../../../types/auth/user";

export const updateInstruction = async (
  instruction: { id: number; step: string },
  recipeId: number,
  user: UserInterface | null
) => {
  const formData = {
    id: instruction.id,
    recipe_id: recipeId,
    step: instruction.step,
  };

  const resp = await fetch(
    `${import.meta.env.VITE_API_URL}/instruction/${recipeId}/${instruction.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.access_token}`,
      },
      body: JSON.stringify(formData),
    }
  );

  return resp;
};
