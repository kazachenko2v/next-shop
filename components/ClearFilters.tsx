"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "./ui/Button";

const ClearFilters = () => {
  const router = useRouter();

  return (
    <Button onClick={() => router.push(window.location.pathname)}>
      Clear All Filters
    </Button>
  );
};

export default ClearFilters;
