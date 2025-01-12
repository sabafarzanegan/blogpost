import "./landing.css";
import landingImg from "/blog2.svg";
function Landing() {
  return (
    <div className="landing-container">
      <div>
        <h2>
          با{" "}
          <span>
            تکنوبلاگ <div className="bg-color-blur"></div>
          </span>
          نکات مهم برنامه نویسی رو آموزش ببین...
        </h2>
      </div>
      <div>
        <div>
          <img className="landingImg" src={landingImg} alt="landingLogo" />
        </div>
      </div>
    </div>
  );
}

export default Landing;
