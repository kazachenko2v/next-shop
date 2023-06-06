import { GAMES, KEY, PATH } from "@/constants/api";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default (page: number, platform: number[] | null) => {
  const { data, error, isLoading } = useSWR(
    PATH +
      GAMES +
      KEY +
      (page > 1 ? "&page=" + page : "") +
      (platform ? "&platforms=" + platform : ""),
    fetcher
  );

  return { data, error, isLoading };
};
