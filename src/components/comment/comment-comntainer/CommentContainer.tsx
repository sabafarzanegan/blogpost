import Title from "../../title/Title";
import AddComment from "../Addcomment/AddComment";
import CommentListing from "../commentlisting/CommentListing";
import "./commentcontainer.css";
type commemtProps = {
  postId: number | undefined;
};
function CommentContainer({ postId }: commemtProps) {
  return (
    <div className="comment-container">
      <Title>نظرات</Title>
      <AddComment postId={postId} />
      <CommentListing postId={postId} />
    </div>
  );
}

export default CommentContainer;
