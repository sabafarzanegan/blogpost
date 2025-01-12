import Allpost from "../../components/allpost/Allpost";
import Category from "../../components/categort/Category";
import FeatureBlog from "../../components/featurepost/FeatureBlog";
import Landing from "../../components/landing/Landing";
import "./home.css";
function Home() {
  return (
    <div>
      <Landing />
      <main className="home-container">
        <Category />
        <FeatureBlog />
        <Allpost />
      </main>
    </div>
  );
}

export default Home;
