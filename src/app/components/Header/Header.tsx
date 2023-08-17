import Image from "next/image";
import searchIcon from "@/app/assets/searchIcon.svg";
import SearchMenu from "@/app/components/SearchMenu/SearchMenu";
import Print from "@/app/components/PrintArea/Print";
import "./Header.css";
import Link from "next/link";
const Header = () => {
  return (
    <header className="container-fluid headerBg">
      <div className="row">
        <div className="col-11 mx-auto max-width py-3">
          <div className="row">
            <div className="col-lg-6">
              <div>
                <Link href={'/'} className="headerHead">
                  Most Searched Recipes
                </Link>
                <div className="searchMenuMobWrapper">
                  <form className="headerSearch">
                    <input
                      type="text"
                      placeholder="Search Recipe and more..."
                    />
                    <button type="submit">
                      <Image
                        src={searchIcon}
                        className="img-fluid"
                        alt="Picture of the author"
                      />
                    </button>
                    {/* <!-- search menu --> */}
                    <SearchMenu />
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <Print />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
