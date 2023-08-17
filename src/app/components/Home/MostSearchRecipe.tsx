import printer from "@/app/assets/printer.svg";
import woodenSpoon from "@/app/assets/woodenSpoon.webp";
import woodenSpoonHorizontal from "@/app/assets/woodenSpoonHorizontal.webp";
import Appetizers from "@/app/assets/Appetizers-black.webp";
import Brunch from "@/app/assets/Brunch-black.webp";
import Lunch from "@/app/assets/Lunch-black.webp";
import Dinner from "@/app/assets/Dinner-black.webp";
import Seasonal from "@/app/assets/Seasonal-black.webp";
import Baking from "@/app/assets/Baking-black.webp";
import Grilling from "@/app/assets/Grilling-black.webp";
import Kids from "@/app/assets/Kids-black.webp";
import addImg from "@/app/assets/addImg.webp";
import Image from "next/image";
import Link from "next/link";
import "./MostSearchRecipe.css";
const MostSearchRecipe = () => {
  return (
    <div>
      <div className="MSBWrapper">
        <div className="MSBHeadWrapper">
          <h6 className="MSBHead">Most Searched Recipes</h6>
          <div className="headerIconWrapper2">
            <Image
              src={printer}
              className="img-fluid headerIcon2"
              alt="Picture of the printer"
              width={95}
              height={306}
              sizes="100vw"
            />
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
          <ul className="MSBListWrapper">
            <li>
              <Link href={"/search-recipe/hello-world"}>
                <Image
                  src={Appetizers}
                  width={16}
                  sizes="100vw"
                  className="img-fluid"
                  alt="Picture of the author"
                />
                Breakfast
              </Link>
            </li>
            <li>
              <Link href={'/'}>
                <Image
                  src={Brunch}
                  width={16}
                  sizes="100vw"
                  className="img-fluid"
                  alt="Picture of the author"
                />
                Brunch
              </Link>
            </li>
            <li>
              <Link href={'/'}>
                <Image
                  src={Lunch}
                  width={16}
                  sizes="100vw"
                  className="img-fluid"
                  alt="Picture of the author"
                />
                Lunch
              </Link>
            </li>
            <li>
              <Link href={'/'}>
                <Image
                  src={Appetizers}
                  className="img-fluid"
                  alt="Picture of the author"
                  width={16}
                  sizes="100vw"
                />
                Appetizers
              </Link>
            </li>
            <li>
              <Link href={'/'}>
                <Image
                  src={Dinner}
                  width={16}
                  sizes="100vw"
                  className="img-fluid"
                  alt="Picture of the author"
                />
                Dinner
              </Link>
            </li>
            <li>
              <Link href={'/'}>
                <Image
                  src={Baking}
                  width={16}
                  sizes="100vw"
                  className="img-fluid"
                  alt="Picture of the author"
                />
                Baking
              </Link>
            </li>
            <li>
              <Link href={'/'}>
                <Image
                  src={Grilling}
                  width={16}
                  sizes="100vw"
                  className="img-fluid"
                  alt="Picture of the author"
                />
                Grilling
              </Link>
            </li>
            <li>
              <Link href={'/'}>
                <Image
                  src={Kids}
                  width={16}
                  sizes="100vw"
                  className="img-fluid"
                  alt="Picture of the author"
                />
                Kids
              </Link>
            </li>
            <li>
              <Link href={'/'}>
                <Image
                  src={Seasonal}
                  width={16}
                  sizes="100vw"
                  className="img-fluid"
                  alt="Picture of the author"
                />
                Seasonal
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Image
        src={addImg}
        width={310}
        sizes="100vw"
        className="img-fluid"
        alt="Picture of the author"
      />
    </div>
  );
};

export default MostSearchRecipe;
