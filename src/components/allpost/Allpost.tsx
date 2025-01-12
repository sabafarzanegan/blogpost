import { useQuery } from "@tanstack/react-query";
import Title from "../title/Title";
import "./Allpost.css";
import CardPost from "./CardPost/CardPost";
import { Poststore } from "../../store/Poststore";
import { Link } from "react-router-dom";
function Allpost() {
  const { Posts, getAllposts } = Poststore((state) => state);
  useQuery({
    queryKey: ["posts"],
    queryFn: getAllposts,
  });

  return (
    <div>
      <Title>مقالات</Title>
      <div className="allpost-container">
        {Posts?.slice(-7)?.map((post) => (
          <CardPost post={post} />
        ))}

        <Link to="/postlist" className="center link-info-more">
          مشاهده بیشتر
        </Link>
      </div>
    </div>
  );
}

export default Allpost;
