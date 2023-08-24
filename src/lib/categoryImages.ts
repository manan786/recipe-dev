import Appetizers from "@/assets/Appetizers-black.webp";
import Brunch from "@/assets/Brunch-black.webp";
import Lunch from "@/assets/Lunch-black.webp";
import Dinner from "@/assets/Dinner-black.webp";
import Seasonal from "@/assets/Seasonal-black.webp";
import Baking from "@/assets/Baking-black.webp";
import Grilling from "@/assets/Grilling-black.webp";
import Kids from "@/assets/Kids-black.webp";
import { StaticImageData } from "next/image";



type Props = {
  [key in CategoryName]: StaticImageData;
};

export const CateImgList: Props = {
  breakfast: Appetizers,
  brunch: Brunch,
  lunch: Lunch,
  appetizers: Appetizers,
  dinner: Dinner,
  baking: Baking,
  seasonal: Seasonal,
  grilling: Grilling,
  kids: Kids,
};
