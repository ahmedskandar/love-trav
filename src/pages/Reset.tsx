import { Button, Input } from "@nextui-org/react";
import Heading from "../ui/Heading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { TResetSchema, resetSchema } from "../lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useReset } from "../hooks/useReset";
import Logo from "../ui/Logo";

const Reset = () => {
  const { reset: resetFunction, isPending } = useReset();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TResetSchema>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = (data: TResetSchema) => {
    resetFunction(
      { email: data.email },
      {
        onSettled: () => reset(),
      },
    );
  };

  return (
    <div className="mx-auto max-w-xl space-y-8 p-10">
      <div className="flex justify-center">
        <Logo />
      </div>
      <Heading>Recover your password</Heading>
      <div className="space-y-2">
        <h3 className="font-bold">Forgot your password? No problem!</h3>{" "}
        <p>
          We understand that it happens to the best of us. You can use the form
          below to reset your password. Please do enter the email to which you
          would like to reset the password
        </p>
      </div>
      {/* eslint-disable-next-line */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          isRequired
          {...register("email")}
          type="email"
          variant="bordered"
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
          label="Email"
          className="mb-5 placeholder:text-black"
          color="warning"
          endContent={<FontAwesomeIcon color="lightgray" icon={faEnvelope} />}
        />
        <Button
          isLoading={isPending}
          type="submit"
          size="lg"
          radius="sm"
          className="mb-3 w-full bg-gradient-to-tr from-pink-500 to-yellow-500 font-bold text-white focus:border-none"
        >
          Reset
        </Button>
      </form>
    </div>
  );
};

export default Reset;
