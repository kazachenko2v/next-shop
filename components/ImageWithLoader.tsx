"use client";

import React from "react";
import Image from "next/image";
import { Skeleton } from "./ui/Skeleton";
import { cn } from "@/lib/utils";

interface ImageWithLoaderProps {
  src: string;
  alt: string;
}

const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({ src, alt }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  return (
    <>
      <Image
        src={src ? src : "/assets/images/errorLoadingImg.jpg"}
        alt={alt}
        fill
        sizes="w-28 h-16"
        className={cn(
          "object-cover rounded-md",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        priority={true}
        onLoadingComplete={() => setIsLoading(false)}
      />
      {isLoading ? <Skeleton className="w-full h-full" /> : null}
    </>
  );
};

export default ImageWithLoader;
