// src/components/skeletons/ContentGridSkeleton.jsx
import { Skeleton } from "@/components/ui/skeleton";

export default function ContentGridSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 1. Top Section: Title & Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-9 w-48" /> {/* Page Title */}
          <Skeleton className="h-4 w-64" /> {/* Subtitle or Breadcrumb */}
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24" /> {/* Secondary Action */}
          <Skeleton className="h-10 w-32" /> {/* Primary Action */}
        </div>
      </div>

      {/* 2. Body Section: Adaptable Grid */}
      <div className="grid gap-4">
        {/* Large Main Area (could be a table, a large list, or a form shell) */}
        <div className="rounded-xl border border-border bg-card/50 p-6">
          <div className="space-y-6">
            {/* Header placeholder */}
            <div className="flex justify-between border-b pb-4">
               <Skeleton className="h-5 w-1/4" />
               <Skeleton className="h-5 w-1/4 hidden md:block" />
               <Skeleton className="h-5 w-1/4" />
            </div>

            {/* Repeating rows of content */}
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-lg" /> {/* Avatar or Icon */}
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
                <Skeleton className="h-8 w-8 rounded-full" /> {/* Option dots */}
              </div>
            ))}
          </div>
        </div>

        {/* 3. Footer/Meta Section */}
        <div className="flex items-center justify-between px-2">
          <Skeleton className="h-4 w-32" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      </div>
    </div>
  );
}