import { Button, Input } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { TResetSchema, resetSchema } from "../../lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useReset } from "./useReset";

const ResetForm = () => {
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
    //eslint-disable-next-line
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
  );
};

export default ResetForm;
