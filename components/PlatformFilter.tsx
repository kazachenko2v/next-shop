import React from "react";

import { PLATFORMS } from "@/constants/initFilter";

const PlatformFilter = ({
  setPlatform,
}: {
  setPlatform: React.Dispatch<React.SetStateAction<number[] | null>>;
}) => {
  const clickHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlatform((prev) =>
      prev ? [...prev, +event.target.value] : [+event.target.value]
    );

  };

  return (
    <div>
      {PLATFORMS.map((pl) => (
        <label key={pl.id}>
          <input onChange={clickHandler} type="checkbox" value={pl.id} />
          <span>{pl.name}</span>
        </label>
      ))}
    </div>
  );
};

export default PlatformFilter;
