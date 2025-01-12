import { useEffect, useState } from "react";
import { comment } from "../../../lib/Type";
import { supabase } from "../../../upabaseClient";
import "./cardcomment.css";
type commentProp = {
  item: comment | undefined;
};
function CardComment({ item }: commentProp) {
  const [user, setUser] = useState<
    { username: any; img: any } | null | undefined
  >();
  const getUser = async () => {
    try {
      const { data, error } = await supabase
        .from("user")
        .select("username,img")
        .eq("id", item?.user);
      if (!error) {
        setUser(data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  console.log(user);

  return (
    <div className="card-comment-container">
      <div className="user-info">
        <div>
          <img src={user?.img} alt={user?.username} />
        </div>
        <span>{user?.username}</span>
      </div>
      <p>{item?.content}</p>
    </div>
  );
}

export default CardComment;
