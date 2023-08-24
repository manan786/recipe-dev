"use client";
import { useState } from "react";
import SearchListItem from "./SearchList/SearchListItem";
import "./SearchMenu.css";
import SearchMenuItem from "./SearchMenuItem/SearchMenuItem";
const SearchMenu = ({
  SeachList,
  isLoading,
  searchVal,
}: {
  SeachList: Recipe[];
  isLoading: boolean;
  searchVal: string;
}) => {
  const [hoverRecipe, sethoverRecipe] = useState<Recipe | undefined>(undefined);
  if (isLoading) {
    return (
      <div className="px-3">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (isLoading == false && (searchVal == undefined || searchVal == "")) {
    return <h6 className="px-3 mb-0 py-3"></h6>;
  }
  if (isLoading == false && SeachList?.length == 0) {
    return <h6 className="px-3 mb-0 py-2">No recipe found!</h6>;
  }

  const HoverHandler = (hoverRecipe: Recipe) => {
    sethoverRecipe(hoverRecipe);
  };
  return (
    <div className="row mx-0">
      <div className="col">
        <ul className="searchMenuListWrapper">
          {SeachList?.map((item: Recipe, key: number) => (
            <SearchListItem key={key} item={item} HoverHandler={HoverHandler} />
          ))}
        </ul>
      </div>
      <div className="col searchCardCol">
        <div>
          {/* <!-- card --> */}
          {/* <a href="search.html"> */}
          <SearchMenuItem hoverRecipe={hoverRecipe ?? SeachList?.[0] ?? []} />
          {/* </a> */}
        </div>
      </div>
    </div>
  );
};

export default SearchMenu;
