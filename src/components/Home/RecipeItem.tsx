import Image from "next/image";
import cook from "@/assets/cook.svg";
import Link from "next/link";
import defaultVariable from "@/config/default";
const RecipeItem = ({ recipe }: { recipe: Recipe }) => {
  return (
    <div className="col-sm-6 col-md-4 col-lg-3 px-0 px-1 mb-2">
      <div className="mCardWrapper">
        <Link
          href={`/recipe-detail/${recipe?.name}`}
          aria-label="recipe detail page"
        >
          <Image
            src={recipe?.imageLink ?? defaultVariable.PlaceholderImg}
            className="img-fluid mcardImg roundedImg"
            alt="Picture of the cardImg1"
            width={459}
            height={337}
          />
        </Link>
        <div className="px-1 text-start">
          <Link
            href={"/recipe-detail/hello-world"}
            aria-label="recipe detail page"
            className="text-decoration-none"
          >
            <h5 className="mCardHead">{recipe?.name}</h5>
          </Link>
          <span className="mCardPara me-1 mb-2 d-inline-block">
            {recipe?.origin.substring(0, 70)}
            {recipe?.origin.length > 70 && (
              <>
                <span> ....</span>
                <Link
                  href={`/recipe-detail/${recipe?.name}#nav-Origin-tab`}
                  className="mCardRBtn text-decoration-none ms-1"
                  aria-label="some more descriptive text that explains the link"
                >
                  Read More
                </Link>
              </>
            )}
          </span>

          <div className="mCardDetailWrapper mt-auto">
            <h6 className="mCardDetail">
              <span>
                <i className="bi bi-stopwatch-fill"></i>
                <span className="mx1">Perp:</span>
              </span>
              {`${recipe?.preparation_time?.hours} Hr ${recipe?.preparation_time?.minutes} Min`}
            </h6>
            <h6 className="mCardDetail">
              <span>
                <Image
                  src={cook}
                  className="img-fluid"
                  alt="Picture of the cook"
                  width={13}
                  sizes="100vw"
                />
                <span className="mx1"> Cook:</span>
              </span>
              {`${recipe?.cook_time?.hours} Hr ${recipe?.cook_time?.minutes} Min`}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeItem;
