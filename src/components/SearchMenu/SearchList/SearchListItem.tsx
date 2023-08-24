import Image from "next/image";
import searchIconGreen from "@/assets/searchIconGreen.svg";
import Link from "next/link";
import { MouseEventHandler } from "react";
type HoverHandlerType = (item: Recipe) => void;

const SearchListItem = ({
  item,
  HoverHandler,
}: {
  item: Recipe;
  HoverHandler: HoverHandlerType ;
}) => {
  // const st = "lreom sd ds ds ds d s ds ds ds sd ds sds   ds ds sd ds sd"
  return (
    <li>
      <Link href={`/recipe-detail/${item?.name}`} onMouseEnter={() => HoverHandler(item)}>
        <Image
          src={searchIconGreen}
          className="img-fluid"
          alt="Picture of the author"
        />
        <span className="">
          {item?.name.substring(0, 30)}
          {item?.name.length > 30 && "...."}
        </span>
      </Link>
    </li>
  );
};

export default SearchListItem;
