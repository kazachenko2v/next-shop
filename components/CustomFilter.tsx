"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { updateSearchParams } from "@/lib/utils2";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";

interface CustomFilterProps {
  title: string;
  options: {
    id: number;
    name: string;
    slug: string;
  }[];
  params: string | null;
}

const CustomFilter: React.FC<CustomFilterProps> = ({
  title,
  options,
  params,
}) => {
  const router = useRouter();

  const paramsArr = params ? params.split(",").map((el) => +el) : null;
  const [activeOptions, setActiveOptions] = React.useState<number[] | null>(
    paramsArr
  );

  React.useEffect(() => {
    setActiveOptions(paramsArr);
  }, [params]);

  const clickHandler = (event: Event) => {
    event.preventDefault();

    let plId: number;
    if (!event.target) {
      return;
    }

    options.forEach((el) => {
      const target = event.target as HTMLElement;
      if (el.name === target.innerText!) {
        plId = el.id;
      }
    });

    setActiveOptions((prev) => {
      let returnArr: number[];
      if (!prev) {
        return [plId];
      }

      if (prev.includes(plId)) {
        returnArr = prev.filter((el) => el !== plId);
      } else {
        returnArr = [...prev, plId];
      }

      return returnArr.sort((a, b) => a - b);
    });
  };

  const outsideClick = () => {
    if (!activeOptions) {
      return;
    }

    router.push(updateSearchParams(title, activeOptions.join(",")));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-1 items-center">
          {title.charAt(0).toUpperCase() + title.slice(1)}
          {paramsArr && paramsArr.length > 0 && (
            <Badge className="">{paramsArr.length}</Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onCloseAutoFocus={outsideClick}
        className="bg-white w-[200px]"
      >
        {options.map((pl) => (
          <DropdownMenuCheckboxItem
            key={pl.id}
            checked={activeOptions ? activeOptions.includes(pl.id) : false}
            onSelect={clickHandler}
          >
            {pl.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomFilter;
