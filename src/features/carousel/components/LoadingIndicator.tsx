"use client";
import { LoadingSpinner } from "@/components";
import { copy } from "@/content/copy";

interface LoadingIndicatorProps {
  isLoading: boolean;
}

export default function LoadingIndicator({ isLoading }: LoadingIndicatorProps) {
  if (!isLoading) return null;

  return (
    <div className="absolute left-1/2 bottom-18 -translate-x-1/2 flex items-center justify-center z-50">
      <div className="flex flex-col items-center justify-center">
        <LoadingSpinner
          label={copy.common.loading}
          color="white"
          size={32}
        />
        <span className="text-white text-sm mt-3 opacity-80">
          {copy.common.loadingModels}
        </span>
      </div>
    </div>
  );
}
