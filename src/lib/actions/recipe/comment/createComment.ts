import type { FieldValues } from "react-hook-form";
import type { UserInterface } from "../../../types/auth/user";
import { toast } from "react-toastify";

export const createComment = async (
  data: FieldValues,
  recipeId: number,
  user: UserInterface | null
) => {
  const { subject, content } = { ...data };

  const formData = {
    recipe_id: recipeId,
    subject: subject,
    content: content,
  };

  const resp = await fetch(`${import.meta.env.VITE_API_URL}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.access_token}`,
    },
    body: JSON.stringify(formData),
  });

  const commentData = await resp.json();

  if (resp.ok) {
    toast.success(commentData.message || "Comment created");
  } else {
    toast.error(commentData.message || "Failed to create comment");
  }

  return commentData;
};
