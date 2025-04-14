import { Skeleton } from "@/components/ui/skeleton";

export default function VideoSkeleton() {
  return (
    <div className="flex flex-col gap-y-3">
       <Skeleton className="h-[200px] w-[400px] md:w-full rounded-xl bg-gray-700" />
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full bg-gray-700" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[300px] md:w-[250px] bg-gray-700" />
          <Skeleton className="h-4 w-[250px] md:w-[200px] bg-gray-700" />
        </div>
      </div>
    </div>
  );
}
