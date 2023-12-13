import ResetForm from "../features/reset/ResetForm";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";

const Reset = () => {
  return (
    <div className="mx-auto max-w-xl space-y-8 p-10">
      <div className="flex justify-center">
        <Logo />
      </div>
      <Heading>Recover your password</Heading>
      <div className="space-y-2">
        <h3 className="font-bold">Forgot your password? No problem!</h3>
        <p>
          We understand that it happens to the best of us. You can use the form
          below to reset your password. Please do enter the email to which you
          would like to reset the password
        </p>
      </div>
      <ResetForm />
    </div>
  );
};

export default Reset;
