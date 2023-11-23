import Logo from "../../ui/Logo";
import SignupForm from "./SignupForm";

const Signup = () => {
  return (
    <div className="flex h-[100svh] flex-col md:flex-row">
      <div className="hidden basis-1/2 overflow-hidden rounded-r-full md:block">
        <img
          className="h-full w-full"
          src="https://th.bing.com/th/id/OIG.j4KFKyXfNANcYzPIJnss?pid=ImgGn"
          alt=""
        />
      </div>
      <div className="flex basis-1/2 flex-col items-center p-10 md:h-[100svh] md:overflow-y-scroll">
        <Logo />
        <div className="mx-auto w-full max-w-md">
          <h2 className="mt-12 inline-block bg-gradient-to-r from-yellow-500 to-pink-400 bg-clip-text pb-[1.2px] text-3xl font-bold text-transparent">
            Signup
          </h2>
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default Signup;
