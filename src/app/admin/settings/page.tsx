"use client";
import lock from "@/assets/lock.png";
import { PasswordReg } from "@/lib/Regex";
import { useUpdateUserMutation } from "@/redux/features/recipe-admin/recipeApiSlice";
import { useAppSelector } from "@/redux/store";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import StatusMessage from "../components/StatusMessage";
type typeProps = {
  currentPassword: boolean;
  newPassword: boolean;
};
const Settings = () => {
  const [UpdateCredential, { isLoading }] = useUpdateUserMutation();
  const counter = useAppSelector((state: any) => state.auth);
  const [ViewPassword, setViewPassword] = useState<typeProps>({
    currentPassword: false,
    newPassword: false,
  });
  const [LoginState, setLoginState] = useState<{
    error: string | undefined;
    success: string | undefined;
  }>({
    error: undefined,
    success: undefined,
  });
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      email: "",
    },
  });
  const ViewPasswordHandler = (val: "currentPassword" | "newPassword") => {
    setViewPassword((prev) => {
      return { ...prev, [val]: !prev?.[val] };
    });
  };
  const onSubmit = async (data: ResetUser) => {
    try {
      data.email = counter.user;
      const userData = await UpdateCredential({
        email: data.email,
        oldPassword: data.currentPassword,
        password: data.newPassword,
      }).unwrap();
      if (userData.error) {
        return setLoginState((prev: any) => {
          return {
            ...prev,
            error: "Something  went Wrong!",
            success: undefined,
          };
        });
      }
      reset({
        currentPassword: "",
        newPassword: "",
        email: "",
      });
      setLoginState((prev: any) => {
        return { ...prev, error: undefined, success: "Credentials Updated!" };
      });
    } catch (err: any) {
      setLoginState((prev: any) => {
        return { ...prev, error: err?.data?.message, success: undefined };
      });
      console.log(err?.data?.message);
    }
  };
  return (
    <div className="RD-content">
      <div className="LR-wrapp">
        <StatusMessage LoginState={LoginState} setLoginState={setLoginState} />
        <h1 className="LR-Title">Settings</h1>
        {/* <!--  --> */}
        <div className="SettingsWrapp mt-4 p-sm-4 p-2">
          <div className="InputWrapp">
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div
                className={`InputDiv mt-4 ${
                  errors.currentPassword && "Invalid"
                }`}
              >
                <div className="CurrentDiv">
                  <label
                    htmlFor=""
                    className={`${errors.currentPassword && "text-danger"}`}
                  >
                    Current Password
                  </label>
                  <input
                    type={ViewPassword?.currentPassword ? "text" : "password"}
                    className=""
                    placeholder="Current Password"
                    {...register("currentPassword", {
                      required: true,
                      pattern: PasswordReg,
                    })}
                  />
                </div>
                <span className="Lockspan">
                  <Image
                    src={lock}
                    className="img-fluid"
                    alt="searchIcon Image"
                  ></Image>
                </span>
                <span
                  className="viewSpan"
                  onClick={() => ViewPasswordHandler("currentPassword")}
                >
                  {ViewPassword?.currentPassword ? (
                    <i className="bi bi-eye-fill"></i>
                  ) : (
                    <i className="bi bi-eye-slash"></i>
                  )}
                </span>
              </div>
              {errors.currentPassword && (
                <div
                  id="validationServer04Feedback"
                  className="invalid-feedback"
                >
                  {errors.currentPassword &&
                  errors.currentPassword?.type == "required"
                    ? "Required"
                    : "Your password must be at least capital and special character!"}
                </div>
              )}
              <div
                className={`InputDiv mt-4 ${errors.newPassword && "Invalid"}`}
              >
                <div className="CurrentDiv">
                  <label
                    htmlFor=""
                    className={`${errors.newPassword && "text-danger"}`}
                  >
                    New Password
                  </label>
                  <input
                    type={ViewPassword?.newPassword ? "text" : "password"}
                    {...register("newPassword", {
                      required: true,
                      pattern: PasswordReg,
                    })}
                    className=""
                    placeholder="New Password"
                  />
                </div>
                <span className="Lockspan">
                  <Image
                    src={lock}
                    className="img-fluid"
                    alt="searchIcon Image"
                  ></Image>
                </span>
                <span
                  className="viewSpan"
                  onClick={() => ViewPasswordHandler("newPassword")}
                >
                  {ViewPassword?.newPassword ? (
                    <i className="bi bi-eye-fill"></i>
                  ) : (
                    <i className="bi bi-eye-slash"></i>
                  )}
                </span>
              </div>
              {errors.newPassword && (
                <div
                  id="validationServer04Feedback"
                  className="invalid-feedback"
                >
                  {errors.newPassword && errors.newPassword?.type == "required"
                    ? "Required"
                    : "Your password must be at least capital and special character!"}
                </div>
              )}
              <button
                type="submit"
                className="btn mt-4 SaveBtn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <span>Save Changes</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
