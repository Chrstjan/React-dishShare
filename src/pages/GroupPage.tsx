import { useState } from "react";
import { useParams } from "react-router";
import { useFetch } from "../hooks/useFetch";
import type { DataInterface } from "../lib/types/data/data";
import type {
  CategoryDetailsInterface,
  CategoryInterface,
} from "../lib/types/category/category";
import type {
  CuisineDetailsInterface,
  CuisineInterface,
} from "../lib/types/cuisine/cuisine";
import type {
  DifficultyDetailsInterface,
  DifficultyInterface,
} from "../lib/types/difficulty/difficulty";
import type { TagDetailsInterface, TagInterface } from "../lib/types/tag/tag";
import type { RecipeInterface } from "../lib/types/recipe/recipe";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { RecipeCard } from "../components/RecipeCard/RecipeCard";
import { RecipeGroupListing } from "../components/RecipeGroupListing/RecipeGroupListing";

export const GroupPage = () => {
  const { endpoint, slug } = useParams();
  const {
    data: detailsData,
    isLoading: detailsLoading,
    error: detailsError,
  } = useFetch<
    DataInterface<
      | CategoryDetailsInterface
      | CuisineDetailsInterface
      | DifficultyDetailsInterface
      | TagDetailsInterface
    >
  >(`https://dishshare.up.railway.app/${endpoint}/${slug}`);

  const { data, isLoading, error } = useFetch<
    DataInterface<
      | CategoryInterface[]
      | CuisineInterface[]
      | DifficultyInterface[]
      | TagInterface[]
    >
  >(`https://dishshare.up.railway.app/${endpoint}`);
  const [recipes, setRecipes] = useState<RecipeInterface[]>();

  console.log(endpoint);
  console.log(detailsData);

  return (
    <>
      <Wrapper
        sectionHeader
        headerText={data && data?.data ? `Expore more recipes:` : ""}
        headerType="leftHeader"
        type="cardWrapper"
      >
        {endpoint &&
        endpoint?.length > 0 &&
        data &&
        data?.data &&
        !isLoading &&
        !error ? (
          <RecipeGroupListing
            group={endpoint}
            data={data}
            setGroupRecipes={setRecipes}
          />
        ) : null}
      </Wrapper>
      <Wrapper
        sectionHeader
        headerText={
          slug && slug?.length > 0 && !recipes
            ? `${detailsData?.data?.name} recipes:`
            : `${endpoint} recipes:`
        }
        headerType="leftHeader"
        type="userRecipes"
      >
        {(detailsData && detailsData?.data && detailsData?.data?.recipes) ||
        (detailsData?.data?.tags &&
          !detailsLoading &&
          !detailsError &&
          !recipes) ? (
          <RecipeCard
            data={
              detailsData?.data?.recipes
                ? detailsData?.data?.recipes
                : [detailsData?.data?.tags?.recipe]
            }
          />
        ) : recipes && recipes?.length > 0 ? (
          <RecipeCard data={recipes} />
        ) : null}
      </Wrapper>
    </>
  );
};
