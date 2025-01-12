import { Link, Outlet } from "react-router-dom";
import "./Dashlayout.css";
import { BiLogOut } from "react-icons/bi";
import { dashLinks } from "../../../lib/helper";
import { SignOutButton } from "@clerk/clerk-react";

function DashLayout() {
  // const toggleHandler = () => {
  //   document.querySelector(".dash-sidebar")?.classList.toggle("cpllapsed");
  // };
  return (
    <div className="dashboard-container">
      {/* sidebar */}
      <aside className="dash-sidebar">
        <div className="toggle-side">{/* <BiArrowBack /> */}</div>
        <nav>
          <ul className="nav-container">
            {dashLinks.map((item) => (
              <li>
                <Link className="" to={item.href}>
                  <span>{<item.icon />}</span>
                  <span className="nav-label">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="footer-sidebar">
            <SignOutButton>
              <button>
                <span>
                  <BiLogOut />
                </span>
                <span className="nav-label">خروج</span>
              </button>
            </SignOutButton>
          </div>
        </nav>
      </aside>
      {/* content */}
      <div className="content-dash">
        <Outlet />
      </div>
    </div>
  );
}

export default DashLayout;
