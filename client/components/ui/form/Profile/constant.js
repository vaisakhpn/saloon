import { z } from "zod";

const schema = (type) =>
  z.object({
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
  });

export default schema;
