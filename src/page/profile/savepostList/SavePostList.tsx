import { useQuery } from "@tanstack/react-query";
import { UserStore } from "../../../store/UserStore";
import { useUser } from "@clerk/clerk-react";

import SavePost from "./SavePost";

function SavePostList() {
  const { user } = useUser();
  const { findUser } = UserStore((state) => state);

  const { data, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: () => findUser(user?.id),
  });
  if (isPending) {
    return (
      <div className="center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div>
      <SavePost data={data} />
    </div>
  );
}

export default SavePostList;
