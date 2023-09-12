import { z } from "zod";
import { LoginSchema } from "./schema";

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export interface User {
    email: string;
    password: string;
  }

export interface ShowData {
  poster: string;
  image?: { medium : string };
  name: string;
  summary: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  schedule: {
    time: string;
    days: string[];
  };
}