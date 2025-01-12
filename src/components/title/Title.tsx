import { ReactNode } from "react";
import "./title.css";
function Title({ children }: { children: ReactNode }) {
  return (
    <div className="title-container">
      <h3 className="title">{children}</h3>
    </div>
  );
}

export default Title;
