import Image from "next/image";
import cardImg1 from "@/app/assets/cardImg1.webp";
import cook from "@/app/assets/cook.svg";
import Link from "next/link";

const RecipeItem = () => {
  return (
    <div className="col-sm-6 col-md-4 col-lg-3 px-0 px-1">
      <div className="mCardWrapper">
        <Link href={"/recipe-detail/hello-world"} aria-label="recipe detail page">
          <Image
            src={cardImg1}
            className="img-fluid mcardImg"
            alt="Picture of the cardImg1"
            width={224}
            sizes="100vw"
          />
        </Link>
        <div className="px-1 text-start">
          <Link
            href={"/recipe-detail/hello-world"}
            aria-label="recipe detail page"
            className="text-decoration-none"
          >
            <h5 className="mCardHead">Baguette Recipe</h5>
          </Link>
          <span className="mCardPara">
            Lorem ipsum dolor sit amet onsectetur. egethendrerit sit aliquit
            aliq sit amet onsectetur dolor sit.
          </span>
          <Link
            href={"/recipe-detail/hello-world#nav-Origin-tab"}
            className="SMCR text-decoration-none"
            aria-label="some more descriptive text that explains the link"
          >
            Read More
          </Link>
          <div className="mCardDetailWrapper">
            <h6 className="mCardDetail">
              <span>
                <i className="bi bi-stopwatch-fill"></i>
                Perp:
              </span>
              0 Days 4 Hrs 5 Min
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
                Cook:
              </span>
              2 Hours
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeItem;
