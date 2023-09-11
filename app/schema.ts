import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z
      .string()
      .min(8, "Password must have at least 8 characters")
      .max(16, "Password must have at most 16 characters")
      .regex(/^[a-zA-Z0-9]+$/, "Password must contain only alphanumeric characters"),
  });
  