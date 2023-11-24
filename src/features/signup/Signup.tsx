import Heading from "../../ui/Heading";
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
          <Heading className="mt-8">SignUp</Heading>
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default Signup;
