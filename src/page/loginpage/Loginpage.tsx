import { SignIn } from "@clerk/clerk-react";
import "./login.css";
function Loginpage() {
  return (
    // forceRedirectUrl="/saveuser"
    <>
      <h4 className="title-login">ورود</h4>
      <div className="login-container-page">
        <SignIn
          fallbackRedirectUrl="https://blogpost-wm14.vercel.app/saveuser"
          signUpUrl="/register"
        />
      </div>
    </>
  );
}

export default Loginpage;
