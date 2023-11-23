import { Link } from "@nextui-org/link";
import { FormPrompt } from "../lib/types";

const FormPrompt = ({ to }: FormPrompt) => {
  return (
    <>
      {to === "login" && (
        <p>
          Already have an account? Click{" "}
          <Link underline="always" href="/login" color="foreground">
            here
          </Link>{" "}
          to login
        </p>
      )}
      {to === "signup" && (
        <p>
          Don&apos;t have an account? Click{" "}
          <Link underline="always" href="/signup" color="foreground">
            here
          </Link>{" "}
          to sign up{" "}
        </p>
      )}
    </>
  );
};

export default FormPrompt;
