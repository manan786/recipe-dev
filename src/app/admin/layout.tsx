"use client";
import { usePathname } from "next/navigation";
import GlobalNav from "@/components/GlobalNav/GlobalNav";
import "./index.css";
import { useState, useEffect } from "react";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [Menu, setMenu] = useState(false);
  // const [Menu, setMenu] = useState(window.innerWidth > 1200 ? true : false);
  const pathname = usePathname();
  const RootNode = ["/admin/login"];

  useEffect(() => {
    const width = window.innerWidth;
    setMenu(width > 1200);
  }, []);

  const ClickHandler = () => {
    setMenu((prev) => !prev);
  };
  return (
    <>
      {RootNode?.includes(pathname) ? (
        children
      ) : (
        <div className="container-fluid px-0">
          <div className="responsive-header d-xl-none d-block">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0 text-white">Most Searched Recipies</h3>
              <div onClick={ClickHandler}>
                <span id="OpenMenu" className="bar-icon"></span>
              </div>
            </div>
          </div>
          <div className="d-flex flex-xl-row flex-column align-items-stretch">
            {/* {RootNode?.includes(pathname) ? null : } */}
            <GlobalNav Menu={Menu} />
            <div id="Recipedash" className="dashboard-content">
              <div className="client-dashboard mx-auto">
                <div className="mx-lg-4 mx-3 py-4">{children}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
