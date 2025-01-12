import { useRef, useState } from "react";
import Button from "../ui/button/Button";
import "./uploadimg.css";
import { BiUpload } from "react-icons/bi";
import { Imagestore } from "../../store/Imagestore";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

function UploadImg() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { imageUrl, uoloadImageInCloud } = Imagestore((state) => state);
  const { isPending, mutate } = useMutation({
    mutationKey: ["upload-img"],
    mutationFn: uoloadImageInCloud,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success("عکس با موفقیت ارسال شد");
      } else {
        toast.error("خطا لطفا دوباره تلاش کنید");
      }
    },
  });
  const choosFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const getImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
  };
  const handleUoloadImage = async () => {
    if (imageFile) {
      mutate(imageFile);
    }
  };
  return (
    <>
      <div className="general-container">
        <input
          onChange={getImage}
          className="upload"
          ref={inputRef}
          type="file"
        />
        {imageUrl ? (
          <div className="img-blog">
            <img src={imageUrl} alt="" />
          </div>
        ) : (
          <div className="upload-container">
            {imageFile ? (
              <span>{imageFile.name}</span>
            ) : (
              <div onClick={choosFile}>
                <BiUpload />
                <p>انتخاب عکس</p>
              </div>
            )}
          </div>
        )}
      </div>
      {imageUrl ? (
        ""
      ) : (
        <Button
          disabled={isPending}
          onClick={handleUoloadImage}
          rounded="md"
          size="lg"
          className="send-img-btn"
          type="button"
          color="danger">
          {isPending ? "در حال ارسال" : "ارسال"}
        </Button>
      )}
    </>
  );
}

export default UploadImg;
