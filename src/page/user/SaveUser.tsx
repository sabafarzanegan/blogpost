import { useUser } from "@clerk/clerk-react";
import "./saveuser.css";
import { useEffect } from "react";
import { Addrole } from "../../lib/data";
import { supabase } from "../../upabaseClient";
import { useNavigate } from "react-router-dom";
function SaveUser() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    Addrole();
    if (!user) return;

    const saveUser = async () => {
      try {
        const { data: existinuser } = await supabase
          .from("user")
          .select("*")
          .eq("clerkUserId", user.id);

        console.log("existinguser", existinuser);

        if (existinuser?.length) {
          navigate("/");
          return;
        }
        const { error } = await supabase.from("user").upsert({
          clerkUserId: user.id,
          username: user.fullName,
          email: user.emailAddresses[0]?.emailAddress,
          img: user.imageUrl,
          role: user.unsafeMetadata.role,
        });
        if (!error) {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    };
    saveUser();
  }, [user, navigate]);
  return (
    <div className="container-redirect">
      <div className="loading-container">
        <p>در حال ذخیره کاربر</p>
        <div className="loader"></div>
      </div>
    </div>
  );
}

export default SaveUser;
