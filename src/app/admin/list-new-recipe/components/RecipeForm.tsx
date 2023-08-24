"use client";
import { useCreateRecipeMutation } from "@/redux/features/recipe-admin/recipeApiSlice";
import { useGetRecipeCategoryQuery } from "@/redux/features/recipe-client/recipeApiSlice";
import { useState } from "react";
import { useForm } from "react-hook-form";
import StatusMessageModal from "../../components/StatusMessageModal";
import Image from "next/image";
import platesicon from "@/assets/plates-icon.png";
type CreateRecipeProps = {
  name: string;
  preparation_time: { hours: string; minutes: string; days: string } | {};
  cook_time: { hours: string; minutes: string; days: string } | {};
  serves: string;
  meta_description: string;
  ingredients: ingredientsObj[] | string;
  preparation: string;
  origin: string;
  nutrition: nutritionObj[] | string;
  image: string | null;
  categoriesId: string;
};

const IntialValue: CreateRecipeProps = {
  image: null,
  name: "",
  serves: "",
  categoriesId: "choose category",
  preparation_time: {},
  cook_time: {},
  meta_description: "",
  ingredients: [],
  preparation: "",
  origin: "",
  nutrition: [],
};

const RecipeForm = () => {
  const [SubmitRecipe, { isLoading: SubmitLoading }] =
    useCreateRecipeMutation();
  const [PreviewImg, setPreviewImg] = useState<string>("");
  const [image, setimage] = useState<undefined | any>(undefined);
  const [SuccessMess, setSuccessMess] = useState<{
    status: boolean;
    message: string;
  }>();
  const [imageError, setimageError] = useState<null | string | undefined>(null);
  const [ingredients, setingredients] = useState<ingredientsObj[]>([
    { name: "", amount: "", measurement: "" },
    { name: "", amount: "", measurement: "" },
  ]);
  const [StatusMessModal, setStatusMessModal] = useState<boolean>(false);
  const [nutrition, setnutrition] = useState<nutritionObj[]>([
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
  const {
    register,
    watch,
    setError,
    getValues,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: IntialValue,
  });

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
    if (file && !file.name.match(/\.(jpg|jpeg|png)$/i))
      return setimageError("File must be jpg, jpeg, png");
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const img: any = new window.Image();
        img.src = event.target.result;
        setPreviewImg("");
        img.onload = () => {
          if (img.width !== 450 || img.height !== 330)
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
    setimageError(null);
    setimage(undefined);
    setPreviewImg("");
    setingredients([
      { name: "", amount: "", measurement: "" },
      { name: "", amount: "", measurement: "" },
    ]);
    setcook_time({ days: 0, hours: 0, minutes: 0 });
    setpreparation_time({ days: 0, hours: 0, minutes: 0 });
    setnutrition([
      { name: "", quantity: "" },
      { name: "", quantity: "" },
    ]);
  };
  const onSubmit = async (data: CreateRecipeProps) => {
    if (data.categoriesId === "choose category" || !data.categoriesId) {
      setError("categoriesId", {
        type: "manual",
        message: "Please select a valid category",
      });
      return;
    }
    // Check Image
    if (imageError !== undefined) {
      return setimageError("Required");
    }
    if (image) {
      const caeID = recipeCateList.find(
        (cate: RecipeCate) => cate.name === data.categoriesId
      );
      data.preparation_time = JSON.stringify(preparation_time);
      data.cook_time = JSON.stringify(cook_time);
      data.ingredients = JSON.stringify(ingredients);
      data.nutrition = JSON.stringify(nutrition);
      data.categoriesId = caeID.id;
      data.image = image;
      const formData = new FormData();
      Object.keys(data).forEach((key: any) => {
        // @ts-ignore
        formData.append(key, data?.[key]);
      });
      // @ts-ignore
      // for (let pair of formData.entries()) {
      //   console.log(pair[0] + ", " + pair[1]);
      // }
      SubmitRecipe(formData)
        .then((res: any) => {
          console.log("res", res);
          if (res.error) {
            setStatusMessModal(true);
            return setSuccessMess({
              status: false,
              message: res.error?.data?.message ?? "No Recipe Create!",
            });
          }
          setStatusMessModal(true);
          setSuccessMess({
            status: true,
            message: "New Recipe Successfully Listed",
          });
          return RessetState();
        })
        .catch((e) => {
          console.log("e", e);
          setStatusMessModal(true);
          setSuccessMess({
            status: false,
            message: "No Recipe Listed!",
          });
        });
    } else {
      setimageError("Required");
    }
  };
  const HandlerCloseModal = () => {
    setSuccessMess({ status: false, message: "" });
    setStatusMessModal(false);
  };
  return (
    <div className="container-fluid ManageRecipe mt-4">
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
            <div className="col-md-6">
              <div className="upload-side">
                <div className="">
                  <div
                    className={`upload-div ${
                      imageError && "border border-danger"
                    }`}
                    style={{
                      backgroundImage: `${
                        PreviewImg
                          ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${PreviewImg})`
                          : ``
                      }`,
                      backgroundSize: "cover", // Adjust the background size as needed
                      backgroundPosition: "center",
                    }}
                    onClick={() => FileClickHandler("CoinImg")}
                  >
                    <span className="plus-icon">
                      {PreviewImg ? (
                        <i className="bi bi-pencil-square"></i>
                      ) : (
                        <i className="bi bi-plus-circle"></i>
                      )}
                    </span>
                    <div className="upload-content">
                      {image ? (
                        <p className={`${PreviewImg && "text-white"}`}>
                          {image.name ?? ""}
                        </p>
                      ) : (
                        <p>
                          Upload Recipe Thumbnail
                          <br />
                          Picture
                        </p>
                      )}
                    </div>
                    <div className={`${PreviewImg && "text-white"}`}>
                      PMax File size:
                      <strong
                        className={`${
                          PreviewImg ? "text-white" : "text-green"
                        } ps-1`}
                      >
                        5MB
                      </strong>
                    </div>
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
                    className={`form-control recipi-input ${
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
                    className={`form-control recipi-input ${
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
          <h2 className="text-green meta-h2">Meta Description</h2>
          <div className="mb-3">
            <input
              type="text"
              id="exampleFormControlInput1"
              placeholder=""
              className={`form-control meta-input ${
                errors.meta_description && "Invalid"
              }`}
              {...register("meta_description", { required: true })}
            />
          </div>
        </div>
        <div>
          <h2 className="text-green meta-h2">Ingredients</h2>
          {ingredients.map((ingrdnt: ingredientsObj, key: number) => {
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
                      className="form-control Ingredient-form"
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
                      className="form-control mr-0 Ingredient-form"
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
                      className="form-control Ingredient-form"
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
        </div>
        <div>
          <h2 className="text-green meta-h2">Preparation</h2>
          {/* <small className="text-danger">
            Note: Please add this symbol ^ to end, every points.
          </small> */}
          <div className="row">
            <div className="col-md">
              <div className="text-area-form width">
                <i className="bi text-area-icon text-green bi-list-ul"></i>
                <textarea
                  style={{ width: "96%", height: "50vh" }}
                  placeholder="Start writing from here..."
                  className={`form-control text-area-input ${
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
                  className={`form-control text-area-input ${
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
          {nutrition.map((nutr: nutritionObj, key: number) => {
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
                      className="form-control Ingredient-form"
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
                      className="form-control mr-0 Ingredient-form"
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
            disabled={SubmitLoading}
          >
            {SubmitLoading ? (
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <span>List New Recipe</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
