"use client";
import React, { Suspense } from "react";
import MobileFilter from "./MobileFilter";
import DesktopFilter from "./DesktopFilter";
import Loading from "@/components/ui/Loading";

const FilterContent = () => {
  return (
    <>
      <div className="block md:hidden">
        <MobileFilter />
      </div>
      <div className="hidden md:block">
        <DesktopFilter />
      </div>
    </>
  );
};

const FilterPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <FilterContent />
    </Suspense>
  );
};

export default FilterPage;
