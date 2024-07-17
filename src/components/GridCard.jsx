import React from "react";
import GridPattern from "./GridPattern";
import { cn } from "../lib/utils";

const GridPatternDemo = ({ title, count }) => {
  const squares = [
    [4, 4],
    [5, 1],
    [8, 2],
    [6, 6],
    [10, 5],
    [13, 3],
  ];

  const patternClassName = cn(
    "[mask-image:radial-gradient(200px_circle_at_center,white,transparent)]",
    "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
  );

  return (
    <div className="responsiveGrid relative flex w-full md:w-[50%] lg:w-[25%] h-[95%] m-5 max-w-xs max-h-[200px] pb-1 items-center justify-center rounded-lg border overflow-hidden bg-white p-20">

      <div className="h-[100%] w-[100%] absolute top-0 left-0 overflow-hidden p-2 flex flex-col justify-around items-start">

        <p className="z-10 h-fit font-medium tracking-tighter text-black">
          {title}
        </p>

        <p className="z-10 w-full text-center font-medium tracking-tighter text-black">
          {count}
        </p>

      </div>
      <GridPattern squares={squares} className={patternClassName} />
    </div>
  );
};

export default GridPatternDemo;
