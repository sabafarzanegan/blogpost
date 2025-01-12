import { create } from "zustand";
import { editform, formCreatePost, post } from "../lib/Type";
import { supabase } from "../upabaseClient";
import { toast } from "react-toastify";

type PostStoreType = {
  Posts: post[] | null;
  createPost: (
    formData: formCreatePost
  ) => Promise<{ success: boolean } | undefined>;
  getAllposts: () => Promise<any[] | null | undefined>;
  getPost: (
    id: string | number | undefined
  ) => Promise<any[] | null | undefined>;
  getPostBasedOnCategory: (
    category: string | undefined
  ) => Promise<any[] | null | undefined>;
  fetchInfinitPost: ({
    pageParam,
  }: {
    pageParam: number;
  }) => Promise<
    { data: post[] | null; nextCursor: number | undefined } | undefined
  >;
  selectedCategory: string | undefined;
  setSelectedCategory: (category: string | undefined) => void;
  selectedOrder: string | undefined;
  setOrder: (order: string | undefined) => void;
  searchQuery: string | undefined;
  setSearchQuery: (serach: string | undefined) => void;

  toggleSavePost: ({
    postId,
    userId,
  }: {
    postId: number | undefined;
    userId: number | undefined;
  }) => Promise<
    { success: boolean; message: string; added: boolean } | undefined
  >;
  getPostsTable: () => Promise<post[] | undefined | null>;
  deletPostHandler: (
    postId: number | undefined
  ) => Promise<{ success: boolean } | undefined>;
  editPost: ({
    postId,
    formData,
  }: {
    postId: string | undefined;
    formData: editform | undefined;
  }) => Promise<{ success: boolean } | undefined>;
  getSavedPosts: (
    userId: number | undefined
  ) => Promise<any[] | null | undefined>;
};

export const Poststore = create<PostStoreType>((set) => ({
  selectedCategory: "",
  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
  },
  selectedOrder: "",
  setOrder: (order) => set({ selectedOrder: order }),
  searchQuery: "",
  setSearchQuery: (search) => {
    set({ searchQuery: search });
  },
  Posts: [],
  createPost: async (formData) => {
    try {
      const { data: newPost, error } = await supabase
        .from("posts")
        .insert({
          img: formData.img,
          title: formData.title,
          desc: formData.desc,
          category: formData.category,
          user: formData.user,
        })
        .select();
      if (newPost) {
        console.log(newPost);
        return { success: true };
      } else {
        console.log(error);
        return { success: false };
      }
    } catch (error) {
      console.log(error);
    }
  },
  getAllposts: async () => {
    try {
      const { data } = await supabase.from("posts").select("*");
      set({ Posts: data });
      return data;
    } catch (error) {}
  },
  getPost: async (id) => {
    try {
      const res = await supabase.from("posts").select("*").eq("id", id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  getPostBasedOnCategory: async (category) => {
    try {
      const res = await supabase
        .from("posts")
        .select("*")
        .eq("category", category);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  fetchInfinitPost: async ({
    pageParam = 0,
  }): Promise<
    { data: post[] | null; nextCursor: number | undefined } | undefined
  > => {
    try {
      const { selectedCategory, selectedOrder, searchQuery } =
        Poststore.getState();
      const isAscending = selectedOrder === "oldest";
      let query = supabase.from("posts").select("*");
      if (selectedCategory) {
        query.eq("category", selectedCategory);
      }
      if (searchQuery) {
        query = query.ilike("title", `%${searchQuery}%`);
      }
      const { data } = await query
        .order("created_at", { ascending: isAscending })
        .range(pageParam, pageParam + 3);

      const hasMore = data?.length === 4;
      const nextCursor = hasMore ? pageParam + 4 : undefined;
      console.log(data);
      console.log(nextCursor);

      return { data, nextCursor };
    } catch (error) {
      console.log(error);
    }
  },

  toggleSavePost: async ({ postId, userId }) => {
    if (!userId) {
      toast.error("ابتداوارد سایت شوید");
      return;
    }
    console.log(postId, userId);

    try {
      const { data: existingSavePost, error: errorExistingsavepost } =
        await supabase
          .from("savePosts")
          .select("*")
          .eq("user", userId)
          .eq("post", postId)
          .single();
      console.log(errorExistingsavepost);

      if (existingSavePost) {
        const { error: errordeletSavepost } = await supabase
          .from("savePosts")
          .delete()
          .eq("user", userId)
          .eq("post", postId);
        if (!errordeletSavepost) {
          return { success: true, message: "حذف شد", added: false };
        }
      } else {
        const { data: addSavePost, error: erroraddsavepost } = await supabase
          .from("savePosts")
          .insert([{ user: userId, post: postId, isSave: true }]);

        console.log(addSavePost);
        console.log(erroraddsavepost);
        if (!erroraddsavepost) {
          return { success: true, message: "اضافه شد", added: true };
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  getPostsTable: async () => {
    try {
      const { data } = await supabase.from("posts").select("*");

      return data;
    } catch (error) {}
  },
  deletPostHandler: async (postId) => {
    try {
      const { error } = await supabase.from("posts").delete().eq("id", postId);
      if (!error) {
        return { success: true };
      }
    } catch (error) {
      console.log(error);
    }
  },
  editPost: async ({ postId, formData }) => {
    console.log(postId);
    console.log(formData);

    try {
      const { error } = await supabase
        .from("posts")
        .update(formData)
        .eq("id", postId);
      if (!error) {
        return { success: true };
      }
    } catch (error) {
      console.log(error);
    }
  },
  getSavedPosts: async (userId) => {
    try {
      const { data } = await supabase
        .from("savePosts")
        .select("*")
        .eq("user", userId);

      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
}));
