import { create } from "zustand";
import { user } from "../lib/Type";
import { supabase } from "../upabaseClient";
type UserStore = {
  user: user;
  findCurrentUser: (userId: number | undefined) => Promise<void>;
  findUser: (clerckID: string | undefined) => Promise<user>;
  editUser: (formData: {
    img: string | undefined;
    username: string | undefined;
    userId: string | undefined;
  }) => Promise<{ success: boolean } | undefined>;
};
export const UserStore = create<UserStore>((set) => ({
  user: {
    id: undefined,
    created_at: undefined,
    clerkUserId: "",
    username: "",
    email: "",
    img: "",
    role: "user",
  },
  findCurrentUser: async (userId) => {
    const res = await supabase.from("user").select("*").eq("id", userId);
    console.log(res);

    if (res.status) {
      set({ user: res.data && res?.data[0] });
    }
  },
  findUser: async (clerckID) => {
    try {
      const { data } = await supabase
        .from("user")
        .select("*")
        .eq("clerkUserId", clerckID);
      return data && data[0];
    } catch (error) {
      console.log(error);
    }
  },
  editUser: async (formData) => {
    console.log(formData);
    try {
      const { error } = await supabase
        .from("user")
        .update({ username: formData.username, img: formData.img })
        .eq("clerkUserId", formData.userId);
      if (!error) {
        return { success: true };
      }
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  },
}));
