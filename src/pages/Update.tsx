import { Button, Input, Spinner } from "@nextui-org/react";
import Heading from "../ui/Heading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TUpdateSchema, updateSchema } from "../lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons/faEyeSlash";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { useUpdate } from "../hooks/useUpdate";
import Logo from "../ui/Logo";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const Update = () => {
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
  const navigate = useNavigate();
  const onSubmit = (data: TUpdateSchema) => {
    update(
      { password: data.password },
      {
        onSettled: () => reset(),
      },
    );
  };
  const { isAuthenticated, isPending: isAuthPending } = useUser();

  useEffect(() => {
const params = window.location.hash
  .substr(1)
  .split("&")
  .reduce((acc: Record<string, string>, pair) => {
    const [key, value] = pair.split("=");
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {});

const err = params.error_description;
    if (err) {
      toast.error(err.replace(/\+/g, " "));
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1);
    } else if (!isAuthenticated && !isAuthPending) {
      toast.error("Access denied");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1);
    }
  }, [navigate, isAuthenticated, isAuthPending]);

  if (isAuthPending)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner size="lg" color="warning" />
      </div>
    );
  return (
    <>
      {isAuthenticated && (
        <div className="mx-auto max-w-xl space-y-8 p-10">
          <div className="flex justify-center">
            <Logo />
          </div>
          <Heading>Update your password</Heading>
          {/* eslint-disable-next-line */}
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
            />{" "}
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
        </div>
      )}
    </>
  );
};

export default Update;
