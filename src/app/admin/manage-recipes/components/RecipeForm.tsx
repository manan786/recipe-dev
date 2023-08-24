"use client";
import {
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
} from "@/redux/features/recipe-admin/recipeApiSlice";
import {
  useGetRecipeByNameQuery,
  useGetRecipeCategoryQuery,
} from "@/redux/features/recipe-client/recipeApiSlice";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import StatusMessageModal from "../../components/StatusMessageModal";
import Image from "next/image";
import platesicon from "@/assets/plates-icon.png";

const IntialValue: RecipeFormProps = {
  image: null,
  name: "",
  serves: "",
  categoriesId: "choose category",
  preparation_time: "",
  cook_time: "",
  meta_description: "",
  ingredients: "",
  preparation: "",
  origin: "",
  nutrition: "",
};

const RecipeForm = ({ updateRecipe }: { updateRecipe: string }) => {
  const [UpdateRecipeMutation, { isLoading: UpdateLoading }] =
    useUpdateRecipeMutation();
  const {
    data: singleRecipe,
    isFetching: RecipeFetching,
    refetch: recipeReftch,
  }: any = useGetRecipeByNameQuery(updateRecipe);
  const Singalrecipe: Recipe = singleRecipe?.data?.data;
  const [image, setimage] = useState<undefined | any>(undefined);
  const [StatusMessModal, setStatusMessModal] = useState<boolean>(false);
  const [PreviewImg, setPreviewImg] = useState<string | ArrayBuffer | null>("");
  const [imageError, setimageError] = useState<null | string | undefined>(null);
  const [SuccessMess, setSuccessMess] = useState<{
    status: boolean;
    message: string;
  }>();
  const [ingredients, setingredients] = useState<ingredientsprops[]>([
    { name: "", amount: "", measurement: "" },
    { name: "", amount: "", measurement: "" },
  ]);
  const [nutrition, setnutrition] = useState<nutritionprops[]>([
    { name: "", quantity: "" },
    { name: "", quantity: "" },
  ]);
  const [preparation_time, setpreparation_time] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });
  const [cook_time, setcook_time] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  async function ImageURLConvertIntoBASE64(imageUrl: string) {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImg(reader.result);
        // console.log("reader.result;", reader.result);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error loading image:", error);
    }
  }
  const {
    register,
    watch,
    getValues,
    setError,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: IntialValue,
  });
  useEffect(() => {
    if (Singalrecipe) {
      reset({
        name: Singalrecipe.name ?? "",
        serves: Singalrecipe.serves ?? "",
        meta_description: Singalrecipe.meta_description ?? "",
        preparation: Singalrecipe.preparation ?? "",
        origin: Singalrecipe.origin ?? "",
        categoriesId: Singalrecipe.category.name ?? "",
      });
      // @ts-ignore
      async function fun() {
        await ImageURLConvertIntoBASE64(Singalrecipe.imageLink);
      }
      fun();
      setingredients(Singalrecipe.ingredients);
      setnutrition(Singalrecipe.nutrition);
    }
  }, [Singalrecipe, reset]);

  const FileClickHandler = (id: string = "") => {
    document.getElementById(id)?.click();
  };
  const { data, isFetching, refetch }: any = useGetRecipeCategoryQuery({});
  const recipeCateList = [
    ...[{ id: "dss898dsds89s", name: "choose category" }],
    ...(data?.data?.data ?? []),
  ];
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file && !file?.name.match(/\.(jpg|jpeg|png)$/i))
      return setimageError("File must be jpg,jpeg,png");
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const img = new window.Image();
        img.src = event.target.result;
        setPreviewImg("");
        img.onload = () => {
          if (img.width !== 450 && img.height !== 330)
            return setimageError("File must be 450 x 330 pixels");
          setPreviewImg(event.target.result);
          setimage(file);
          setimageError(undefined);
        };
      };
      reader.readAsDataURL(file);
    }
  };
  type dd = "days" | "hours" | "minutes";
  const IncrementHanlder = (key: string, duration: dd) => {
    if (key == "preparation") {
      setpreparation_time((prev) => {
        return { ...prev, [duration]: prev?.[duration] + 1 };
      });
    }
    if (key == "cook") {
      setcook_time((prev) => {
        return { ...prev, [duration]: prev?.[duration] + 1 };
      });
    }
  };
  const DecrementHanlder = (key: string, duration: dd) => {
    if (key == "preparation") {
      setpreparation_time((prev) => {
        return { ...prev, [duration]: prev?.[duration] - 1 };
      });
    }
    if (key == "cook") {
      setcook_time((prev) => {
        return { ...prev, [duration]: prev?.[duration] - 1 };
      });
    }
  };
  const IngredientDecHandler = (key: number) => {
    setingredients((prev) => {
      const ss = [...prev];
      ss.splice(key, 1);
      return [...ss];
    });
  };
  const IngredientIncHandler = () => {
    setingredients((prev) => {
      return [...prev, { name: "", amount: "", measurement: "" }];
    });
  };
  const ingrdntChangeHandler = (e: any, key: number) => {
    const { value, name } = e.target;
    setingredients((prev: any) => {
      return prev.map((ingredient: any, index: number) => {
        if (index === key) {
          ingredient[name] = value;
        }
        return ingredient;
      });
    });
  };
  const nurtriChangeHandler = (e: any, key: number) => {
    const { value, name } = e.target;
    setnutrition((prev: any) => {
      return prev.map((ingredient: any, index: number) => {
        if (index === key) {
          ingredient[name] = value;
        }
        return ingredient;
      });
    });
  };
  const nutritionDecHandler = (key: number) => {
    setnutrition((prev) => {
      const ss = [...prev];
      ss.splice(key, 1);
      return [...ss];
    });
  };
  const nutritionIncHandler = () => {
    setnutrition((prev) => {
      return [...prev, { name: "", quantity: "" }];
    });
  };

  const RessetState = () => {
    reset(IntialValue);
    setingredients([
      { name: "", amount: "", measurement: "" },
      { name: "", amount: "", measurement: "" },
    ]);
    setPreviewImg("");
    setcook_time({ days: 0, hours: 0, minutes: 0 });
    setpreparation_time({ days: 0, hours: 0, minutes: 0 });
    setnutrition([
      { name: "", quantity: "" },
      { name: "", quantity: "" },
    ]);
  };

  const onSubmit = async (data: any) => {
    if (data.categoriesId === "choose category" || !data.categoriesId) {
      setError("categoriesId", {
        type: "manual",
        message: "Please select a valid category",
      });
      return;
    }

    const formData = new FormData();
    delete data.image;
    if (image) {
      formData.append("image", image);
    }
    const caeID = recipeCateList.find(
      (cate: RecipeCate) => cate.name === data.categoriesId
    );
    data.preparation_time = JSON.stringify(preparation_time);
    data.cook_time = JSON.stringify(cook_time);
    data.ingredients = JSON.stringify(ingredients);
    data.nutrition = JSON.stringify(nutrition);
    data.categoriesId = caeID.id;
    Object.keys(data).forEach(function (key) {
      formData.append(key, data[key]);
    });
    // @ts-ignore
    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    UpdateRecipeMutation({ payload: formData, id: Singalrecipe.id })
      .then((res: any) => {
        if (res.error) {
          setStatusMessModal(true);
          return setSuccessMess({
            status: false,
            message: res.error?.data?.message ?? "No Recipe Update!",
          });
        }
        setStatusMessModal(true);
        setSuccessMess({
          status: true,
          message: "Recipe Updated Sccessfully!",
        });
        RessetState();
      })
      .catch((e: any) => {
        console.log("e", e);
        setStatusMessModal(true);
        setSuccessMess({
          status: false,
          message: "No Recipe Update!",
        });
      });
  };
  const HandlerCloseModal = () => {
    setSuccessMess({ status: false, message: "" });
    setStatusMessModal(false);
  };
  if (!RecipeFetching && !singleRecipe)
    return (
      <div className="container-fluid mt-4 ManageRecipe">
        <h4>No Recipe Found</h4>
      </div>
    );
  return (
    <div className="container-fluid mt-4 ManageRecipe">
      <StatusMessageModal
        show={StatusMessModal}
        HandlerClose={HandlerCloseModal}
        Content={{
          message: SuccessMess?.message ?? "",
          status: SuccessMess?.status ?? true,
        }}
      />
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="list-area d-flex">
            {/* <!-- upload side --> */}
            <div className="col-md-6">
              <div className="upload-side">
                <div className="">
                  <div
                    className={`upload-div ${
                      imageError && "border border-danger"
                    }`}
                    style={{
                      backgroundImage: `url(${PreviewImg})`,
                      backgroundSize: "cover", // Adjust the background size as needed
                      backgroundPosition: "center",
                    }}
                    onClick={() => FileClickHandler("CoinImg")}
                  >
                    {PreviewImg ? (
                      <div className="text-white EditIconImg">
                        <span>
                          <i className="bi bi-pencil-square"></i>
                        </span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <span className="plus-icon">
                          <i className="bi bi-plus-circle"></i>
                        </span>
                        <div className="upload-content">
                          {image ? (
                            <p>{image.name ?? ""}</p>
                          ) : (
                            <p>
                              Upload Recipe Thumbnail
                              <br />
                              Picture
                            </p>
                          )}
                        </div>
                        <div>
                          PMax File size:
                          <strong className="text-green">5MB</strong>
                        </div>
                      </div>
                    )}
                    <input
                      type="file"
                      onChange={handleImageChange}
                      id="CoinImg"
                      className={`form-control login-input d-none `}
                      placeholder="Name"
                      // {...register("coinImage", { required: true })}
                    />
                  </div>
                </div>
                <div
                  className={`pt-2 ${imageError && "text-danger"}`}
                  style={{ fontSize: "12px" }}
                >
                  <span className="">
                    Supported File Format:
                    <span
                      className={`text-green ${imageError && "text-danger"}`}
                    >
                      JPG, JEPG, PNG
                    </span>
                  </span>
                  <span>
                    <span
                      className={`text-green ${imageError && "text-danger"}`}
                      style={{ paddingLeft: "27px" }}
                    >
                      Max Resolution:
                    </span>
                    <span>450px by 330px </span>
                  </span>
                </div>
              </div>
            </div>
            {/* <!-- form side --> */}
            <div className="col-md-6">
              <div className="form-side">
                <div className="form-floating recipi-controling mb-0 mt-sm-0 mt-3">
                  <select
                    className={`form-select form-control Recipe-Category Chose-catgroy ${
                      errors.categoriesId && "Invalid"
                    }`}
                    id="floatingSelect"
                    aria-label="Floating label select example"
                    {...register("categoriesId", { required: true })}
                  >
                    {isFetching ? (
                      <option value={""}>...loading</option>
                    ) : (
                      recipeCateList?.map(
                        (cat: { name: string; id: string }) => {
                          return (
                            <option
                              key={cat?.name}
                              // disabled={cat?.name == "choose category"}
                              value={cat?.name}
                            >
                              {cat?.name}
                            </option>
                          );
                        }
                      )
                    )}
                  </select>
                </div>
                {errors.categoriesId && (
                  <small className="text-danger">
                    {errors.categoriesId.message}{" "}
                  </small>
                )}
                <div className="recipi-controling mt-3">
                  <label className="recipi-label" htmlFor="username">
                    Recipe Name
                  </label>
                  <input
                    type="text"
                    id="username"
                    placeholder="Enter Recipe Name"
                    className={`form-control recipi-input  ${
                      errors.name && "Invalid"
                    }`}
                    {...register("name", { required: true })}
                  />
                  <span className="recipi-icon">
                    <i className="bi bi-archive-fill"></i>
                  </span>
                </div>
                <div className="recipi-controling">
                  <label className="recipi-label" htmlFor="username">
                    Serves
                  </label>
                  <input
                    type="text"
                    id="username"
                    placeholder="Enter Servings"
                    className={`form-control recipi-input  ${
                      errors.serves && "Invalid"
                    }`}
                    {...register("serves", { required: true })}
                  />
                  <span className="recipi-icon" style={{ top: "20px" }}>
                    <Image
                      src={platesicon}
                      alt="plate icons"
                      className="img-fluid"
                    ></Image>
                  </span>
                </div>
                <div></div>
                <div className="prpration mt-4 d-flex gap-sm-5 gap-2">
                  <div className="d-flex pb-1 preprationDiv align-items-end">
                    <div className="prepation-icon">
                      <i className="bi text-green bi-stopwatch-fill"></i>
                    </div>
                    <div className="prepration-content">Prepration</div>
                  </div>
                  {/* <div className="days-p">
                    Days
                    <div className="math my-2">
                      <span
                        className="px-2 py-1 minus"
                        onClick={() => DecrementHanlder("preparation", "days")}
                      >
                        <i className="bi bi-dash"></i>
                      </span>
                      <span className="px-3 py-1 zreo-cont">
                        {preparation_time?.days}
                      </span>
                      <span
                        className="plusSpan px-2 py-1"
                        onClick={() => IncrementHanlder("preparation", "days")}
                      >
                        <i className="bi bi-plus"></i>
                      </span>
                    </div>
                  </div> */}

                  <div className="days-p">
                    Hours
                    <div className="math my-2">
                      <span
                        className="px-2 py-1 minus"
                        onClick={() => DecrementHanlder("preparation", "hours")}
                      >
                        <i className="bi bi-dash"></i>
                      </span>
                      <span className="px-3 py-1 zreo-cont">
                        {" "}
                        {preparation_time?.hours}
                      </span>
                      <span
                        className="plusSpan px-2 py-1"
                        onClick={() => IncrementHanlder("preparation", "hours")}
                      >
                        <i className="bi bi-plus"></i>
                      </span>
                    </div>
                  </div>

                  <div className="days-p">
                    Mintues
                    <div className="math my-2">
                      <span
                        className="px-2 py-1 minus"
                        onClick={() =>
                          DecrementHanlder("preparation", "minutes")
                        }
                      >
                        <i className="bi bi-dash"></i>
                      </span>
                      <span className="px-3 py-1 zreo-cont">
                        {" "}
                        {preparation_time?.minutes}
                      </span>
                      <span
                        className="plusSpan px-2 py-1"
                        onClick={() =>
                          IncrementHanlder("preparation", "minutes")
                        }
                      >
                        <i className="bi bi-plus"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="prpration mt-4 d-flex gap-sm-5 gap-2">
                  <div className="d-flex pb-1 preprationDiv align-items-end">
                    <div className="prepation-icon">
                      <i className="bi text-green bi-archive-fill"></i>
                    </div>
                    <div className="prepration-content">Cook</div>
                  </div>
                  {/* <div className="days-p">
                    Days
                    <div className="math my-2">
                      <span
                        className="px-2 py-1 minus"
                        onClick={() => DecrementHanlder("cook", "days")}
                      >
                        <i className="bi bi-dash"></i>
                      </span>
                      <span className="px-3 py-1 zreo-cont">
                        {cook_time?.days}
                      </span>
                      <span
                        className="plusSpan px-2 py-1"
                        onClick={() => IncrementHanlder("cook", "days")}
                      >
                        <i className="bi bi-plus"></i>
                      </span>
                    </div>
                  </div> */}

                  <div className="days-p">
                    Hours
                    <div className="math my-2">
                      <span
                        className="px-2 py-1 minus"
                        onClick={() => DecrementHanlder("cook", "hours")}
                      >
                        <i className="bi bi-dash"></i>
                      </span>
                      <span className="px-3 py-1 zreo-cont">
                        {cook_time?.hours}
                      </span>
                      <span
                        className="plusSpan px-2 py-1"
                        onClick={() => IncrementHanlder("cook", "hours")}
                      >
                        <i className="bi bi-plus"></i>
                      </span>
                    </div>
                  </div>

                  <div className="days-p">
                    Mintues
                    <div className="math my-2">
                      <span
                        className="px-2 py-1 minus"
                        onClick={() => DecrementHanlder("cook", "minutes")}
                      >
                        <i className="bi bi-dash"></i>
                      </span>
                      <span className="px-3 py-1 zreo-cont">
                        {cook_time?.minutes}
                      </span>
                      <span
                        className="plusSpan px-2 py-1"
                        onClick={() => IncrementHanlder("cook", "minutes")}
                      >
                        <i className="bi bi-plus"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-green meta-h2 ml-2">Meta Description</h2>
          <div className="mb-3">
            <input
              type="text"
              id="exampleFormControlInput1"
              placeholder=""
              className={`form-control meta-input  ${
                errors.meta_description && "Invalid"
              }`}
              {...register("meta_description", { required: true })}
            />
          </div>
        </div>
        <div>
          <h2 className="text-green meta-h2">Ingredients</h2>
          {ingredients.map((ingrdnt: ingredientsprops, key: number) => {
            return (
              <div key={key} className="row ingridient-form-group">
                <div className="col-lg-3 col-md-4 col-sm-6">
                  <div className="form-group">
                    <label className="ingrediant-label" htmlFor="#">
                      Ingredient
                    </label>
                    <input
                      type="text"
                      style={{ width: "100%" }}
                      className="form-control Ingredient-form "
                      placeholder=""
                      name="name"
                      onChange={(e) => ingrdntChangeHandler(e, key)}
                      value={ingrdnt?.name}
                    />
                  </div>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="#" className="ingrediant-label">
                      Amount
                    </label>
                    <input
                      type="text"
                      className="form-control mr-0 Ingredient-form "
                      style={{ width: "90%" }}
                      list="datalistOptions"
                      id="exampleDataList"
                      placeholder=""
                      name="amount"
                      onChange={(e) => ingrdntChangeHandler(e, key)}
                      value={ingrdnt?.amount}
                    />
                  </div>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-6">
                  <div className="form-group ing-group">
                    <label className="ingrediant-label" htmlFor="#">
                      Measurement
                    </label>
                    <input
                      type="text"
                      style={{ width: "90%" }}
                      className="form-control Ingredient-form "
                      placeholder=""
                      name="measurement"
                      onChange={(e) => ingrdntChangeHandler(e, key)}
                      value={ingrdnt?.measurement}
                    />
                  </div>
                </div>
                {/* plus btn */}
                {key + 1 < ingredients?.length && (
                  <div
                    className="col-lg-1 col-md-2 col-sm-6"
                    onClick={() => IngredientDecHandler(key)}
                  >
                    <div className="centered-box form-group ingredient-icon">
                      <span className="plus-icon">
                        <i className="bi bi-dash"></i>
                      </span>
                    </div>
                  </div>
                )}
                {key + 1 == ingredients?.length && (
                  <div
                    className="col-lg-1 col-md-2 col-sm-6"
                    onClick={IngredientIncHandler}
                  >
                    <div className="centered-box form-group ingredient-icon">
                      <span className="plus-icon">
                        <i className="bi bi-plus"></i>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {/* <!-- /* text area */}
          <div>
            <h2 className="text-green meta-h2">Preparation</h2>
            <div className="row">
              <div className="col-md">
                <div className="text-area-form">
                <i className="bi text-area-icon text-green bi-list-ul"></i>
                  <textarea
                    style={{ width: "96%", height: "50vh" }}
                    placeholder="Start writing from here..."
                    className={`form-control text-area-input  ${
                      errors.preparation && "Invalid"
                    }`}
                    {...register("preparation", { required: true })}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-green meta-h2">Origin</h2>
            <div className="row">
              <div className="col-md">
                <div className="text-area-form">
                <i className="bi text-area-icon text-green bi-list-ul"></i>
                  <textarea
                    style={{ width: "96%", height: "50vh" }}
                    placeholder="Start writing from here..."
                    className={`form-control text-area-input  ${
                      errors.origin && "Invalid"
                    }`}
                    {...register("origin", { required: true })}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-green meta-h2">Nutrition</h2>
            {nutrition.map((nutr: nutritionprops, key: number) => {
              return (
                <div key={key} className="row ingridient-form-group">
                  <div className="col-lg-3 col-md-3 col-sm-4">
                    <div className="form-group">
                      <label className="ingrediant-label" htmlFor="#">
                        Nutrition Name
                      </label>
                      <input
                        type="text"
                        style={{ width: "100%" }}
                        className="form-control Ingredient-form "
                        id="#"
                        placeholder=""
                        name="name"
                        onChange={(e) => nurtriChangeHandler(e, key)}
                        value={nutr?.name}
                      />
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-3 col-sm-4">
                    <div className="form-group">
                      <label htmlFor="#" className="ingrediant-label">
                        Quantity/Percentage %
                      </label>
                      <input
                        className="form-control mr-0 Ingredient-form "
                        style={{ width: "100%" }}
                        list="datalistOptions"
                        id="exampleDataList"
                        placeholder=""
                        name="quantity"
                        onChange={(e) => nurtriChangeHandler(e, key)}
                        value={nutr?.quantity}
                      />
                    </div>
                  </div>
                  {key + 1 < nutrition?.length && (
                    <div
                      className="col-lg-1 col-md-2 col-sm-6"
                      onClick={() => nutritionDecHandler(key)}
                    >
                      <div className="centered-box form-group ingredient-icon">
                        <span className="plus-icon">
                          <i className="bi bi-dash"></i>
                        </span>
                      </div>
                    </div>
                  )}
                  {key + 1 == nutrition?.length && (
                    <div
                      className="col-lg-1 col-md-2 col-sm-6"
                      onClick={nutritionIncHandler}
                    >
                      <div className="centered-box form-group ingredient-icon">
                        <span className="plus-icon">
                          <i className="bi bi-plus"></i>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <button
              type="submit"
              className="btn ingdent-btn update-bTn mt-5"
              disabled={UpdateLoading}
            >
              {UpdateLoading ? (
                <div className="spinner-border text-success" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <span> Update recipe</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
