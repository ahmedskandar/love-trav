import { FilePondFile } from "filepond";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { z } from "zod";

export type User = {
  id: number;
  created_at: string;
  username: string;
  password: string;
  nationality: string;
  notes: string;
  image: string;
  email: string;
  name: string;
  status: "Online" | "Offline";
};

export enum UserKeys {
  STATUS = "status",
  NAME = "name",
}

export type UsePaginatedItemsProps<T> = {
  queryKey: string[];
  queryFn: () => Promise<T[]>;
  rowsPerPage: number;
};

export type Country = Record<string, string>;

export type FormPrompt = {
  to: "login" | "signup";
};

export type Children = {
  children: React.ReactNode;
};

export type ClassName = {
  className?: string;
};

export type Heading = Children & ClassName;

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6, "Password length must be greater than 6"),
    nationality: z.set(z.string()),
    username: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password length must be greater than 6"),
  remember: z.boolean()
})

export type TLoginSchema = z.infer<typeof loginSchema>

export type FormData = {
  nationality: string;
  email: string;
  password: string;
  username: string;
  image: File
  confirmPassword: string,
};

export type NationalitySelectProps = {
  register?: UseFormRegister<FormData>;
  control: Control<FormData>;
  formError: FieldErrors<FormData>;
};

export type ImageUploadProps = {
  file: FilePondFile[];
  setFile: React.Dispatch<React.SetStateAction<FilePondFile[]>>;
};
