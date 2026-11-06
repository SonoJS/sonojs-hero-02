import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SignInValues } from "../types";
import { createSignInSchema } from "../utils";

const signInSchema = createSignInSchema();

export function useSignInForm() {
  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = form.handleSubmit(() => {
    form.reset();
  });

  return { form, onSubmit };
}
