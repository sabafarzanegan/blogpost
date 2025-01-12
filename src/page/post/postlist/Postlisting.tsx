import { useInfiniteQuery } from "@tanstack/react-query";
import { Poststore } from "../../../store/Poststore";
import Title from "../../../components/title/Title";
import CardPost from "../../../components/allpost/CardPost/CardPost";
import Button from "../../../components/ui/button/Button";
import "./postlist.css";
import Filter from "../../../components/filter/Filter";

export default function Postlisting() {
  const { fetchInfinitPost, selectedCategory, selectedOrder, searchQuery } =
    Poststore((state) => state);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useInfiniteQuery({
      queryKey: ["infinitPosts", selectedCategory, selectedOrder, searchQuery],
      queryFn: fetchInfinitPost,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      refetchOnWindowFocus: false,
    });

  if (isPending) {
    return (
      <div className="center" style={{ height: "100vh" }}>
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div>
      <Title>مقالات</Title>
      <Filter />
      <div className="allpost-container">
        {data?.pages?.map((data, pageIndex) =>
          data?.data?.map((post, postIndex) => (
            <CardPost key={`${pageIndex}-${postIndex}`} post={post} />
          ))
        )}
      </div>

      <div className="center" style={{ marginTop: "15px" }}>
        <Button
          className="btn-more-blog"
          color="primary"
          size="md"
          rounded="md"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}>
          {isFetchingNextPage ? (
            <div className="loader2"></div>
          ) : hasNextPage ? (
            "مشاهده بیشتر"
          ) : (
            "مطلب بیشتری وجود ندارد"
          )}
        </Button>
      </div>
    </div>
  );
}
