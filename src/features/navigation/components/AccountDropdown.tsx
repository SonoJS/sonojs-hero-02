"use client";
import { ThemedButton } from "@/components/ui";
import { copy } from "@/content/copy";
import DropdownPanel from "./DropdownPanel";
import SignInForm from "./SignInForm";

interface AccountDropdownProps {
  themeColor: string;
  isDesktop?: boolean;
}

export default function AccountDropdown({
  themeColor,
  isDesktop = true,
}: AccountDropdownProps) {
  return (
    <DropdownPanel isDesktop={isDesktop}>
      <div className={isDesktop ? "px-6 py-4" : "p-5"}>
        <h3 className="font-semibold text-gray-800 mb-3">
          {copy.account.title}
        </h3>

        <div className="space-y-4">
          <SignInForm themeColor={themeColor} isDesktop={isDesktop} />

          <div
            className={`border-t border-gray-100 ${
              isDesktop ? "pt-2" : "pt-3"
            } text-center`}
          >
            <p
              className={`${
                isDesktop ? "text-xs" : "text-sm mb-2"
              } text-gray-500`}
            >
              {copy.account.noAccount}
            </p>
            <ThemedButton
              themeColor={themeColor}
              variant="text"
              className={isDesktop ? "text-sm" : "text-base"}
            >
              {copy.account.register}
            </ThemedButton>
          </div>
        </div>
      </div>
    </DropdownPanel>
  );
}
