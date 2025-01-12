import bookmark from "../../../../public/bookmark.png";
import savedBookmark from "../../../../public/addedbookmark.png";

import "./savebutton.css";
import { Poststore } from "../../../store/Poststore";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "../../../upabaseClient";
import { toast } from "react-toastify";
function SaveButton({
  userId,
  postId,
}: {
  userId: number | undefined;
  postId: number | undefined;
}) {
  const [savePost, setSavePost] = useState<any[] | null>();
  const { toggleSavePost } = Poststore((state) => state);
  const { mutate, isPending } = useMutation({
    mutationKey: ["addsavepost"],
    mutationFn: toggleSavePost,
    onSuccess: (data) => {
      if (data?.success) {
        if (data.added) {
          console.log(data.added);
        } else {
        }
      } else {
        toast.error("دوباره تلاش کنید");
      }
    },
  });

  const isSaved = async () => {
    try {
      const { data } = await supabase
        .from("savePosts")
        .select("*")
        .eq("user", userId)
        .eq("post", postId);
      console.log(data);
      setSavePost(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    isSaved();
  }, []);

  return (
    <div>
      <div onClick={() => mutate({ postId, userId })} className="save-btn">
        {isPending ? (
          <div className="center">
            <div className="loader" style={{ width: "20px" }}></div>
          </div>
        ) : (
          <img src={`${savePost?.length ? savedBookmark : bookmark}`} alt="" />
        )}
      </div>
    </div>
  );
}

export default SaveButton;
