"use client";
import Image from "next/image";
import lock from "@/assets/lock.png";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { PasswordReg } from "@/lib/Regex";
import { useUserSigningMutation } from "@/redux/features/recipe-client/recipeApiSlice";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { useAppDispatch } from "@/redux/store";
import { setCredentials } from "@/redux/features/auth/authSlice";
import StatusMessage from "../../components/StatusMessage";

const LoginForm = () => {
  const [ViewPassword, setViewPassword] = useState<{ password: boolean }>({
    password: false,
  });
  const usedispatch = useAppDispatch();
  const router = useRouter();
  // const cookieStore = cookies()
  const [LoginState, setLoginState] = useState<{
    error: string | undefined;
    success: string | undefined;
  }>({
    error: undefined,
    success: undefined,
  });
  const [login, { isLoading }] = useUserSigningMutation();
  // console.log("isLoading ddsd",isLoading)
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const ViewPasswordHandler = (val: "password") => {
    setViewPassword((prev) => {
      return { ...prev, [val]: !prev?.[val] };
    });
  };
  const onSubmit = async (data: LoginUser) => {
    try {
      const userData = await login(data).unwrap();
      // cookieStore.set("loggedIn", "true", { secure: true });
      usedispatch(
        setCredentials({
          accessToken: userData?.data?.accessToken,
          user: userData?.data?.email,
          role: userData?.data?.role,
        })
      );

      setLoginState((prev: any) => {
        return { ...prev, error: undefined, success: userData?.message };
      });
      reset({
        email: "",
        password: "",
      });
      setTimeout(() => {
        router.push("listed-recipes");
      }, 500);
    } catch (err: any) {
      setLoginState((prev: any) => {
        return { ...prev, error: err?.data?.message, success: undefined };
      });
      console.log(err?.data?.message);
    }
  };
  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <StatusMessage LoginState={LoginState} setLoginState={setLoginState} />
      <h5 className="aDMINLOGIN mb-sm-5 mb-4">ADMIN LOGIN</h5>
      <div className={`InputDiv ${errors.email && "Invalid"}`}>
        <div className="CurrentDiv">
          <label htmlFor="" className={`${errors.email && "text-danger"}`}>
            Email
          </label>
          <input
            type="email"
            id="exampleFormControlInput1"
            placeholder="Username"
            {...register("email", {
              required: true,
              pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            })}
          />
        </div>
        <span className="Lockspan">
          <i className="bi bi-person-fill"></i>
        </span>
      </div>
      {errors.email && (
        <div id="validationServer04Feedback" className="invalid-feedback">
          {errors.email?.type == "required"
            ? "Required"
            : "Please enter a username!"}
        </div>
      )}
      <div className={`InputDiv mt-4 ${errors.password && "Invalid"}`}>
        <div className="CurrentDiv">
          <label htmlFor="" className={`${errors.password && "text-danger"}`}>
            Password
          </label>
          {/* <input type="password" className="" placeholder="New Password" /> */}
          <input
            type={ViewPassword?.password ? "text" : "password"}
            id="examplepassword"
            placeholder="Password"
            {...register("password", { required: true, pattern: PasswordReg })}
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
          onClick={() => ViewPasswordHandler("password")}
        >
          {ViewPassword?.password ? (
            <i className="bi bi-eye-fill"></i>
          ) : (
            <i className="bi bi-eye-slash"></i>
          )}
        </span>
      </div>
      {errors.password && (
        <div id="validationServer04Feedback" className="invalid-feedback">
          {errors.password && errors.password?.type == "required"
            ? "Required"
            : "Your password must be at least capital and special character!"}
        </div>
      )}
      <button
        type="submit"
        className="btn mt-4 SaveBtn LoginBtn"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <span>Login</span>
        )}
      </button>
    </form>
  );
};

export default LoginForm;
