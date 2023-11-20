import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons/faEyeSlash";

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex flex-col md:flex-row h-[100svh]">
      <div className="flex basis-1/2 flex-col items-center p-10">
        <img src="/assets/icons/love-trav.png" className="w-24" alt="" />
        <div className="mx-auto w-full max-w-md">
          <h2 className="mt-12 inline-block bg-gradient-to-r from-yellow-500 to-pink-400 bg-clip-text pb-[1.2px] text-3xl font-bold text-transparent">
            Login
          </h2>
          <form className="mt-8">
            <Input
              isRequired
              type="email"
              variant="bordered"
              isInvalid={false}
              errorMessage=""
              label="Email"
              className="mb-5 placeholder:text-black"
              color="warning"
              endContent={
                <FontAwesomeIcon color="lightgray" icon={faEnvelope} />
              }
            />
            <Input
              className="mb-5"
              label="Password"
              color="warning"
              isRequired
              isInvalid={false}
              errorMessage=""
              variant="bordered"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <FontAwesomeIcon color="gray" icon={faEyeSlash} />
                  ) : (
                    <FontAwesomeIcon color="gray" icon={faEye} />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />
            <div className="mb-10 flex justify-between">
              <Checkbox color="warning">Remember me?</Checkbox>
              <Link href="/reset" color="foreground">
                Forgot password?
              </Link>
            </div>
            <Button
              as={Link}
              size="lg"
              href="/app/travels"
              radius="sm"
              className="mb-3 w-full bg-gradient-to-tr from-pink-500 to-yellow-500 font-bold text-white focus:border-none"
            >
              Login
            </Button>
            <p>
              Don&apos;t have an account? Click{" "}
              <Link underline="always" href="/signup" color="foreground">
                here
              </Link>{" "}
              to sign up{" "}
            </p>
          </form>
        </div>
      </div>
      <div className="basis-1/2 hidden md:block">
        <img
        className="w-full h-full"
          src="https://th.bing.com/th/id/OIG.YBiXXwEX2vai0N_EsPIE?pid=ImgGn"
          alt=""
        />
      </div>
    </div>
  );
};

export default Login;
