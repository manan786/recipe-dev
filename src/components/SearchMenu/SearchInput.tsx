import Image from "next/image";
import React from "react";
import searchIcon from "@/assets/searchIcon.svg";
const SearchInput = ({ChangeHandler,value}:{ChangeHandler:any,value:string}) => {
  return (
    <>
      <input type="text" placeholder="Search Recipe and more..." value={value} onChange={ChangeHandler}/>
      <button type="submit">
        <Image
          src={searchIcon}
          className="img-fluid"
          alt="Picture of the author"
        />
      </button>
    </>
  );
};

export default SearchInput;
