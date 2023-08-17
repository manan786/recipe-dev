"use client";
import { useEffect } from "react";
function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // @ts-ignore
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return <main>{children}</main>;
}

export default Providers;
