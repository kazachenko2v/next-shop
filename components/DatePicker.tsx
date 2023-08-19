"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { dateToString, updateSearchParams } from "@/lib/utils2";
import { Button } from "./ui/Button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/Calendar";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";

const CustomFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initOptions = searchParams.get("dates");
  const da = {
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  };
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  const clickHandler = (dates: DateRange | undefined) => {
    // options.forEach((el) => {
    //   const target = event.target as HTMLElement;
    //   if (el.name === target.innerText!) {
    //     plId = el.id;
    //   }
    // });
    // setActiveOptions((prev) => {
    //   let returnArr: number[];
    //   if (!prev) {
    //     return [plId];
    //   }
    //   if (prev.includes(plId)) {
    //     returnArr = prev.filter((el) => el !== plId);
    //   } else {
    //     returnArr = [...prev, plId];
    //   }
    //   return returnArr.sort((a, b) => a - b);
    // });
  };

  const outsideClick = (isOpen: boolean) => {
    if (isOpen) {
      return;
    }

    if (date?.to && date.from) {
      router.push(
        updateSearchParams(
          "dates",
          `${dateToString(date.from)},${dateToString(date.to)}`,
        ),
      );
    }
  };

  return (
    <Popover onOpenChange={outsideClick}>
      <PopoverTrigger asChild>
        <Button id="date" variant={"outline"}>
          Dates
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
        />
      </PopoverContent>
    </Popover>
  );
};

export default CustomFilter;
