import { SkeletonGrid } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-10">
      <SkeletonGrid count={6} />
    </div>
  );
}
