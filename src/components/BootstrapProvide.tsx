"use client";
import { useEffect } from "react";
import Header from "@/components/Header/Header";
import { usePathname } from "next/navigation";
function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // const noHeader = [
  //   "/admin",
  //   "/admin/manage-ads",
  //   "/admin/list-new-recipe",
  //   "/admin/listed-recipes",
  //   "/admin/manage-recipes",
  //   "/admin/settings",
  //   "/admin/faq",
  //   "/admin/login",
  // ];
  const DetailRecipe = "/admin";
  useEffect(() => {
    // @ts-ignore
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  // const condition =
  //   noHeader.includes(pathname) || pathname.startsWith(DetailRecipe);
  return (
    <main>
      {pathname.startsWith(DetailRecipe) ? null : <Header />}
      {children}
    </main>
  );
}

export default Providers;
