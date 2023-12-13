import { useState } from "react";
import { useUpdate } from "./useUpdate";
import { TUpdateSchema, updateSchema } from "../../lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons/faEyeSlash";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";

const UpdateForm = () => {
  const { update, isPending } = useUpdate();

  const [isPassEyeVisible, setIsPassEyeVisible] = useState(false);
  const [isConfirmPassEyeVisible, setIsConfirmPassEyeVisible] = useState(false);
  const togglePassEyeVisibility = () => setIsPassEyeVisible(!isPassEyeVisible);
  const toggleConfirmPassEyeVisibility = () =>
    setIsConfirmPassEyeVisible(!isConfirmPassEyeVisible);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TUpdateSchema>({
    resolver: zodResolver(updateSchema),
  });

  const onSubmit = (data: TUpdateSchema) => {
    update(
      { password: data.password },
      {
        onSettled: () => reset(),
      },
    );
  };

  return (
    //eslint-disable-next-line
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("password")}
        className="mb-5"
        label="New password"
        color="warning"
        isRequired
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message}
        variant="bordered"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={togglePassEyeVisibility}
          >
            {isPassEyeVisible ? (
              <FontAwesomeIcon color="gray" icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon color="gray" icon={faEye} />
            )}
          </button>
        }
        type={isPassEyeVisible ? "text" : "password"}
      />
      <Input
        {...register("confirmPassword")}
        className="mb-5"
        label="Confirm new password"
        color="warning"
        isRequired
        isInvalid={!!errors.confirmPassword}
        errorMessage={errors.confirmPassword?.message}
        variant="bordered"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleConfirmPassEyeVisibility}
          >
            {isConfirmPassEyeVisible ? (
              <FontAwesomeIcon color="gray" icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon color="gray" icon={faEye} />
            )}
          </button>
        }
        type={isConfirmPassEyeVisible ? "text" : "password"}
      />
      <Button
        isLoading={isPending}
        type="submit"
        size="lg"
        radius="sm"
        className="mb-3 w-full bg-gradient-to-tr from-pink-500 to-yellow-500 font-bold text-white focus:border-none"
      >
        Update
      </Button>
    </form>
  );
};

export default UpdateForm;
