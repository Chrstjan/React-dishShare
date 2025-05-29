import { useEffect, type Dispatch, type SetStateAction } from "react";
import type { CategoryInterface } from "../../lib/types/category/category";
import type { CuisineInterface } from "../../lib/types/cuisine/cuisine";
import type { DataInterface } from "../../lib/types/data/data";
import type { DifficultyInterface } from "../../lib/types/difficulty/difficulty";
import type { TagInterface } from "../../lib/types/tag/tag";
import type { RecipeInterface } from "../../lib/types/recipe/recipe";
import s from "./RecipeGroupListing.module.scss";

interface RecipeGroupListingInterface {
  group: string;
  data: DataInterface<
    | CategoryInterface[]
    | CuisineInterface[]
    | DifficultyInterface[]
    | TagInterface[]
  >;
  type?: string;
  defaultUrl?: string;
  slug?: string;
  setGroupRecipes: Dispatch<SetStateAction<RecipeInterface[] | undefined>>;
}

export const RecipeGroupListing = ({
  group,
  data,
  type,
  defaultUrl,
  slug,
  setGroupRecipes,
}: RecipeGroupListingInterface) => {
  useEffect(() => {
    if (defaultUrl && defaultUrl.length > 0 && slug && slug?.length > 0) {
      handleListingClick(group, slug);
    }
  }, [defaultUrl]);

  const handleListingClick = async (group: string, slug: string) => {
    let url: string = "";

    switch (group) {
      case "category":
      case "categories":
        url = `categories/${slug}`;
        break;
      case "cuisine":
        url = `cuisine/${slug}`;
        break;
      case "difficulty":
        url = `difficulty/${slug}`;
        break;
      case "tag":
      case "tags":
        url = `tags/${slug}`;
        break;
      default:
        url = "";
        break;
    }

    if (url && url.length > 0) {
      try {
        const res = await fetch(`https://dishshare.up.railway.app/${url}`);

        if (!res.ok) {
          throw new Error(
            `Error fetching from group: ${group} with slug: ${slug}`
          );
        }

        const data = await res.json();
        console.log(data);
        if (data && data?.data?.recipes) {
          setGroupRecipes(data?.data?.recipes);
        } else if (data && data?.data && data?.data?.tags?.recipe) {
          console.log(data?.data?.tags?.recipe);

          setGroupRecipes([data?.data?.tags?.recipe]);
        }
      } catch (err: unknown | Error) {
        if (err instanceof Error) {
          console.error(`Error in fetching from endpoint: ${url}`);
        }
      }
    }
  };

  return (
    <div className={`${s.listingContainer}`}>
      <ul className={`${s.listingStyling} ${type ? s[type] : ""}`}>
        {data && data?.data?.length > 0
          ? data?.data?.map(
              (
                item:
                  | CategoryInterface
                  | CuisineInterface
                  | DifficultyInterface
                  | TagInterface
              ) => {
                return (
                  <li
                    onClick={() => handleListingClick(group, item?.slug)}
                    key={item?.slug}
                  >
                    {item?.name}
                  </li>
                );
              }
            )
          : null}
      </ul>
    </div>
  );
};
