import "./savecontainer.css";
import SaveButton from "../savebtn/SaveButton";

function SaveContainer({
  userId,
  postId,
}: {
  userId: number | undefined;
  postId: number | undefined;
}) {
  return (
    <div className="save-container">
      <a href="#section2" style={{ color: "black" }}>
        دیدگاه شما
      </a>
      <div className="center">
        <div>
          <SaveButton userId={userId} postId={postId} />
        </div>
      </div>
    </div>
  );
}

export default SaveContainer;
