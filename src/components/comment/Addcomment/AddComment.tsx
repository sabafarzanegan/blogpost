import { SubmitHandler, useForm } from "react-hook-form";
import "./Addomment.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommentStore } from "../../../store/CommentStore";
import { UserStore } from "../../../store/UserStore";
import { toast } from "react-toastify";

const schema = yup
  .object({
    content: yup.string().required("محتوا الزامی است"),
  })
  .required();
type addCommentForm = {
  content: string;
};
type commemtProps = {
  postId: number | undefined;
};
function AddComment({ postId }: commemtProps) {
  const { addComment } = CommentStore((state) => state);
  const { user } = UserStore((state) => state);
  const queryClient = useQueryClient();
  const method = useForm({
    resolver: yupResolver(schema),
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ["addcomment"],
    mutationFn: addComment,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success("نظر شما با موفقیت ثبت شد");
        queryClient.invalidateQueries("comments" as any);
        method.reset();
      } else {
        toast.error("خطا لطفا دوباره تلاش کنید");
      }
    },
  });
  const onSubmit: SubmitHandler<addCommentForm> = async (data) => {
    console.log(data);
    const formData = { user: user.id, post: postId, content: data.content };
    mutate(formData);
  };
  return (
    <div id="section2" className="add-container">
      <h3>دیدگاه خود را بنویسید</h3>
      <form onSubmit={method.handleSubmit(onSubmit)}>
        <textarea {...method.register("content", { required: true })} />
        <p style={{ color: "red" }}>
          {method.formState.errors.content?.message}
        </p>
        <button disabled={isPending} type="submit">
          {isPending ? "..." : "ارسال"}
        </button>
      </form>
    </div>
  );
}

export default AddComment;
