import { z } from "zod";

export const envSchema = z.object({
  VITE_SUPABASE_API_KEY: z.string().min(1),
  VITE_RAPID_API_KEY: z.string().min(1),
});

export const parsedEnv = envSchema.parse(import.meta.env)

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6, "Password length must be greater than 6"),
    nationality: z.set(z.string()).or(z.string()),
    username: z.string(),
    confirmPassword: z.string(),
    image: z.any()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password length must be greater than 6"),
  remember: z.boolean().optional(),
});

export const resetSchema = z.object({
  email: z.string().email(),
});

export const updateSchema = z
  .object({
    password: z.string().min(6, "Password length must be greater than 6"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const ChatClientSchema = z.object({
  success: z.boolean(),
  data: z.object({
    id: z.number(),
    slug: z.string(),
    is_banned: z.boolean(),
    image: z.string(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
  }),
  message: z.string(),
});

export const ConversationResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    conversation: z.object({
      id: z.number(),
      slug: z.string(),
      input: z.string(),
      output: z.string(),
      topic: z.string(),
    }),
    bot: z.object({
      id: z.number(),
      slug: z.string(),
      name: z.string(),
      image: z.string(),
    }),
    client: z.object({
      id: z.number(),
      slug: z.string(),
      is_banned: z.boolean(),
      image: z.string(),
    }),
    features: z.array(z.unknown()),
    metadata: z.object({
      version: z.string(),
      date: z.string(),
      duration: z.number(),
    }),
  }),
  message: z.string(),
});