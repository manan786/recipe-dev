"use client";
import SearchRecipes from "../components/SearchRecipes";
import ListedRecipeList from "./components/ListedRecipeList";
import RecipeCate from "../components/RecipeCate";
import {
  useDeleteRecipeMutation,
  useGetListedRecipesQuery,
  useUpdateStatusRecipeMutation,
} from "@/redux/features/recipe-admin/recipeApiSlice";
import React, { ChangeEvent, useState } from "react";
import StatusMessageModal from "../components/StatusMessageModal";
import { Modal } from "react-bootstrap";

const ManageRecipes = () => {
  const [SearchValue, setSearchValue] = useState<string>("");
  const [Recipecate, setRecipecate] = useState<string>("");
  const [DeleteID, setDeleteID] = useState<string | null>(null);
  const [ChangeStatusMess, setChangeStatusMess] = useState<string>("");
  const [StatusMessModal, setStatusMessModal] = useState<boolean>(false);
  const [DeleteRecipe, { isLoading: LoadingDelete }] =
    useDeleteRecipeMutation();
  const [UpdateStatus, { isLoading: LoadingStatus }] =
    useUpdateStatusRecipeMutation();
  // useDeleteRecipeMutation
  const [debouncedInputValue, setDebouncedInputValue] =
    React.useState<string>("");
  const { data, isFetching, refetch }: any = useGetListedRecipesQuery(
    {
      cate: Recipecate,
      search: debouncedInputValue,
    },
    { refetchOnMountOrArgChange: true }
  );
  const recipeList = data?.data?.data;
  React.useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedInputValue(SearchValue);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [SearchValue]);

  const SearchChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const CateChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setRecipecate(e.target.value);
  };
  const OpenModalHandler = async (id: string, key: string) => {
    if (key == "delete") {
      setStatusMessModal(true);
      setDeleteID(id);
    } else {
      // view hidden
      try {
        const res: any = await UpdateStatus(id);
        setChangeStatusMess(
          res.data.data.data.active
            ? "Recipe View Successfully!"
            : "Recipe Hidden Successfully!"
        );
        setStatusMessModal(true);
      } catch (e) {
        console.log(e);
      }
    }
  };
  const DeleteHandler = async () => {
    try {
      await DeleteRecipe(DeleteID ?? "");
      setStatusMessModal(false);
      setDeleteID(null);
    } catch (e) {
      console.log(e);
    }
  };
  const HandlerCloseModal = () => {
    setStatusMessModal(false);
  };
  return (
    <>
      <Modal
        centered
        size="sm"
        show={StatusMessModal}
        onHide={HandlerCloseModal}
        className="StatusMessModal"
      >
        <div className="SMModalWrapp">
          <div className="SMModal">
            <div className="ModalIcon">
              <span>
                <i className="bi bi-exclamation-circle"></i>
              </span>
            </div>
            <p className="ModalText">
              {DeleteID
                ? "Are you sure, you want to delete the Recipe?"
                : ChangeStatusMess}
            </p>
            <button
              className="btn ingdent-btn py-1 mt-0"
              onClick={HandlerCloseModal}
            >
              {DeleteID ? "Go Back" : "Got it"}
            </button>
            {DeleteID && (
              <button
                className="btn ingdent-btn py-1 mt-3"
                style={{
                  background: "transparent",
                  border: "1px solid #54a461",
                  color: "#54a461",
                }}
                onClick={DeleteHandler}
              >
                {LoadingDelete ? (
                  <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <span>Delete</span>
                )}
              </button>
            )}
          </div>
        </div>
      </Modal>
      <div className="RD-content">
        <div className="LR-wrapp">
          <h1 className="LR-Title">Manage Recipes</h1>
          <div className="LR-TopHead mt-4">
            <div className="w-sm-50">
              <SearchRecipes
                ChangeHandler={SearchChangeHandler}
                value={SearchValue}
              />
            </div>
            <RecipeCate
              ChangeHandler={CateChangeHandler}
              Recipecate={Recipecate}
            />
          </div>
          <div className="mt-5 LRTableWrapp">
            <table className="table LRTable">
              <thead>
                <tr>
                  <th scope="col" style={{ width: "140px" }}>
                    <div>Recipe Name</div>
                  </th>
                  <th scope="col" style={{ width: "100px" }}>
                    <div>Category</div>
                  </th>
                  <th scope="col" style={{ width: "240px" }}>
                    <div>Description</div>
                  </th>
                  <th scope="col" style={{ width: "120px" }}>
                    <div>Preparation</div>
                  </th>
                  <th scope="col" style={{ width: "120px" }}>
                    <div>Cook</div>
                  </th>
                  <th scope="col" style={{ width: "130px" }}>
                    <div>Serves</div>
                  </th>
                  <th scope="col" style={{ width: "150px" }}>
                    <div>Action</div>
                  </th>
                </tr>
              </thead>
              <ListedRecipeList
                recipeList={recipeList}
                isFetching={isFetching}
                OpenModalHandler={OpenModalHandler}
                LoadingStatus={LoadingStatus}
              />
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageRecipes;
