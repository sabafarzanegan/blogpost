import { Link } from "react-router-dom";
import { post } from "../../lib/Type";
import "./card.css";
import { BiCategoryAlt } from "react-icons/bi";
function Card({ post }: { post: post | undefined }) {
  return (
    <Link to={`postlist/${post?.id}`} className="card-blog-container">
      <img src={post?.img} alt={post?.title} />
      <div className="blog-card-detail">
        <p>{post?.title}</p>
        <div>
          <span></span>
        </div>
        <div className="category-footer">
          <span className="cat-svg">
            <BiCategoryAlt />
          </span>
          <span>{post?.category}</span>
        </div>
      </div>
    </Link>
  );
}

export default Card;
