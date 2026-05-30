"use client";

import { ErrorState } from "@/components/ui/ErrorState";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 md:px-8 py-16">
      <ErrorState
        title="حدث خطأ غير متوقع"
        message={error.message || "يرجى المحاولة لاحقاً."}
        onRetry={reset}
      />
    </div>
  );
}
