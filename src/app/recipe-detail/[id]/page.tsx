"use client";
import Image from "next/image";
import detailImg from "@/app/assets/detailImg.webp";
import cook3 from "@/app/assets/cook3.svg";
import restaurentIcon from "@/app/assets/restaurentIcon.svg";
import MostSearchRecipe from "@/app/components/Home/MostSearchRecipe";
import "./RecipeDetail.css";
import DetailTabs from "../components/DetailTabs";
import { useState } from "react";
const CoinDetail = () => {
  const [ReadMore, setReadMore] = useState(false);
  return (
    <main className="container-fluid">
      <div className="row">
        <div className="col-11 mx-auto max-width py-5">
          <div className="row">
            <div className="col-lg-9 order-1 order-lg-0 detailPageWrapper py-2 py-md-4 px-2 px-md-4">
              <div>
                <div className="row">
                  <div className="col-12">
                    <div className="detailContentWrapper">
                      <div className="text-center text-lg-start">
                        <Image
                          src={detailImg}
                          className="img-fluid detailImg"
                          alt="Picture of the author"
                          width={432}
                          priority
                          sizes="100vw"
                        />
                      </div>
                      <div>
                        <h6 className="detailHead">Baguette Recipe</h6>
                        <span className="detailPara">
                          Baguette - long a staple of French cuisine - is
                          defined by its look, taste and texture. Long and thin,
                          the golden, crispy outer crust of a baguette hides a
                          soft, tender, chewy interior. For the new cook, this
                          classic French loaf or French stick baguette recipe is
                          deceptively simple with few ingredients and little
                          fuss. In fact, it doesn&apos;t even require kneading.
                        </span>
                        <span
                          className="detailReadMore"
                          onClick={() => setReadMore(true)}
                        >
                          Read More
                        </span>
                        <div className="detailDetail">
                          <h6 className="detailDetailText">
                            <span>
                              <i className="bi bi-stopwatch-fill"></i> Prep:{" "}
                            </span>
                            3 hours
                          </h6>
                          <h6 className="detailDetailText">
                            <span>
                              <Image
                                src={cook3}
                                width={18}
                                className="img-fluid"
                                alt="Picture of the author"
                                sizes="100vw"
                              />
                              Cook:{" "}
                            </span>
                            2 hours
                          </h6>
                          <h6 className="detailDetailText">
                            <span>
                              <Image
                                src={restaurentIcon}
                                width={18}
                                className="img-fluid"
                                alt="Picture of the author"
                                sizes="100vw"
                              />
                              Servers:{" "}
                            </span>
                            3 - 4 Loaves
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <DetailTabs origin={ReadMore} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 order-0 order-lg-1 px-0 px-md-2">
              <MostSearchRecipe />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CoinDetail;
