import "./searchbtn.css";
import { BiSearchAlt } from "react-icons/bi";

interface searchBtn {
  setIsShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  isShowSearch: boolean;
}
function Searchbtn({ setIsShowSearch, isShowSearch }: searchBtn) {
  const showSearchHandler = () => {
    setIsShowSearch((prev) => !prev);
  };
  return (
    <div>
      <BiSearchAlt onClick={showSearchHandler} className="svg-search" />

      <div>
        {isShowSearch && (
          <>
            <div className="content-search center">
              <h5>جست و جو کنید</h5>
              <div className="search-container">
                <button className="btn-search">
                  <BiSearchAlt />
                </button>
                <input type="text" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Searchbtn;
