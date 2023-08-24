import printer from "@/assets/printer.svg";
import share from "@/assets/share.svg";
import woodenSpoon from "@/assets/woodenSpoon.webp";
import woodenSpoonHorizontal from "@/assets/woodenSpoonHorizontal.webp";
import addImg from "@/assets/addImg.webp";
import Image from "next/image";
import "./MostSearchRecipe.css";
import CategoryList from "./CategoryList";
import GeneratePDF from "../GeneratePDF/GeneratePDF";
const MostSearchRecipe = () => {
  return (
    <div>
      <div className="MSBWrapper">
        <div className="MSBHeadWrapper">
          <h6 className="MSBHead">Most Searched Recipes</h6>
          <div className="d-lg-none d-block">
            <GeneratePDF />
          </div>
        </div>
        <div className="MSBContentWrapper">
          <Image
            src={woodenSpoon}
            className="img-fluid woodenImg"
            alt="Picture of the woodenspoon"
            width={95}
            height={306}
            sizes="100vw"
          />
          <Image
            src={woodenSpoonHorizontal}
            className="img-fluid woodenImgHorizontal"
            alt="Picture of the author"
            width={338}
            sizes="100vw"
          />
          <CategoryList />
        </div>
      </div>
      <Image
        src={addImg}
        width={340}
        sizes="100vw"
        className="img-fluid addImg"
        alt="Picture of the author"
      />
    </div>
  );
};

export default MostSearchRecipe;
