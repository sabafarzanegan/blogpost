import { useUser } from "@clerk/clerk-react";
import { supabase } from "../upabaseClient";

export const Addrole = async () => {
  const { user } = useUser();
  if (!user) {
    return { message: "لطفا ابتدا وارد شوید" };
  }
  try {
    await user.update({
      unsafeMetadata: {
        role: "admin",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const currentUser = async () => {
  const { user } = useUser();
  try {
    const userId = await supabase
      .from("user")
      .select("id")
      .eq("clerkUserId", user?.id);

    return userId;
  } catch (error) {
    console.log(error);
  }
};
