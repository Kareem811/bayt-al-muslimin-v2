"use client";

import { IoMdRefresh } from "react-icons/io";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "حدث خطأ",
  message = "تعذّر تحميل البيانات. يرجى المحاولة مرة أخرى.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="rounded-3xl border border-red-200 bg-red-50/60 p-8 text-center">
      <div className="text-3xl mb-2">⚠️</div>
      <h3 className="font-bold text-red-900 text-lg mb-1">{title}</h3>
      <p className="text-red-800/80 text-sm mb-4">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white text-sm font-medium hover:bg-red-700"
        >
          <IoMdRefresh /> إعادة المحاولة
        </button>
      )}
    </div>
  );
}
