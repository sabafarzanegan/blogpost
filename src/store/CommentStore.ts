import { create } from "zustand";
import { supabase } from "../upabaseClient";
import { comment } from "../lib/Type";
import { toast } from "react-toastify";
interface formData {
  user: number | undefined;
  post: number | undefined;
  content: string | undefined;
}

type CommentStore = {
  Comments: comment[];
  addComment: (
    formData: formData
  ) => Promise<{ success: boolean | undefined } | undefined>;
  getAllComments: (
    postId: number | undefined
  ) => Promise<comment[] | undefined | null>;
};

export const CommentStore = create<CommentStore>(() => ({
  Comments: [],
  addComment: async (formData) => {
    console.log(formData);
    if (formData.user) {
      toast.error("ابتداوارد سایت شوید");
      return;
    }

    try {
      const { data, error } = await supabase.from("comment").insert([formData]);
      console.log(data);
      if (!error) {
        return { success: true };
      }
    } catch (error) {
      console.log(error);
    }
  },
  getAllComments: async (postId): Promise<comment[] | undefined | null> => {
    try {
      const res = await supabase.from("comment").select("*").eq("post", postId);
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
}));
