"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useGetRecipeCategoryQuery } from "@/redux/features/recipe-client/recipeApiSlice";
import Image from "next/image";
import { CateImgList } from "@/lib/categoryImages";
import CategoryLoader from "./CategoryLoader";
type typeCate = {
  name: string;
  image: {
    src: string;
    height: number;
    width: number;
    blurDataURL: string;
    blurWidth: number;
    blurHeight: number;
  };
};
const CategoryList = () => {
  const [Categories, setCategories] = useState<typeCate[]>([]);
  const { data, isLoading, refetch }: any = useGetRecipeCategoryQuery({});
  const categoryList = data?.data?.data;
  useEffect(() => {
    if (categoryList) {
      const dt = categoryList.map((val: { name: CategoryName }) => {
        return { ...val, image: CateImgList[val.name] };
      });
      setCategories([...dt]);
    }
  }, [categoryList]);
  if (isLoading) {
    return <CategoryLoader />;
  }
  if (categoryList?.length == 0) {
    return (
      <div className="row">
        <h6 className="text-center">No Record Found</h6>
      </div>
    );
  }
  return (
    <ul className="MSBListWrapper">
      {Categories?.map((cate: typeCate, key: number) => (
        <li key={key} className="mb-0" style={{ height: "37px" }}>
          <Link
            href={`/search-recipe/${cate?.name}`}
            className="text-capitalize"
          >
            <Image
              src={cate?.image.src}
              width={16}
              height={16}
              sizes="100vw"
              className="img-fluid "
              alt="Picture of the author"
            />
            {cate?.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
