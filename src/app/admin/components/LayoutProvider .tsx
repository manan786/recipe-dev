"use client";

// Use usePathname for catching route name.
import { usePathname } from "next/navigation";

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <>
      {pathname === "/posts" && <h1>Welcome to Posts page!</h1>}
      {children}
    </>
  );
};
