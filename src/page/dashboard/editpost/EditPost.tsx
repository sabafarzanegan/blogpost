import "./editpost.css";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { CreateForm } from "../../../lib/Type";

import UploadImg from "../../../components/uploadimg/UploadImg";
import { Categoryitem } from "../../../lib/helper";
import Tiptap from "../../../components/editor/TextEditor";
import { Poststore } from "../../../store/Poststore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { Imagestore } from "../../../store/Imagestore";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "../../../upabaseClient";
import { toast } from "react-toastify";

const schema = yup
  .object({
    title: yup.string().required("عنوان الزامی است"),
    category: yup.string().required("انتخاب دسته الزامی است"),
    desc: yup.string().required("متن مقاله الزامی است"),
  })
  .required();

function EditPost() {
  const { id } = useParams();
  const { user } = useUser();

  const { getPost, editPost } = Poststore((state) => state);
  const { imageUrl } = Imagestore((state) => state);
  const { data: postData, isPending } = useQuery({
    queryKey: ["editdata", id],
    queryFn: () => getPost(id),
  });
  const { mutate, isPending: editPending } = useMutation({
    mutationKey: ["editPost"],
    mutationFn: editPost,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success("ویرایش با موفقیت انجام شد");
      }
    },
  });
  const method = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      category: "",
      desc: "",
    },
  });
  useEffect(() => {
    if (postData) {
      method.reset({
        title: postData[0]?.title || "",
        category: postData[0]?.category || "",
        desc: postData[0]?.desc || "",
      });
    }
  }, [postData, method.reset]);

  const onSubmit: SubmitHandler<CreateForm> = async (data) => {
    console.log(data);
    console.log(imageUrl);
    try {
      const { data: existinuser } = await supabase
        .from("user")
        .select("id")
        .eq("clerkUserId", user?.id);
      const formData = {
        img: imageUrl || (postData && (postData[0].img as string)),
        title: data.title,
        desc: data.desc,
        category: data.category,
        user: existinuser ? existinuser[0]?.id : undefined,
      };
      mutate({ postId: id, formData });
    } catch (error) {}
  };
  if (isPending) {
    return (
      <div className="center">
        <div className="loader"></div>
      </div>
    );
  }
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
              id="category">
              {Categoryitem.map((item) => (
                <option className="option" value={item.link}>
                  {item.name}
                </option>
              ))}
            </select>
            <p style={{ color: "red" }}>
              {method.formState.errors.category?.message as ReactNode}
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
              {method.formState.errors.title?.message as ReactNode}
            </p>
          </div>
          <div className="textEditor-container">
            <Tiptap desc={postData && postData[0].desc} />
            <p style={{ color: "red" }}>
              {method.formState.errors.desc?.message as ReactNode}
            </p>
          </div>
          <button disabled={editPending} type="submit" className="send-btn">
            {editPending ? "در حال ویرایش..." : "ویرایش"}
          </button>
        </form>
      </FormProvider>
    </div>
  );
}

export default EditPost;
