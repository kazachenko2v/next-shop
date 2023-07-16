import { Skeleton } from "@/components/ui/Skeleton";
import { Loader2 } from "lucide-react";
import Image from "next/image";

const Loading = () => {
  return (
    // <div className="w-full min-h-full flex justify-center items-center">
    //   <Loader2 className="h-5 w-5 animate-spin text-zinc-500" />
    // </div>
    <>
      <div className="flex py-3 gap-2">
        <Skeleton className="h-2 w-2" />
        <Skeleton className="h-2 w-2" />
        <Skeleton className="h-2 w-2" />
        <Skeleton className="h-2 w-2" />
      </div>
      <div className="grid gap-4 grid-cols-4 grid-rows-[repeat(8, minmax(0, 1fr))]">
        {Array.from({ length: 20 }).map((i: any, index) => (
          <div className="col-span-4 md:col-span-1 sm:col-span-2" key={index}>
            <div className="aspect-video relative">
              <Skeleton className="w-full h-full" />
            </div>
            <Skeleton className="h-2 w-2" />
          </div>
        ))}
      </div>
    </>
  );
};

export default Loading;
