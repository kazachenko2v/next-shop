import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import createQueryString from "@/utils/createQueryString";


const Pagination = ({page,
  setPage,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();



  const nextHandler = () => {
    setPage((prev) => prev + 1);
    router.push(
      pathname +
        "?" +
        createQueryString(searchParams.toString(), "page", page + 1)
    );
  };

  const prevHandler = () => {
    if (page <= 1) {
      return;
    }
    setPage((prev) => prev - 1);
    router.push(
      pathname +
        "?" +
        createQueryString(searchParams.toString(), "page", page - 1)
    );
  };

  return (
    <>
      <button onClick={prevHandler}>prev</button>
      <button onClick={nextHandler}>next</button>
    </>
  );
};

export default Pagination;
