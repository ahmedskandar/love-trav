import Logo from "../../ui/Logo";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="flex h-[100svh] flex-col md:flex-row">
      <div className="flex basis-1/2 flex-col items-center p-10">
        <Logo />
        <div className="mx-auto w-full max-w-md">
          <h2 className="mt-12 inline-block bg-gradient-to-r from-yellow-500 to-pink-400 bg-clip-text pb-[1.2px] text-3xl font-bold text-transparent">
            Login
          </h2>
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
