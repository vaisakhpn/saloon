import { z } from "zod";

const schema = () =>
  z.object({
    username: z
      .string()
      .min(3, "Minimum 3 characters are required")
      .nonempty("Name is required"),
    email: z
      .string()
      .email("Invalid email format")
      .nonempty("Email is required"),
    password: z.string().min(0, "").optional(),
  });

export default schema;
