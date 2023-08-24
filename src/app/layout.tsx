import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
// import localFont from "next/font/local";
import BootstrapProvider from "@/components/BootstrapProvide";
import StoreProvider from "@/components/StoreProvider";
// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Recipe | Home",
  description:
    "Welcome to our delightful recipe site, where culinary inspiration comes to life! Explore a world of mouthwatering recipes that cater to every taste and occasion. From savory main courses to delectable desserts, our carefully curated collection offers something for everyone",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <BootstrapProvider>{children}</BootstrapProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
