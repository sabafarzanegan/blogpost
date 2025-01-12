import { useQuery } from "@tanstack/react-query";
import Card from "../card/Card";
import Title from "../title/Title";
import "./FeatureBlog.css";
import { Poststore } from "../../store/Poststore";
function FeatureBlog() {
  const { getAllposts } = Poststore((state) => state);
  const { data, isPending } = useQuery({
    queryKey: ["featurePost"],
    queryFn: getAllposts,
  });
  return (
    <div className="feature-blog">
      <Title>مقاله های ویژه</Title>
      <div className="featured-container">
        {isPending ? (
          <div className="center">
            <div className="loader"></div>
          </div>
        ) : (
          data?.slice(-3)?.map((post) => <Card post={post} />)
        )}
      </div>
    </div>
  );
}

export default FeatureBlog;
