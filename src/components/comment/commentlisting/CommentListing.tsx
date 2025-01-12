import { useQuery } from "@tanstack/react-query";
import "./CommentListing.css";
import { CommentStore } from "../../../store/CommentStore";
import CardComment from "../CardComment/CardComment";

function CommentListing({ postId }: { postId: number | undefined }) {
  const { getAllComments } = CommentStore((state) => state);
  const { data } = useQuery({
    queryKey: ["comments"],
    queryFn: () => getAllComments(postId),
  });

  return (
    <div>
      {data?.map((item) => (
        <CardComment item={item} />
      ))}
    </div>
  );
}

export default CommentListing;
