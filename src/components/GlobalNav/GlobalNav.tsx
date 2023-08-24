"use client";
import Link from "next/link";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { demos, type Item } from "./Navs";
import Image from "next/image";
import Logout from "@/assets/LogoutIcon.png";
import { getCookie } from "cookies-next";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { logOut } from "@/redux/features/auth/authSlice";
import { useEffect, useState } from "react";

const GlobalNav = ({ Menu }: { Menu: boolean }) => {
  const router = useRouter();
  const usedispatch = useAppDispatch();
  const counter = useAppSelector((state: any) => state.auth);
  const [first, setfirst] = useState("");
  useEffect(() => {
    setfirst(counter.user);
  }, [counter]);

  // console.log("counter",)
  const LogoutHandler = () => {
    usedispatch(logOut());
    // deleteCookie("loggedIn");
    // deleteCookie("user");
    router.push("login");
  };
  return (
    <div
      className="PEERdash-sidebar d-xl-block"
      style={{ width: `${Menu ? "280px" : "0px"}` }}
    >
      <div className="PEERdash-sidebar-wrapper">
        <div className="logo-dashboard">
          <Link href={"/admin"} className="LogoTitle">
            <h4>Most Searched Recipies</h4>
          </Link>
        </div>
        <ul className="PEERLink-main">
          {demos.map((item) => (
            <GlobalNavItem key={item.slug} item={item} />
          ))}
          <li className="mt-auto">
            <button onClick={LogoutHandler}>
              {/* <Link href={"login"}> */}
              <div className="LoutWrapp">
                <div className="d-flex align-items-center gap-2">
                  <div className="LogoutLogo">
                    <span>
                      <i className="bi bi-person-fill-lock"></i>
                    </span>
                  </div>
                  <div className="UsernameWrapp">
                    <span className="LogoutUsr">{first}</span>
                    <span className="SuperAdmin">Super Admin</span>
                  </div>
                </div>
                <div>
                  <Image
                    src={Logout}
                    alt="Logout Icon"
                    className="img-fluid"
                  ></Image>
                </div>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default GlobalNav;

function GlobalNavItem({ item }: { item: Item }) {
  const segment = useSelectedLayoutSegment();
  const dt = segment ?? "";
  let isActive = item.slug === "admin/" + dt;
  return (
    <li>
      <Link
        href={`/${item.slug}`}
        className={`${isActive && "activeLink"} PEERLink PEERLink-w3s`}
      >
        <span>
          <i className={`bi ${item?.icon}`}></i>
        </span>
        <span className=""> {item.name}</span>
      </Link>
    </li>
  );
}
