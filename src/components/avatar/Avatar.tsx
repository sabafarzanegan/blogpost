import { SignOutButton, useUser } from "@clerk/clerk-react";
import "./avatar.css";
import { useEffect, useState } from "react";
import { supabase } from "../../upabaseClient";
import { user } from "../../lib/Type";
import { Link } from "react-router-dom";
import { BiLogOut, BiUser } from "react-icons/bi";

function Avatar() {
  const { user } = useUser();
  const [userData, setUserData] = useState<user>();
  const [isShowLinks, setIsShowLinks] = useState<boolean>(false);
  const findCurrentUser = async () => {
    const { data } = await supabase
      .from("user")
      .select("*")
      .eq("clerkUserId", user?.id);
    console.log(data);
    if (data) {
      setUserData(data[0]);
    }
  };
  useEffect(() => {
    findCurrentUser();
  }, []);

  return (
    <div className="profile-container">
      <div
        onClick={() => setIsShowLinks((prev) => !prev)}
        className="profile-img">
        <img src={userData?.img} />
      </div>
      {isShowLinks && (
        <div className="profile-links">
          <ul>
            <li
              className="center profile-info"
              onClick={() => setIsShowLinks(false)}>
              <BiUser />
              <Link to="/profile/user-info">حساب کاربری</Link>
            </li>
            <li className="signOutbtn" onClick={() => setIsShowLinks(false)}>
              <SignOutButton>
                <button
                  style={{
                    display: "flex",
                    alignContent: "space-between",
                    alignItems: "center",
                  }}>
                  <BiLogOut />
                  <span style={{ padding: "0px 10px" }}>خروج</span>
                </button>
              </SignOutButton>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Avatar;
