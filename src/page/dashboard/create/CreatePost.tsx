import { useUser } from "@clerk/clerk-react";
import "./CreatePost.css";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { Imagestore } from "../../../store/Imagestore";
import { Poststore } from "../../../store/Poststore";
import { CreateForm } from "../../../lib/Type";
import { supabase } from "../../../upabaseClient";
import UploadImg from "../../../components/uploadimg/UploadImg";
import { Categoryitem } from "../../../lib/helper";
import Tiptap from "../../../components/editor/TextEditor";

const schema = yup
  .object({
    title: yup.string().required("عنوان الزامی است"),
    category: yup.string().required("انتخاب دسته الزامی است"),
    desc: yup.string().required("متن مقاله الزامی است"),
  })
  .required();

function CreatePost() {
  const { user } = useUser();
  const { imageUrl } = Imagestore((state) => state);
  const { createPost } = Poststore((state) => state);
  const { isSignedIn } = useUser();
  const method = useForm({
    resolver: yupResolver(schema),
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ["createPost"],
    mutationFn: createPost,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(" مقاله با موفقیت ثیت شد");
        window.location.reload();
      } else {
        toast.error("خطا لطفا دوباره تلاش کنید");
      }
    },
  });
  if (!isSignedIn) {
    return (
      <Link to="/login" className="loader-container">
        برای نوشتن مقاله لطفا ابتدا <span className="text-login">وارد</span>{" "}
        شوید.
      </Link>
    );
  }
  const onSubmit: SubmitHandler<CreateForm> = async (data) => {
    const { data: existinuser } = await supabase
      .from("user")
      .select("id")
      .eq("clerkUserId", user?.id);

    if (!imageUrl) {
      toast.error("ابتدا عکس را وارد کنید");
    } else {
      const formData = {
        img: imageUrl,
        title: data.title,
        desc: data.desc,
        category: data.category,
        user: existinuser ? existinuser[0]?.id : undefined,
      };
      try {
        mutate(formData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container-create-post">
      <h4 className="title-create-post">ساختن مقاله جدید</h4>
      <div className="upload-img-container">
        <UploadImg />
      </div>
      <FormProvider {...method}>
        <form
          onSubmit={method.handleSubmit(onSubmit)}
          className="form-container"
          action="">
          <div className="select-container">
            <label className="label" htmlFor="category">
              دسته بندی
            </label>
            <select
              {...method.register("category", { required: true })}
              defaultValue="frontend"
              id="category">
              {Categoryitem.map((item) => (
                <option className="option" value={item.link}>
                  {item.name}
                </option>
              ))}
            </select>
            <p style={{ color: "red" }}>
              {method.formState.errors.category?.message}
            </p>
          </div>
          <div>
            <label htmlFor="title">عنوان</label>
            <input
              {...method.register("title", { required: true })}
              className="title-input"
              id="title"
              type="text"
            />
            <p style={{ color: "red" }}>
              {method.formState.errors.title?.message}
            </p>
          </div>
          <div className="textEditor-container">
            <Tiptap />
            <p style={{ color: "red" }}>
              {method.formState.errors.desc?.message}
            </p>
          </div>
          <button disabled={isPending} type="submit" className="send-btn">
            {isPending ? "در حال ساختن..." : "ساختن"}
          </button>
        </form>
      </FormProvider>
    </div>
  );
}

export default CreatePost;
