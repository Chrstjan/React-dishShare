import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router";
import { useFetch } from "../hooks/useFetch";
import type { DataInterface } from "../lib/types/data/data";
import type { RecipeDetailsInterface } from "../lib/types/recipe/recipe";
import { createComment } from "../lib/actions/recipe/comment/createComment";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { RecipeDetailsCard } from "../components/RecipeDetailsCard/RecipeDetailsCard";
import { CommentForm } from "../components/CommentForm/CommentForm";
import { RecipeComment } from "../components/RecipeComment/RecipeComment";

export const RecipeDetailsPage = () => {
  const { user } = useContext(UserContext);
  const { slug } = useParams();

  const {
    data: recipeData,
    isLoading,
    error,
    refetch,
  } = useFetch<DataInterface<RecipeDetailsInterface>>(
    `https://dishshare.up.railway.app/recipes/${slug}`
  );

  return (
    <>
      <Wrapper>
        {recipeData && recipeData?.data && !isLoading && !error ? (
          <RecipeDetailsCard data={recipeData?.data} />
        ) : null}
      </Wrapper>
      <Wrapper
        sectionHeader
        headerText={recipeData && recipeData?.data ? "Comments:" : ""}
        type="userRecipes"
      >
        {user && user?.access_token && recipeData && recipeData?.data ? (
          <CommentForm
            message="Post comment"
            submitType={(data) =>
              createComment(data, recipeData?.data?.id, user)
            }
            onSuccess={refetch}
          />
        ) : null}
        {recipeData && recipeData?.data && !isLoading && !error ? (
          <RecipeComment
            data={recipeData?.data?.comments}
            userId={recipeData?.data?.creator?.id}
          />
        ) : null}
      </Wrapper>
    </>
  );
};
