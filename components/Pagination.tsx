"use client";

import React from "react";
import { default as RcPagination } from "rc-pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { updateSearchParams } from "@/lib/utils2";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "./ui/Button";

interface PaginationProps {
  count: number;
}

const Pagination: React.FC<PaginationProps> = ({ count }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const clickHandler = (page: number) => {
    router.push(updateSearchParams("page", page.toString()));
  };

  return (
    <RcPagination
      total={count}
      pageSize={20}
      current={currentPage}
      onChange={clickHandler}
      hideOnSinglePage
      className="flex gap-4 py-3"
      itemRender={(current, type) => {
        switch (type) {
          case "prev":
            return (
              <Button variant="outline">
                <ChevronLeft />
              </Button>
            );
          case "next":
            return (
              <Button variant="outline">
                <ChevronRight />
              </Button>
            );
          case "jump-prev":
          case "jump-next":
            return (
              <Button variant="outline">
                <MoreHorizontal />
              </Button>
            );
          case "page":
            if (current === currentPage) {
              return <Button>{current}</Button>;
            }
            return <Button variant="outline">{current}</Button>;
        }
      }}
    />
  );
};

export default Pagination;
