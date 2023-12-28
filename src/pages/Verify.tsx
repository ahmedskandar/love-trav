import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { params } from "../lib/constants";

//After user has clicked on the verify email link sent
const Verify = () => {
  const navigate = useNavigate();
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true); //Rerender to get access to the parameters required for extraction otherwise null

    const accessToken = params.access_token;
    const errorDescription = params.error_description?.replace(/\+/g, " ");

    const showToast = (message: string, destination: "success" | "error") => {
      toast[destination](message);
      setTimeout(
        //Timer is set to give a chance for the toast to display before navigating
        () => navigate(destination === "success" ? "/app/travels" : "/"),
        1,
      );
    };

    if (accessToken)
      showToast("You have successfully verified your email", "success");
    else if (errorDescription) showToast(errorDescription, "error");
    else showToast("No access token, redirected", "error");
  }, [navigate, render]);

  return null;
};

export default Verify;

//After user has clicked on the verify email link sent
// const Verify = () => {
//   const [render, setRender] = useState(false);
//   const navigate = useNavigate();
//   useEffect(() => {
//     setRender(true); //To give the toast message a chance to be displayed
//     const params = window.location.hash
//       .substr(1)
//       .split("&")
//       .reduce((acc: Record<string, string>, pair) => {
//         const [key, value] = pair.split("=");
//         acc[key] = decodeURIComponent(value);
//         return acc;
//       }, {});

//     const accessToken = params.access_token;
//     const errorDesciption = params.error_description?.replace(/\+/g, " ");
//     if (accessToken) {
//       toast.success("You have successfully verified your email");
//       setTimeout(() => {
//         navigate("/app/travels", { replace: true });
//       }, 1);
//     } else if (errorDesciption) {
//       toast.error(errorDesciption);
//       setTimeout(() => {
//         navigate("/", { replace: true });
//       }, 1);
//     } else {
//       toast.error("No access token, redirected");
//       setTimeout(() => {
//         navigate("/", { replace: true });
//       }, 1);
//     }
//   }, [render, navigate]);
//   return null;
// };

// export default Verify;
