import { z } from "zod";

const schema = (type) =>
  z
    .object({
      username:
        type === "sign-in"
          ? z.string().optional()
          : z
              .string()
              .min(3, "Minimum 3 characters are required")
              .nonempty("Name is required"),
      email: z
        .string()
        .email("Invalid email format")
        .nonempty("Email is required"),
      password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .nonempty("Password is required"),
      confirmPassword:
        type === "sign-in"
          ? z.string().optional()
          : z.string().nonempty("Confirm Password is required"),
    })
    .refine(
      (data) =>
        type === "sign-up" ? data.password === data.confirmPassword : true,
      {
        message: "Passwords must match",
        path: ["confirmPassword"],
      }
    );

export default schema;
