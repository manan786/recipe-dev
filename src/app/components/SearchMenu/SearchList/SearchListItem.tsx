import Image from "next/image";
import searchIconGreen from "@/app/assets/searchIconGreen.svg";
import Link from "next/link";
const SearchListItem = () => {
  return (
    <li>
      <Link href={"/"}>
        <Image
          src={searchIconGreen}
          className="img-fluid"
          alt="Picture of the author"
        />
        French Baguette Recipe French Baguette Recipe French Baguette Recipe
        French Baguette Recipe
      </Link>
    </li>
  );
};

export default SearchListItem;
