import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Poststore } from "../../store/Poststore";
import Title from "../../components/title/Title";
import CardPost from "../../components/allpost/CardPost/CardPost";
import "./search.css";

function Search() {
  const { link } = useParams();
  const { getPostBasedOnCategory } = Poststore((state) => state);

  const { data: categorizeData, isPending } = useQuery({
    queryKey: ["cetegorizePosts"],
    queryFn: () => getPostBasedOnCategory(link),
  });
  console.log(categorizeData);
  if (isPending) {
    return (
      <div className="center" style={{ height: "100vh" }}>
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <div>
      <Title>{link}</Title>
      <div>
        <div className="allpost-container">
          {categorizeData?.map((post) => (
            <CardPost post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
