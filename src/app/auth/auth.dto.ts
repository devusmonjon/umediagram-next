import { z } from "zod";

const loginFormSchema = z.object({
  username: z.string().min(2).max(50),
  password: z
    .string()
    .min(6)
    .max(50)
});

const registerFormSchema = loginFormSchema.extend({
  confirmPassword: z
    .string()
    .min(6)
    .max(50),
  full_name: z.string().min(2).max(50),
  photo: z.string().optional(),
  email: z.string().email(),
});

export { loginFormSchema, registerFormSchema };
