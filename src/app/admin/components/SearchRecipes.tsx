"use client";
import searchIcon from "@/assets/searchIcon.svg";
import Image from "next/image";
const SearchRecipes = ({
  ChangeHandler,
  value,
}: {
  ChangeHandler: any;
  value: string;
}) => {
  return (
    <form className="headerSearch">
      <input
        type="text"
        placeholder="Search Recipe and more..."
        value={value}
        onChange={ChangeHandler}
      />
      <button type="submit">
        <Image
          src={searchIcon}
          className="img-fluid"
          alt="searchIcon Image"
        ></Image>
      </button>
    </form>
  );
};

export default SearchRecipes;
