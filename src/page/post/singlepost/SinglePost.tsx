import { useParams } from "react-router-dom";
import { Poststore } from "../../../store/Poststore";
import "./singlepost.css";
import ShowCategory from "./ShowCat/ShowCategory";
import { BiUserCircle } from "react-icons/bi";
import SaveContainer from "../../../components/saveComment/saveContainer/SaveContainer";
import { useEffect, useState } from "react";
import { UserStore } from "../../../store/UserStore";
import { post } from "../../../lib/Type";
import CommentContainer from "../../../components/comment/comment-comntainer/CommentContainer";
import { useUser } from "@clerk/clerk-react";
function SinglePost() {
  const { isSignedIn } = useUser();
  const [isPending, setIspending] = useState(true);
  const [data, setdata] = useState<post>();
  const { id } = useParams();
  const { getPost } = Poststore((state) => state);
  const { findCurrentUser, user } = UserStore((state) => state);

  useEffect(() => {
    const singlepost = async () => {
      try {
        const res = await getPost(id);
        findCurrentUser(res && res[0].user);
        if (res?.length) {
          setdata(res && res[0]);
          setIspending(false);
        }
      } catch (error) {
        setIspending(false);
      }
    };
    singlepost();
  }, [id]);

  if (isPending) {
    return (
      <div className="center" style={{ height: "100vh" }}>
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="single-post-container">
        <div className="right-side">
          <h1>{data && data.title}</h1>
          <div className="info-authore">
            <p>
              <BiUserCircle />
            </p>
            <p>{user && user.username}</p>
          </div>
          <div
            className="description"
            dangerouslySetInnerHTML={{
              __html: data?.desc as TrustedHTML,
            }}></div>
        </div>
        <div className="left-side">
          <div className="img-single-container">
            <img src={data && data?.img} alt={data && data.title} />
          </div>
          <div className="info-container">
            <ShowCategory category={data && data.category} />
            {isSignedIn && (
              <SaveContainer
                userId={data && data.user}
                postId={data && data.id}
              />
            )}
          </div>
        </div>
      </div>
      {isSignedIn && <CommentContainer postId={data && data.id} />}
    </div>
  );
}

export default SinglePost;
