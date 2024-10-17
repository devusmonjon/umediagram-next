import { z } from "zod";

const loginFormSchema = z.object({
  username: z.string().min(2).max(50),
  password: z
    .string()
    .min(8)
    .max(50)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, {
      message: "At least 1 uppercase letter, 1 lowercase letter, 1 number",
    }),
});

const registerFormSchema = loginFormSchema.extend({
  confirmPassword: z
    .string()
    .min(8)
    .max(50)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, {
      message: "At least 1 uppercase letter, 1 lowercase letter, 1 number",
    }),
  full_name: z.string().min(2).max(50),
  photo: z.string().optional(),
  email: z.string().email(),
});

export { loginFormSchema, registerFormSchema };
