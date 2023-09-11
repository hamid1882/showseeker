import { z } from "zod";
import { LoginSchema } from "./schema";

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export interface User {
    email: string;
    password: string;
  }