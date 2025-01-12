import { post } from "../../../lib/Type";
import { supabase } from "../../../upabaseClient";
import "./CardPost.css";
import { BiCategoryAlt } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

function CardPost({ post }: { post: post }) {
  const currentUser = async () => {
    try {
      const { data } = await supabase
        .from("user")
        .select("*")
        .eq("id", post.user);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: currentUser,
  });

  return (
    <Link to={`/postlist/${post.id}`}>
      <div className="card-item">
        <div className="image-wrapper">
          <img src={post.img} alt="" />
        </div>
        <div className="card-body-post">
          <div className="title-post">
            <h5>{post.title}</h5>
            {/* <p>{post.desc}</p> */}
          </div>
          <div className="card-post-footer">
            <div>
              <span>{user ? user[0].username : ""}</span>
            </div>
            <div className="center">
              <span>{post.category}</span>
              <span>
                <BiCategoryAlt />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CardPost;
