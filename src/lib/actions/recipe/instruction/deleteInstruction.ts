import type { UserInterface } from "../../../types/auth/user";

export const deleteInstruction = async (
  id: number,
  recipeId: number,
  user: UserInterface | null
) => {
  const resp = await fetch(
    `${import.meta.env.VITE_API_URL}/instruction/${recipeId}/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.access_token}`,
      },
    }
  );

  return resp;
};
