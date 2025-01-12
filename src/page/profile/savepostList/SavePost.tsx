import { useQuery } from "@tanstack/react-query";

import { Poststore } from "../../../store/Poststore";
import { user } from "../../../lib/Type";
import CardSavePost from "./CardSavepost";

function SavePost({ data }: { data: user | undefined }) {
  const { getSavedPosts } = Poststore((state) => state);

  const { data: savePosts, isPending: ispendingsavepost } = useQuery({
    queryKey: ["savepost"],
    queryFn: () => getSavedPosts(data?.id),
  });
  console.log(savePosts);
  if (ispendingsavepost) {
    return (
      <div className="center">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <div className="allpost-container" style={{ marginTop: "20px" }}>
      {savePosts?.map((item) => (
        <CardSavePost postId={item.post} />
      ))}
    </div>
  );
}

export default SavePost;
