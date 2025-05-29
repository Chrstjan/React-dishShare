import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import type { DataInterface } from "../lib/types/data/data";
import type { RecipeInterface } from "../lib/types/recipe/recipe";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { RecipeCard } from "../components/RecipeCard/RecipeCard";
import { Dropdown } from "../components/Dropdown/Dropdown";

export const DiscoverPage = () => {
  const {
    data: recipeData,
    isLoading,
    error,
  } = useFetch<DataInterface<RecipeInterface[]>>(
    "https://dishshare.up.railway.app/recipes?limit=1000"
  );
  const [topRecipes, setTopRecipes] = useState<RecipeInterface[]>();
  const [newestRecipes, setNewestRecipes] = useState<RecipeInterface[]>();

  useEffect(() => {
    if (recipeData && recipeData?.data) {
      console.log(recipeData?.data);

      setTopRecipes(
        recipeData?.data?.filter((item: RecipeInterface) => item?.rating >= 4.5)
      );
      setNewestRecipes(recipeData?.data?.slice(-4));
    }
  }, [recipeData]);
  return (
    <>
      <Wrapper
        sectionHeader
        headerText="Recipe groups:"
        headerType="leftHeader"
        type="mBottomWrapper"
      >
        <Dropdown />
      </Wrapper>
      <Wrapper
        sectionHeader
        headerText={
          topRecipes && topRecipes?.length > 0 ? "Top rated recipes:" : ""
        }
        headerType="leftHeader"
        type="mBottomWrapper"
      >
        {topRecipes && topRecipes?.length > 0 && !isLoading && !error ? (
          <RecipeCard data={topRecipes} />
        ) : null}
      </Wrapper>
      <Wrapper
        sectionHeader
        headerText={
          newestRecipes && newestRecipes?.length > 0 ? "Newest recipes:" : ""
        }
        headerType="leftHeader"
        type="userRecipes"
      >
        {newestRecipes && newestRecipes?.length > 0 ? (
          <RecipeCard data={newestRecipes} />
        ) : null}
      </Wrapper>
    </>
  );
};
