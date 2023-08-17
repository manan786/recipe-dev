import Image from "next/image";
import Link from "next/link";
import React from "react";
import cardImg1 from "@/app/assets/detailImg.webp";
import cook from "@/app/assets/cook.svg";
const SearchRecipeItem = ({ active }: { active: boolean }) => {
  return (
    <div className="col-12 px-0">
      <div>
        <div className={`sCardWrapper ${active && "active"}`}>
          <Image
            src={cardImg1}
            width={184}
            className="img-fluid scardImg"
            alt="Picture of the author"
            sizes="100vw"
          />
          <div className="px-1 text-start">
            <h5 className="sCardHead">Baguette Recipe</h5>
            <span className="sCardPara">
              Lorem ipsum dolor sit amet onsectetur. egethendrerit sit aliquit
              aliq. Lorem ipsum dolor sit amet onsectetur. egethendrerit sit
              aliquit aliq.
            </span>
            <Link href={"/recipe-detail/hello-world"} className="sCardRBtn" aria-label="recipe detail page">
              Read More
            </Link>
            <div className="sCardDetailWrapper">
              <h6 className="sCardDetail">
                <span>
                  <i className="bi bi-stopwatch-fill"></i>
                  Perp:
                </span>
                0 Days 4 Hrs 5 Min
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
                2 Hours
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchRecipeItem;
