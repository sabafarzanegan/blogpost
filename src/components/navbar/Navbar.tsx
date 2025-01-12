import { useState } from "react";
import { menuItem } from "../../lib/helper";
import "./Navbar.css";
import { FaBars } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Button from "../ui/button/Button";

import Avatar from "../avatar/Avatar";

function Navbar() {
  const [isShow, setIsShow] = useState(false);

  return (
    <header>
      {/* mobile nav  */}

      <div className="visible hide-md">
        <button onClick={() => setIsShow((prev) => !prev)}>
          {isShow ? (
            <MdOutlineCancel className="svg-bar" />
          ) : (
            <FaBars className="svg-bar" />
          )}
        </button>
        {isShow && (
          <div className="content-mobile-menu center">
            <nav>
              <ul>
                {menuItem.map((link, i) => (
                  <li onClick={() => setIsShow(false)} key={i}>
                    <Link to={link.link}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>

      {/* desktop Nav */}
      <div className="hidden show-md">
        <nav>
          <ul className="ul-desk">
            {menuItem.map((link, i) => (
              <li onClick={() => setIsShow(false)} key={i}>
                <Link to={link.link}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* logo */}
      <Link to="/" className="center">
        <h4>تکنوبلاگ</h4>
        <img src="/Logo (2).png" alt="logo" />
      </Link>
      <SignedOut>
        <Link to="/login">
          <Button color="primary" size="md" rounded="md">
            {" "}
            ورود👋
          </Button>
        </Link>
      </SignedOut>
      <SignedIn>
        {/* <UserButton /> */}
        <Avatar />
      </SignedIn>
      {/* search btn */}
      {/* <Searchbtn
        setIsShowSearch={setIsShowSearch}
        isShowSearch={isShowSearch}
      /> */}
    </header>
  );
}

export default Navbar;
