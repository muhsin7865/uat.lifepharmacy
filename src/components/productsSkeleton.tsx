import React from "react";
import { Skeleton } from "./ui/skeleton";
export const ProductsSkeleton = ({}) => {
  return (
    <div className=" w-full ">
        <Skeleton className="w-full p-24  rounded-lg mb-2" />
        <Skeleton className="w-3/4 p-1.5 rounded-full mb-2" />
        <Skeleton className="w-full p-1.5 rounded-full mb-2" />
    </div>
  );
};
