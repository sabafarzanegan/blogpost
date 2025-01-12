import { ReactNode } from "react";
import { supabase } from "../../upabaseClient";

import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import accessDenied from "../../../public/undraw_access-denied_krem (1).svg";
import { useQuery } from "@tanstack/react-query";
function PrivateRoute({ children }: { children: ReactNode }) {
  const { user } = useUser();

  const findCurrentUser = async () => {
    try {
      const { data } = await supabase
        .from("user")
        .select("*")
        .eq("clerkUserId", user?.id);
      console.log(data);
      if (data) {
        return data;
      }
    } catch (error) {}
  };
  const { data, isPending } = useQuery({
    queryKey: ["userdata", user?.id],
    queryFn: findCurrentUser,
  });

  if (isPending) {
    return (
      <div className="center">
        <div className="loader"></div>
      </div>
    );
  }
  console.log(data);

  return (
    <div style={{ width: "100% ", margin: "0 auto" }}>
      {data && data[0]?.role === "admin" ? (
        children
      ) : (
        <Link to="/" className="center" style={{ width: "100% " }}>
          شما اجازه دسترسی به این صفحه را ندارید
          <div className="center">
            <img
              style={{ width: "80%" }}
              src={accessDenied}
              alt="accessDenied"
            />
          </div>
        </Link>
      )}
    </div>
  );
}

export default PrivateRoute;
