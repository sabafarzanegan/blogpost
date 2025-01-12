import { Link, Outlet } from "react-router-dom";
import { userLinks } from "../../lib/helper";
import "./profile.css";
import { useQuery } from "@tanstack/react-query";
import { UserStore } from "../../store/UserStore";
import { useUser } from "@clerk/clerk-react";
function Profile() {
  const { user } = useUser();
  const { findUser } = UserStore((state) => state);
  const { data } = useQuery({
    queryKey: ["userdata"],
    queryFn: () => findUser(user?.id),
  });
  return (
    <div>
      <div className="item-user-link">
        {userLinks.map((item) => (
          <Link to={item.link}>
            <span>{item.name}</span>
          </Link>
        ))}
        {data?.role === "admin" && (
          <Link to="/dashboard/create">داشبورد ادمین</Link>
        )}
      </div>
      <Outlet />
    </div>
  );
}

export default Profile;
