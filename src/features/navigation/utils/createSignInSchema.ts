import { z } from "zod";
import { copy } from "@/content/copy";

export function createSignInSchema() {
  const messages = copy.account.validation;

  return z.object({
    email: z
      .string()
      .min(1, messages.emailRequired)
      .email(messages.emailInvalid),
    password: z.string().min(1, messages.passwordRequired),
  });
}
