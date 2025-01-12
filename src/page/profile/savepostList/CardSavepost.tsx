import { useQuery } from "@tanstack/react-query";
import { Poststore } from "../../../store/Poststore";
import { BiCategoryAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

function CardSavePost({ postId }: { postId: number | undefined }) {
  const { getPost } = Poststore((state) => state);
  const { data: post, isPending } = useQuery({
    queryKey: ["savecard", postId],
    queryFn: () => getPost(postId),
  });
  if (isPending) {
    return (
      <div className="center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <Link to={`/postlist/${post && post[0].id}`}>
      <div className="card-item">
        <div className="image-wrapper">
          <img src={post && post[0].img} alt="" />
        </div>
        <div className="card-body-post">
          <div className="title-post">
            <h5>{post && post[0].title}</h5>
            {/* <p>{post.desc}</p> */}
          </div>
          <div className="card-post-footer">
            <div className="center">
              <span>{post && post[0].category}</span>
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

export default CardSavePost;
