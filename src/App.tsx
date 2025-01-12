import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./page/home/Home";
import Postlisting from "./page/post/postlist/Postlisting";
import SinglePost from "./page/post/singlepost/SinglePost";
import Loginpage from "./page/loginpage/Loginpage";
import Registerpage from "./page/registerpage/Registerpage";
import CreatePost from "./page/dashboard/create/CreatePost";
import SaveUser from "./page/user/SaveUser";
import Search from "./page/search/Search";
import DashLayout from "./page/dashboard/dashlayout/DashLayout";
import Post from "./page/dashboard/posts/Post";
import EditPost from "./page/dashboard/editpost/EditPost";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Profile from "./page/profile/Profile";
import UserInfo from "./page/profile/userinfo/UserInfo";
import SavePostList from "./page/profile/savepostList/SavePostList";

import ProfilePrivateRoute from "./components/PrivateRoute/ProfilePrivateRoute";

const App = () => {
  return (
    <div className="">
      <Navbar />
      <main className="container font-size">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/postlist" element={<Postlisting />} />
          <Route path="/postlist/:id" element={<SinglePost />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />

          <Route path="/search/:link" element={<Search />} />
          <Route path="/saveuser" element={<SaveUser />} />
          <Route
            path="/profile"
            element={
              <ProfilePrivateRoute>
                <Profile />
              </ProfilePrivateRoute>
            }>
            <Route path="user-info" element={<UserInfo />} />
            <Route path="savepost" element={<SavePostList />} />
          </Route>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashLayout />
              </PrivateRoute>
            }>
            <Route path="create" element={<CreatePost />} />
            <Route path="blogs" element={<Post />} />
            <Route path="edit/:id" element={<EditPost />} />
          </Route>
        </Routes>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
