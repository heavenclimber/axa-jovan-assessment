import { toast, Slide } from "react-toastify";

export const notification = ({ type, text, delay = 2000, className }) => {
  if (type === "success") {
    toast.success(text, {
      containerId: "A",
      transition: Slide,
      autoClose: delay,
      className: className,
    });
  }
  if (type === "error") {
    toast.error(text, {
      containerId: "A",
      transition: Slide,
      autoClose: delay,
      className: className,
    });
  }
  if (type === "warning") {
    toast.warning(text, {
      containerId: "A",
      transition: Slide,
      autoClose: delay,
      className: className,
    });
  }
};
