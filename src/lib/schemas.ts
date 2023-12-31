import { z } from "zod";

export const envSchema = z.object({
  VITE_SUPABASE_API_KEY: z.string().min(1),
  VITE_RAPID_API_KEY: z.string().min(1),
  VITE_REVERSE_GEOCODING_RAPID_API_KEY: z.string().min(1),
});

export const parsedEnv = envSchema.parse(import.meta.env);

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6, "Password length must be greater than 6"),
    nationality: z.set(z.string()).or(z.string()),
    username: z.string(),
    confirmPassword: z.string(),
    image: z.any(),
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

export const travelFormSchema = z.object({
  notes: z.string().trim(),
  city: z.string().trim(),
  country: z.string().trim(),
  longitude: z.coerce.number(),
  latitude: z.coerce.number(),
});

export const placeSchema = z.object({
  licence: z.string(),
  osm_id: z.number(),
  address: z.object({
    region: z.string().optional(),
    county: z.string().optional(),
    village: z.string().optional(),
    locality: z.string().optional(),
    country_code: z.string(),
    country: z.string(),
    state: z.string().optional(),
    municipality: z.string().optional(),
    postcode: z.string().optional(),
  }),
  osm_type: z.string(),
  boundingbox: z.array(z.string()),
  place_id: z.number(),
  lat: z.coerce.number(),
  lon: z.coerce.number(),
  display_name: z.string(),
});
