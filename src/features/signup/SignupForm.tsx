import { useState } from "react";

import ImageUpload from "../../ui/ImageUpload";
import NationalitySelect from "../../ui/NationalitySelect";

import { FilePondFile } from "filepond";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input } from "@nextui-org/react";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons/faEyeSlash";
import { useForm } from "react-hook-form";
import FormPrompt from "../../ui/FormPrompt";
import { FormData, signUpSchema } from "../../lib/types";
import { useSignup } from "../../hooks/useSignup";
import { zodResolver } from "@hookform/resolvers/zod";

const SignupForm = () => {
  const [isPassEyeVisible, setIsPassEyeVisible] = useState(false);
  const [isConfirmPassEyeVisible, setIsConfirmPassEyeVisible] = useState(false);
  const togglePassEyeVisibility = () => setIsPassEyeVisible(!isPassEyeVisible);
  const toggleConfirmPassEyeVisibility = () =>
    setIsConfirmPassEyeVisible(!isConfirmPassEyeVisible);
  const [file, setFile] = useState<FilePondFile[]>([]);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
  });

  const { signup, isPending } = useSignup();

  const onSubmit = (data: FormData) => {
    const nationality = Array.from(data.nationality)[0];
    const userData: FormData = { ...data, nationality, image: file[0]?.file as File || "" };
    signup(userData, {
      onSuccess: () => {
        setFile([]);
        reset();
      },
    });
  };

  // const onerror: SubmitErrorHandler<FormData> = (e) => console.log(e);

  return (
    //eslint-disable-next-line
    <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("username")}
        isRequired
        type="text"
        variant="bordered"
        isInvalid={!!errors.username}
        errorMessage={errors.username?.message}
        label="Username"
        className="mb-5 placeholder:text-black"
        color="warning"
      />
      <Input
        {...register("email")}
        isRequired
        type="email"
        variant="bordered"
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message}
        label="Email"
        className="mb-5 placeholder:text-black"
        color="warning"
        endContent={<FontAwesomeIcon color="lightgray" icon={faEnvelope} />}
      />
      <Input
        {...register("password")}
        className="mb-5"
        label="Password"
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
        label="Confirm password"
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

      <NationalitySelect formError={errors} control={control} />

      <ImageUpload file={file} setFile={setFile} />

      <Button
        isLoading={isPending}
        type="submit"
        radius="sm"
        className="mb-3 w-full bg-gradient-to-tr from-pink-500 to-yellow-500 font-bold text-white"
      >
        Sign up
      </Button>

      <FormPrompt to="login" />
    </form>
  );
};

export default SignupForm;
