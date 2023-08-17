
import SearchListItem from "./SearchList/SearchListItem";
import "./SearchMenu.css"
import SearchMenuItem from "./SearchMenuItem/SearchMenuItem";
const SearchMenu = () => {
  return (
    <div id="searchMenu" className="searchMenuWrapper">
      <div className="row mx-0">
        <div className="col">
          <ul className="searchMenuListWrapper">
            <SearchListItem />
            <SearchListItem />
            <SearchListItem />
            <SearchListItem />
            <SearchListItem />
            <SearchListItem />
            <SearchListItem />
          </ul>
        </div>
        <div className="col searchCardCol">
          <div>
            {/* <!-- card --> */}
            {/* <a href="search.html"> */}
            <SearchMenuItem />
            {/* </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchMenu;
