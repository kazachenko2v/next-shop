import { Skeleton } from "@/components/ui/Skeleton";
import { Loader2 } from "lucide-react";
import Image from "next/image";

const Loading = () => {
  return (
    // <div className="w-full min-h-full flex justify-center items-center">
    //   <Loader2 className="h-5 w-5 animate-spin text-zinc-500" />
    // </div>
    <>
      <div className="flex gap-2 py-3">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
      <div className="grid-rows-[repeat(8, minmax(0, 1fr))] grid grid-cols-4 gap-4">
        {Array.from({ length: 20 }).map((i: any, index) => (
          <div className="col-span-4 sm:col-span-2 md:col-span-1" key={index}>
            <div className="relative aspect-video">
              <Skeleton className="h-full w-full" />
            </div>
            <Skeleton className="h-2 w-2" />
          </div>
        ))}
      </div>
    </>
  );
};

export default Loading;
