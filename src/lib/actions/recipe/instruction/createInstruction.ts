import { toast } from "react-toastify";
import type { UserInterface } from "../../../types/auth/user";

export const createInstruction = async (
  instruction: { step: string },
  recipeId: number,
  user: UserInterface | null
) => {
  const formData = {
    recipe_id: recipeId,
    step: instruction.step,
  };

  const resp = await fetch(`${import.meta.env.VITE_API_URL}/instruction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.access_token}`,
    },
    body: JSON.stringify(formData),
  });

  const data = await resp.json();

  if (resp.ok) {
    toast.success("Instruction(s) added to recipe");
  } else {
    toast.error(data.message || "Failed to add instruction(s) to recipe");
  }

  return data;
};
