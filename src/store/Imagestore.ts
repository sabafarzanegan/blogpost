import { create } from "zustand";

type ImageStore = {
  imageUrl: string | null;
  uoloadImageInCloud: (
    imageFile: File
  ) => Promise<{ success: boolean } | undefined>;
};
export const Imagestore = create<ImageStore>((set) => ({
  imageUrl: "",
  uoloadImageInCloud: async (imageFile) => {
    try {
      const data = new FormData();
      data.append("file", imageFile);
      data.append("upload_preset", "unsigned-upload");
      data.append("cloud_name", "dko1fxu7r");
      console.log(data);
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dko1fxu7r/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const uploadedImageUrl = await res.json();

      set({ imageUrl: uploadedImageUrl.url });
      if (uploadedImageUrl) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.log(error);
    }
  },
}));
