import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const [render, setRender] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setRender(true);
    // if (window.location.hash === undefined) return;
  const params = window.location.hash
    .substr(1)
    .split("&")
    .reduce((acc: Record<string, string>, pair) => {
      const [key, value] = pair.split("=");
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});

    const accessToken = params.access_token;
    const errorDesciption = params.error_description?.replace(/\+/g, " ");
    if (accessToken) {
      toast.success("You have successfully verified your email");
      setTimeout(() => {
        navigate("/app/travels", { replace: true });
      }, 1);
    } else if (errorDesciption) {
      toast.error(errorDesciption);
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1);
    } else {
      toast.error("No access token, redirected");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1);
    }
  }, [render, navigate]);
  return <div>Verify</div>;
};

export default Verify;
