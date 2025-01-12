import { ComponentPropsWithRef } from "react";
type TColor = "primary" | "secoundary" | "danger";
type TSize = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
type TRounded = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
type TButton = ComponentPropsWithRef<"button"> & {
  color?: TColor;
  size?: TSize;
  rounded?: TRounded;
};

function Button({ children, color, size, rounded, style, ...rest }: TButton) {
  return (
    <button
      style={{
        ...style,
        ...checkColor(color),
        ...checkSize(size),
        ...checkRounded(rounded),
      }}
      {...rest}>
      {children}
    </button>
  );
}

function checkColor(color?: TColor) {
  if (color === "primary") {
    return { backgroundColor: "#e09200", color: "white" };
  } else if (color === "secoundary") {
    return { backgroundColor: "#fbfada", color: "white" };
  } else if (color === "danger") {
    return { backgroundColor: "#dc2626", color: "white" };
  }
}

function checkSize(size?: TSize) {
  if (size === "sm") {
    return { padding: "0.125rem 0.75px" };
  } else if (size === "md") {
    return {
      padding: "0.25rem 1.5rem",
    };
  } else if (size === "lg") {
    return { padding: "0.5rem 1.75rem" };
  } else if (size === "xl") {
    return { padding: "0.75rem 2rem" };
  } else if (size === "2xl") {
    return { padding: "1rem 2.5rem" };
  } else if (size === "3xl") {
    return { padding: "1.5rem 2.75rem" };
  }
}

function checkRounded(rounded?: TRounded) {
  if (rounded === "sm") {
    return { borderRadius: "10px" };
  } else if (rounded === "md") {
    return { borderRadius: "14px" };
  } else if (rounded === "lg") {
    return { borderRadius: "18px" };
  } else if (rounded === "xl") {
    return { borderRadius: "22px" };
  } else if (rounded === "2xl") {
    return { borderRadius: "24px" };
  } else if (rounded === "3xl") {
    return { borderRadius: "28px" };
  } else if (rounded === "full") {
    return { borderRadius: "100%" };
  }
}

export default Button;
