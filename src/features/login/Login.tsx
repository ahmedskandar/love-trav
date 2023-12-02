import Heading from "../../ui/Heading";
import Logo from "../../ui/Logo";
import LoginForm from "./LoginForm";
import { useEffect } from "react";

const Login = () => {

  useEffect(() => {
const params = window.location.hash
  .substr(1)
  .split("&")
  .reduce((acc: Record<string, string>, pair) => {
    const [key, value] = pair.split("=");
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {});

    const err = params.error_description;
    if (err) alert(err.replace(/\+/g, " "));
  }, []);
  return (
    <div className="flex h-[100svh] flex-col md:flex-row">
      <div className="flex basis-1/2 flex-col items-center p-10">
        <Logo />
        <div className="mx-auto w-full max-w-md">
          <Heading className="mt-8">Login</Heading>
          <LoginForm />
        </div>
      </div>
      <div className="hidden basis-1/2 md:block">
        <img
          className="h-full w-full"
          src="https://th.bing.com/th/id/OIG.YBiXXwEX2vai0N_EsPIE?pid=ImgGn"
          alt=""
        />
      </div>
    </div>
  );
};

export default Login;
