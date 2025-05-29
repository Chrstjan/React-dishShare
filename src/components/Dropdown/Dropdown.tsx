import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import type { DataInterface } from "../../lib/types/data/data";
import type { CategoryInterface } from "../../lib/types/category/category";
import type { CuisineInterface } from "../../lib/types/cuisine/cuisine";
import type { DifficultyInterface } from "../../lib/types/difficulty/difficulty";
import type { TagInterface } from "../../lib/types/tag/tag";
import { Link } from "react-router";
import s from "./Dropdown.module.scss";

export const Dropdown = () => {
  const [selectedListing, setSelectedListing] = useState<string>("");
  const { data, isLoading, error } = useFetch<
    DataInterface<
      | CategoryInterface[]
      | CuisineInterface[]
      | DifficultyInterface[]
      | TagInterface[]
    >
  >(
    selectedListing && selectedListing?.length > 0
      ? `https://dishshare.up.railway.app/${selectedListing}`
      : ""
  );

  console.log(data);

  return (
    <div className={s.dropdownContainer}>
      <ul>
        <div className={s.listingContainer}>
          <li
            onClick={() =>
              setSelectedListing(
                selectedListing?.length > 0 ? "" : "categories"
              )
            }
          >
            Category
          </li>
          {selectedListing &&
          selectedListing?.length > 0 &&
          selectedListing === "categories" ? (
            <span>
              {data && data?.data?.length > 0 && !isLoading && !error
                ? data?.data?.map((item: CategoryInterface) => (
                    <Link
                      key={item?.slug}
                      to={`/discover/${selectedListing}/${item?.slug}`}
                    >
                      <li>{item?.name}</li>
                    </Link>
                  ))
                : null}
            </span>
          ) : null}
        </div>
        <div className={s.listingContainer}>
          <li
            onClick={() =>
              setSelectedListing(selectedListing?.length > 0 ? "" : "cuisine")
            }
          >
            Cuisine
          </li>
          {selectedListing &&
          selectedListing?.length > 0 &&
          selectedListing === "cuisine" ? (
            <span>
              {data && data?.data?.length > 0 && !isLoading && !error
                ? data?.data?.map((item: CuisineInterface) => (
                    <Link
                      key={item?.slug}
                      to={`/discover/${selectedListing}/${item?.slug}`}
                    >
                      <li>{item?.name}</li>
                    </Link>
                  ))
                : null}
            </span>
          ) : null}
        </div>
        <div className={s.listingContainer}>
          <li
            onClick={() =>
              setSelectedListing(
                selectedListing?.length > 0 ? "" : "difficulty"
              )
            }
          >
            Difficulty
          </li>
          {selectedListing &&
          selectedListing?.length > 0 &&
          selectedListing === "difficulty" ? (
            <span>
              {data && data?.data?.length > 0 && !isLoading && !error
                ? data?.data?.map((item: DifficultyInterface) => (
                    <Link
                      key={item?.slug}
                      to={`/discover/${selectedListing}/${item?.slug}`}
                    >
                      <li>{item?.name}</li>
                    </Link>
                  ))
                : null}
            </span>
          ) : null}
        </div>
        <div className={s.listingContainer}>
          <li
            onClick={() =>
              setSelectedListing(selectedListing?.length > 0 ? "" : "tags")
            }
          >
            Tags
          </li>
          {selectedListing &&
          selectedListing?.length > 0 &&
          selectedListing === "tags" ? (
            <span>
              {data && data?.data?.length > 0 && !isLoading && !error
                ? data?.data?.map((item: DifficultyInterface) => (
                    <Link
                      key={item?.slug}
                      to={`/discover/${selectedListing}/${item?.slug}`}
                    >
                      <li>{item?.name}</li>
                    </Link>
                  ))
                : null}
            </span>
          ) : null}
        </div>
      </ul>
    </div>
  );
};
