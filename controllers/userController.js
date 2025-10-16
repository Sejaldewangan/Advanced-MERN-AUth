import tryCatch from "../middleware/tryCatch.js";
import sanitize from "mongo-sanitize";
import { registerSchema } from "../config/zod.js";

export const registerUser = tryCatch(async (req, res) => {
  const sanitizedBody = sanitize(req.body);

  const validation = registerSchema.safeParse(sanitizedBody);
  if (!validation.success) {
    const zodError = validation.error;
    let firstErrorMessage = "Validation failed";
    let allErrors = [];

    if (zodError?.issues && Array.isArray(zodError.issues)) {
      allErrors = zodError.issues.map((issue) => ({
        field: issue.path ? issue.path.join(".") : "unknown",
        message: issue.message || "Validation error",
        code: issue.code,
      }));
    }

    firstErrorMessage = allErrors[0]?.message || "Validation error";
    return res.status(400).json({ message: firstErrorMessage, errors: allErrors });
  }

  const { name, email, password } = validation.data;
  return res.status(200).json({ name, email, password });
});
