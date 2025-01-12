import { SignUp } from "@clerk/clerk-react";
import "./registerpage.css";
function Registerpage() {
  return (
    <>
      <h4 className="title-signup">ثبت نام</h4>
      <div className="signup-container-page">
        <SignUp signInUrl="/login" />
      </div>
    </>
  );
}

export default Registerpage;
