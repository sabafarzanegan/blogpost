import { useUser } from "@clerk/clerk-react";
import { ReactNode, useEffect, useState } from "react";
import { user } from "../../lib/Type";
import { supabase } from "../../upabaseClient";
import { Link } from "react-router-dom";
import login from "../../../public/undraw_mobile-login_4ntr (1).svg";
function ProfilePrivateRoute({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<user>();
  const { user } = useUser();

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
  }, [user?.id]);
  return (
    <div>
      {userData?.id ? (
        children
      ) : (
        <Link to="/login" className="center">
          ابتدا وارد سایت شوید
          <div>
            <img src={login} alt="" />
          </div>
        </Link>
      )}
    </div>
  );
}

export default ProfilePrivateRoute;
