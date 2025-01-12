import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import UploadImg from "../../../components/uploadimg/UploadImg";
import { useMutation, useQuery } from "@tanstack/react-query";

import { ReactNode, useEffect } from "react";
import { Imagestore } from "../../../store/Imagestore";
import { useUser } from "@clerk/clerk-react";

import { toast } from "react-toastify";
import { UserStore } from "../../../store/UserStore";

const schema = yup
  .object({
    username: yup.string().required("عنوان الزامی است"),
  })
  .required();

export type userdata = {
  username: string;
};

function UserInform() {
  const { user } = useUser();

  const { findUser, editUser } = UserStore((state) => state);
  const { imageUrl } = Imagestore((state) => state);
  const { data: postData, isPending } = useQuery({
    queryKey: ["userData"],
    queryFn: () => findUser(user?.id),
  });
  const { mutate, isPending: editPending } = useMutation({
    mutationKey: ["editUser"],
    mutationFn: editUser,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success("ویرایش با موفقیت انجام شد");
      } else {
        toast.error("خطا دوباره تلاش کنید");
      }
    },
  });
  const method = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
    },
  });
  useEffect(() => {
    if (postData) {
      method.reset({
        username: postData?.username || "",
      });
    }
  }, [postData, method.reset]);

  const onSubmit: SubmitHandler<userdata> = async (data) => {
    const formData = {
      img: imageUrl || user?.imageUrl,
      username: data.username,
      userId: user?.id,
    };
    mutate(formData);
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
      <h4 className="title-create-post">ویرایش اطلاعات</h4>
      <div className="upload-img-container">
        <UploadImg />
      </div>
      <FormProvider {...method}>
        <form
          onSubmit={method.handleSubmit(onSubmit)}
          className="form-container"
          action="">
          <div>
            <label htmlFor="username">نام کاربری</label>
            <input
              {...method.register("username", { required: true })}
              className="title-input"
              id="title"
              type="text"
            />
            <p style={{ color: "red" }}>
              {method.formState.errors.username?.message as ReactNode}
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

export default UserInform;
