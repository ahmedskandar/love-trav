import { FilePondFile } from "filepond";
import { Dispatch } from "react";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { z } from "zod";
import {
  ConversationResponseSchema,
  loginSchema,
  placeSchema,
  resetSchema,
  signUpSchema,
  travelFormSchema,
  updateSchema,
} from "./schemas";
import { User } from "@supabase/supabase-js";

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

export type FormData = {
  nationality: string;
  email: string;
  password: string;
  username: string;
  image: File;
  confirmPassword: string;
};

export type TSignUpSchema = z.infer<typeof signUpSchema>;

export type TLoginSchema = z.infer<typeof loginSchema>;

export type TResetSchema = z.infer<typeof resetSchema>;

export type TUpdateSchema = z.infer<typeof updateSchema>;

export type NationalitySelectProps = {
  register?: UseFormRegister<TSignUpSchema>;
  control: Control<TSignUpSchema>;
  formError: FieldErrors<TSignUpSchema>;
};

export type ImageUploadProps = {
  file: FilePondFile[];
  setFile: React.Dispatch<React.SetStateAction<FilePondFile[]>>;
};

export type ChatFormProps = {
  setUserMessage: Dispatch<React.SetStateAction<string>>;
};

export type ChatHeaderProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
};

export type ChatBodyProps = {
  isOpen: boolean;
};

export type ChatClient = {
  success: boolean;
  data: {
    id: number;
    slug: string;
    is_banned: boolean;
    image: string;
    created_at: Date;
    updated_at: Date;
  };
  message: string;
};

type UserMetadata = {
  avatar: string;
  clientChatSlug: string;
  username: string
};

export type NewUser = User & { user_metadata: UserMetadata };

export type TConversationResponseSchema = z.infer<
  typeof ConversationResponseSchema
>;

export type ConversationInput = {
  input: string;
  output: string;
  bot_id: number;
  client_slug: string;
};

export type ConversationFetch = {
  data: Conversation;
  error: Error;
};

export type Conversation = {
  id: number;
  input: string;
  output: string;
  clients: { image: string };
  bot: { image: string; name: string };
}[];

export type ConversationParams = {
  clientChatSlug: string;
};

export type TTravelFormSchema = z.infer<typeof travelFormSchema>;

export type TPlaceSchema = z.infer<typeof placeSchema>;

export type TEditForm = {
  id: number;
  notes: string;
  city: string;
  country: string;
  longitude: number;
  latitude: number;
};
