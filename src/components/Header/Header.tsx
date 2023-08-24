"use client";
import React, { useState, ChangeEvent } from "react";
import SearchMenu from "@/components/SearchMenu/SearchMenu";
import Print from "@/components/PrintArea/Print";
import Link from "next/link";
import SearchInput from "../SearchMenu/SearchInput";
import { useGetSearchRecipeQuery } from "@/redux/features/recipe-client/recipeApiSlice";
import "./Header.css";
import GeneratePDF from "../GeneratePDF/GeneratePDF";
const Header = () => {
  const [SearchValue, setSearchValue] = useState<string>("");
  const [debouncedInputValue, setDebouncedInputValue] =
    React.useState<string>("");

  React.useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedInputValue(SearchValue);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [SearchValue]);

  const ChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const { data, isFetching, refetch }: any =
    useGetSearchRecipeQuery(debouncedInputValue);

  const SearchList = data?.data?.data;
  return (
    <header className="container-fluid headerBg">
      <div className="row">
        <div className="col-11 mx-auto max-width py-3">
          <div className="row">
            <div className="col-lg-6">
              <div>
                <Link href={"/"} className="headerHead">
                  Most Searched Recipes
                </Link>
                <div className="searchMenuMobWrapper">
                  <form className="headerSearch">
                    <SearchInput
                      ChangeHandler={ChangeHandler}
                      value={SearchValue}
                    />
                    <div id="searchMenu" className="searchMenuWrapper">
                      <SearchMenu
                        SeachList={SearchList}
                        isLoading={isFetching}
                        searchVal={debouncedInputValue}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-5 ps-xl-0">
              <Print />
            </div>
            <div className="col-lg-1">
              <div className="d-lg-flex d-none h-100">
              <GeneratePDF />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
