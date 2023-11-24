import { FilePondFile } from "filepond";
import {
  Control,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

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

export type NationalitySelectProps = {
  register?: UseFormRegister<FieldValues>;
  control: Control<FieldValues, Country>;
};

export type ImageUploadProps = {
  file: FilePondFile[];
  setFile: React.Dispatch<React.SetStateAction<FilePondFile[]>>;
}