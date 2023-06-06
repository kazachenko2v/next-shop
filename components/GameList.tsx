"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Loading from "./Loader";
import useGetGames from "@/hooks/useGetGames";
import { GAMES, KEY, PARENT_PLATFORMS, PATH } from "@/constants/api";
import useSWR from "swr";
import Pagination from "./Pagination";
import PlatformFilter from "./PlatformFilter";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const GameList = () => {
  const searchParams = useSearchParams();

  const initPage = searchParams.get("page");

  const [page, setPage] = React.useState<number>(() =>
    initPage ? +initPage : 1
  );
  const [platform, setPlatform] = React.useState<number[] | null>(null);
  const { data, error, isLoading } = useGetGames(page, platform);
  console.log(platform);

  return (
    <>
      <PlatformFilter setPlatform={setPlatform} />
      <>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid gap-4 grid-cols-4 grid-rows-[repeat(8, minmax(0, 1fr))] justify-items-center">
            {data?.results.map((p: any) => (
              <div className="text-center" key={p.id}>
                <Link href={"/" + p.id}>
                  <div className="relative w-28 h-16">
                    <Image
                      src={
                        p.background_image
                          ? p.background_image
                          : "/assets/images/errorLoadingImg.jpg"
                      }
                      alt={p.name}
                      fill={true}
                      sizes="w-28 h-16"
                      className="object-cover"
                    />
                  </div>
                </Link>
                <p>{p.name}</p>
              </div>
            ))}
          </div>
        )}
      </>

      <Pagination page={page} setPage={setPage} />
    </>
  );
};

export default GameList;
