import Image from "next/image";
import printer from "@/app/assets/printer.svg";
import share from "@/app/assets/share.svg";
import "./Print.css";
const Print = () => {
  return (
    <div className="headerRightWrapper">
      <p className="headerPara">
        Simple, basic recipes and ideas for the everyday home cook. Delicious
        meal ideas for any night of the week that won&apos;t break the family
        budget. From our family to yours. Enjoy!
      </p>
      <div className="headerIconWrapper">
        <Image
          src={printer}
          className="img-fluid headerIcon"
          alt="Picture of the author"
        />
        <Image
          src={share}
          className="img-fluid headerIcon"
          alt="Picture of the author"
        />
      </div>
    </div>
  );
};

export default Print;
