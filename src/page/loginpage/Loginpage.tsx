import { SignIn } from "@clerk/clerk-react";
import "./login.css";
function Loginpage() {
  return (
    <>
      <h4 className="title-login">ورود</h4>
      <div className="login-container-page">
        <SignIn forceRedirectUrl="/saveuser" signUpUrl="/register" />
      </div>
    </>
  );
}

export default Loginpage;
