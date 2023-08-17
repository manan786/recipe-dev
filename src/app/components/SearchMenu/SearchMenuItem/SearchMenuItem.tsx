import Image from "next/image";
import cardImg1 from "@/app/assets/cardImg1.webp";
import cook2 from "@/app/assets/cook2.svg";
import "./SearchMenuItem.css"
import Link from "next/link";
const SearchMenuItem = () => {
  return (
    <div className="searchCardWrapper">
      <Image src={cardImg1} className="img-fluid" alt="Picture of the author" />
      <div className="searchMenuCardContentWrapper">
        <h4 className="SMCH">Baguette Recipe</h4>
        <p className="SMCP">
          Lorem ipsum dolor sit amet tetur. egethendrerit sit aliquit aliq.
        </p>
        <Link href={'/recipe-detail/hello-world'} className="SMCR" aria-label="recipe detail page">
          Read More
        </Link>
        <div className="SMCDWrapper">
          <h6 className="SMCD">
            <span>
              <i className="bi bi-stopwatch-fill"></i>
              Prep:{" "}
            </span>
            0 Days 3 Hrs 5 Min
          </h6>
          <h6 className="SMCD">
            <span>
              <Image
                src={cook2}
                className="img-fluid"
                alt="Picture of the author"
              />
              Cook:{" "}
            </span>
            2 Hours
          </h6>
        </div>
      </div>
    </div>
  );
};

export default SearchMenuItem;
