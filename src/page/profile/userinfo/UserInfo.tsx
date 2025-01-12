import { BiUser } from "react-icons/bi";
import "./userInfo.css";
import { useUser } from "@clerk/clerk-react";

import { UserStore } from "../../../store/UserStore";
import { useQuery } from "@tanstack/react-query";
import { MdEmail } from "react-icons/md";
import UserInform from "./UserInform";

function UserInfo() {
  const { user } = useUser();
  const { findUser } = UserStore((state) => state);
  const { data, isPending } = useQuery({
    queryKey: ["userinfo"],
    queryFn: () => findUser(user?.id),
  });
  if (isPending) {
    return (
      <div className="center">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <div className="user-info-container">
      <h2>اطلاعات کاربر</h2>
      <div className="card-user-info">
        <div className="user-info-item">
          <span className="center">
            <BiUser /> نام کاربری
          </span>
          <p>{data?.username}</p>
        </div>
        <div className="user-info-item">
          <span className="center">
            <MdEmail /> ایمیل
          </span>
          <p>{data?.email}</p>
        </div>
      </div>
      <UserInform />
    </div>
  );
}

export default UserInfo;
