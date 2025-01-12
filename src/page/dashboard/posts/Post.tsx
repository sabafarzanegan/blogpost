import { useQuery } from "@tanstack/react-query";
import TableBlog from "../../../components/blog/tableblog/TableBlog";
import { Poststore } from "../../../store/Poststore";

function Post() {
  const { getPostsTable } = Poststore((state) => state);

  const { data, isPending } = useQuery({
    queryKey: ["adminposts"],
    queryFn: getPostsTable,
  });

  if (isPending) {
    return (
      <div className="center">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <div style={{ width: "80%" }}>{data && <TableBlog data={data} />}</div>
  );
}

export default Post;
