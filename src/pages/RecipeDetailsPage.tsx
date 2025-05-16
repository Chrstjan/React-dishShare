import { useParams } from "react-router";
import { useFetch } from "../hooks/useFetch";
import type { DataInterface } from "../lib/types/data/data";
import type { RecipeDetailsInterface } from "../lib/types/recipe/recipe";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { RecipeDetailsCard } from "../components/RecipeDetailsCard/RecipeDetailsCard";

export const RecipeDetailsPage = () => {
  const { slug } = useParams();

  const { data, isLoading, error } = useFetch<
    DataInterface<RecipeDetailsInterface>
  >(`https://dishshare.up.railway.app/recipes/${slug}`);

  return (
    <>
      <Wrapper>
        {data && data?.data && !isLoading && !error ? (
          <RecipeDetailsCard data={data?.data} />
        ) : null}
      </Wrapper>
    </>
  );
};
