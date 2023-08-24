import Image from "next/image";
import cardImg1 from "@/assets/cardImg1.webp";
import cook2 from "@/assets/cook2.svg";
import "./SearchMenuItem.css";
import Link from "next/link";
const SearchMenuItem = ({
  hoverRecipe,
}: {
  hoverRecipe: Recipe | undefined;
}) => {
  if (!hoverRecipe) return null;
  return (
    <div className="searchCardWrapper">
      <Link
        href={`/recipe-detail/${hoverRecipe?.name}`}
        aria-label="recipe detail page"
      >
        <Image
          src={hoverRecipe?.imageLink ?? cardImg1}
          width={459}
          height={337}
          className="img-fluid roundedImg"
          alt="Picture of the author"
        />
      </Link>
      <div className="searchMenuCardContentWrapper">
        <Link
          href={`/recipe-detail/${hoverRecipe?.name}`}
          aria-label="recipe detail page"
        >
          <h4 className="SMCH mb-2">{hoverRecipe?.name}</h4>
        </Link>
        <p className="SMCP mb-2">
          {hoverRecipe?.origin.substring(0, 99)}
          {hoverRecipe?.origin.length > 99 && (
            <>
              <span>...</span>{" "}
              <Link
                href={`/recipe-detail/${hoverRecipe?.name}`}
                className="SMCR mb-0"
                aria-label="recipe detail page"
              >
                Read More
              </Link>
            </>
          )}
        </p>
        <div className="SMCDWrapper mt-1">
          <h6 className="SMCD">
            <span>
              <i className="bi bi-stopwatch-fill"></i>
              Prep:{" "}
            </span>
            {`${hoverRecipe?.preparation_time?.days} days ${hoverRecipe?.preparation_time?.hours} hours ${hoverRecipe?.preparation_time?.minutes} minutes`}
          </h6>
          <h6 className="SMCD mt-1">
            <span>
              <Image
                src={cook2}
                className="img-fluid"
                alt="Picture of the author"
              />
              Cook:{" "}
            </span>
            {`${hoverRecipe?.cook_time?.days} days ${hoverRecipe?.cook_time?.hours} hours ${hoverRecipe?.cook_time?.minutes} minutes`}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default SearchMenuItem;
