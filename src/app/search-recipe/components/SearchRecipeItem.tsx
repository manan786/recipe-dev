import Image from "next/image";
import Link from "next/link";
import React from "react";
import cardImg1 from "@/assets/cardImg1.webp";
import cook from "@/assets/cook.svg";
const SearchRecipeItem = ({
  active,
  item,
}: {
  item: Recipe;
  active: boolean;
}) => {
  return (
    <div className="col-12 px-0">
      <div>
        <div className={`sCardWrapper ${active && "active"}`}>
          <Link href={`/recipe-detail/${item?.name}`}>
            <Image
              src={item?.imageLink ?? cardImg1}
              width={180}
              height={337}
              className="img-fluid scardImg me-sm-3 me-0"
              alt="Picture of the author"
            />
          </Link>
          <div className="px-1 text-start">
            <Link href={`/recipe-detail/${item?.name}`}>
              <h5 className="sCardHead">{item?.name}</h5>
            </Link>
            <span className="sCardPara">
              {item?.meta_description.substring(0, 99)}
              {item?.meta_description.length > 99 && "...."}
            </span>
            {/* {item?.meta_description.length > 99 && */}
            <Link
              href={`/recipe-detail/${item?.name}`}
              className="sCardRBtn ms-2"
              aria-label="recipe detail page"
            >
              Read More
            </Link>
            {/* } */}
            <div className="sCardDetailWrapper">
              <h6 className="sCardDetail">
                <span>
                  <i className="bi bi-stopwatch-fill"></i>
                  Perp:
                </span>
                {`${item?.preparation_time?.days} days ${item?.preparation_time?.hours} hours ${item?.preparation_time?.minutes} minutes`}
              </h6>
              <h6 className="sCardDetail">
                <span>
                  <Image
                    src={cook}
                    width={18}
                    sizes="100vw"
                    className="img-fluid"
                    alt="Picture of the author"
                  />
                  Cook:
                </span>
                {`${item?.cook_time?.days} days ${item?.cook_time?.hours} hours ${item?.cook_time?.minutes} minutes`}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchRecipeItem;
