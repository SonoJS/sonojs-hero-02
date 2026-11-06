"use client";
import { Input, ThemedButton } from "@/components/ui";
import { copy } from "@/content/copy";
import { useSignInForm } from "../hooks";

interface SignInFormProps {
  themeColor: string;
  isDesktop: boolean;
}

export default function SignInForm({ themeColor, isDesktop }: SignInFormProps) {
  const {
    form: {
      register,
      formState: { errors },
    },
    onSubmit,
  } = useSignInForm();

  const inputClass = isDesktop
    ? "px-3 py-2 rounded-xl text-sm"
    : "px-4 py-3 rounded-xl text-base";

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className={`flex flex-col ${isDesktop ? "gap-2" : "gap-3"}`}
    >
      <Input
        type="email"
        placeholder={copy.account.email}
        ringColor={themeColor}
        inputClassName={inputClass}
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        type="password"
        placeholder={copy.account.password}
        ringColor={themeColor}
        inputClassName={inputClass}
        error={errors.password?.message}
        {...register("password")}
      />
      <ThemedButton
        type="submit"
        themeColor={themeColor}
        className={
          isDesktop
            ? "py-2 px-4 rounded-xl text-sm"
            : "py-3 px-4 rounded-xl text-base"
        }
      >
        {copy.account.signIn}
      </ThemedButton>
    </form>
  );
}
