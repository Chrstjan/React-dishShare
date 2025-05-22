import { useContext } from "react";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { UserContext } from "../context/UserContext";
import { RecipeForm } from "../components/RecipeForm/RecipeForm";
import { useParams } from "react-router";
import { useFetch } from "../hooks/useFetch";
import type { DataInterface } from "../lib/types/data/data";
import type { RecipeDetailsInterface } from "../lib/types/recipe/recipe";
import { updateRecipe } from "../lib/actions/recipe/updateRecipe";

export const EditPage = () => {
  const { user } = useContext(UserContext);
  const { recipeSlug } = useParams();
  const {
    data: recipeData,
    isLoading,
    error,
  } = useFetch<DataInterface<RecipeDetailsInterface>>(
    `https://dishshare.up.railway.app/recipes/${recipeSlug}`
  );

  console.log(recipeData);

  return (
    <>
      <Wrapper>
        {recipeData && recipeData?.data && !isLoading && !error ? (
          <RecipeForm
            defaultValues={recipeData?.data}
            submitType={(data) =>
              updateRecipe(data, recipeData?.data?.id, user)
            }
            message="Edit"
          />
        ) : null}
      </Wrapper>
    </>
  );
};
