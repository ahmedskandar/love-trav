import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons/faEyeSlash";

const LoginForm = () => {
  const [isEyeVisible, setIsEyeVisible] = useState(false);
  const toggleEyeVisibility = () => setIsEyeVisible(!isEyeVisible);
  return (
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
        endContent={<FontAwesomeIcon color="lightgray" icon={faEnvelope} />}
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
            onClick={toggleEyeVisibility}
          >
            {isEyeVisible ? (
              <FontAwesomeIcon color="gray" icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon color="gray" icon={faEye} />
            )}
          </button>
        }
        type={isEyeVisible ? "text" : "password"}
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
  );
};

export default LoginForm;
