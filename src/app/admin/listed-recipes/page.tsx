"use client";
import Link from "next/link";
import SearchRecipes from "../components/SearchRecipes";
import ListedRecipeList from "./components/ListedRecipeList";
import RecipeCate from "../components/RecipeCate";
import { useGetListedRecipesQuery } from "@/redux/features/recipe-admin/recipeApiSlice";
import React, { ChangeEvent, useState } from "react";

const ListedRecipe = () => {
  const [SearchValue, setSearchValue] = useState<string>("");
  const [Recipecate, setRecipecate] = useState<string>("");
  const [debouncedInputValue, setDebouncedInputValue] =
    React.useState<string>("");
  const { data, isFetching, refetch }: any = useGetListedRecipesQuery(
    {
      cate: Recipecate,
      search: debouncedInputValue,
    },
    { refetchOnMountOrArgChange: true }
  );
  const recipeList = data?.data?.data;
  React.useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedInputValue(SearchValue);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [SearchValue]);

  const SearchChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const CateChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setRecipecate(e.target.value);
  };
  return (
    <div className="RD-content">
      <div className="LR-wrapp">
        <h1 className="LR-Title">Listed Recipes</h1>
        <div className="LR-TopHead mt-4">
          <div className="w-sm-50">
            <SearchRecipes
              ChangeHandler={SearchChangeHandler}
              value={SearchValue}
            />
          </div>
          <RecipeCate
            ChangeHandler={CateChangeHandler}
            Recipecate={Recipecate}
          />
          <Link
            href={"list-new-recipe"}
            className="btn ms-md-auto LR_Btn px-3 mt-md-0 mt-sm-3"
          >
            <i className="bi bi-plus-lg"></i>
            List New Recipe
          </Link>
        </div>
        <div className="mt-5 LRTableWrapp">
          <table className="table LRTable">
            <thead>
              <tr>
                <th scope="col" style={{ width: "140px" }}>
                  <div>Recipe Name</div>
                </th>
                <th scope="col" style={{ width: "100px" }}>
                  <div>Category</div>
                </th>
                <th scope="col" style={{ width: "240px" }}>
                  <div>Description</div>
                </th>
                <th scope="col" style={{ width: "120px" }}>
                  <div>Preparation</div>
                </th>
                <th scope="col" style={{ width: "120px" }}>
                  <div>Cook</div>
                </th>
                <th scope="col" style={{ width: "130px" }}>
                  <div>Serves</div>
                </th>
              </tr>
            </thead>
            <ListedRecipeList recipeList={recipeList} isFetching={isFetching} />
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListedRecipe;
