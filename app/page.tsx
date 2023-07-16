import Link from "next/link";
import Pagination from "@/components/Pagination";
import CustomFilter from "@/components/CustomFilter";
import { fetchGames } from "@/lib/utils2";
import { GENRES, PLATFORMS, TAGS } from "@/constants/initFilter";
import DatePicker from "@/components/DatePicker";
import ClearFilters from "@/components/ClearFilters";
import ImageWithLoader from "@/components/ImageWithLoader";

export default async function Home({ searchParams }: any) {
  const data = await fetchGames({
    page: searchParams.page || null,
    platforms: searchParams.platforms || null,
    genres: searchParams.genres || null,
    tags: searchParams.tags || null,
    dates: searchParams.dates || null,
  });

  return (
    <>
      <div className="flex py-3 gap-2">
        <CustomFilter
          title={"platforms"}
          options={PLATFORMS}
          params={searchParams.platforms || null}
        />
        <CustomFilter
          title={"genres"}
          options={GENRES}
          params={searchParams.genres || null}
        />
        <CustomFilter
          title={"tags"}
          options={TAGS}
          params={searchParams.tags || null}
        />
        <DatePicker />
        {Object.keys(searchParams).length > 0 ? <ClearFilters /> : null}
      </div>
      <div className="grid gap-4 grid-cols-4 grid-rows-[repeat(8, minmax(0, 1fr))]">
        {data &&
          data?.results.map((p: any) => (
            <div className="col-span-4 md:col-span-1 sm:col-span-2" key={p.id}>
              <Link href={"/" + p.id}>
                <div className="aspect-video relative">
                  <ImageWithLoader src={p.background_image} alt={p.name} />
                </div>
              </Link>
              <p>{p.name}</p>
            </div>
          ))}
      </div>
      <Pagination count={data?.count} />
    </>
  );
}
