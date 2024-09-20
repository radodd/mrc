"use client";
import { Button } from "../../../components/ui/button";
import { Skeleton } from "../../../components/ui/skeleton";
import { useState } from "react";

export default function Projects() {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <div className="padding-section bg-whitebase px-[71px] flex flex-col justify-center items-center">
        <h1 className="py-[85px]">Projects Gallery</h1>
        <div className="grid grid-cols-3 gap-6 mb-[95px]">
          <div className="space-y-4">
            <Skeleton className="w-[441px] h-[234px]" />
            <div className="space-y-2">
              <Skeleton className="w-[300px] h-4" />
              <Skeleton className="w-[250px] h-4" />
              <Skeleton className="w-[200px] h-4" />
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="w-[441px] h-[234px]" />
            <div className="space-y-2">
              <Skeleton className="w-[300px] h-4" />
              <Skeleton className="w-[250px] h-4" />
              <Skeleton className="w-[200px] h-4" />
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="w-[441px] h-[234px]" />
            <div className="space-y-2">
              <Skeleton className="w-[300px] h-4" />
              <Skeleton className="w-[250px] h-4" />
              <Skeleton className="w-[200px] h-4" />
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="w-[441px] h-[234px]" />
            <div className="space-y-2">
              <Skeleton className="w-[300px] h-4" />
              <Skeleton className="w-[250px] h-4" />
              <Skeleton className="w-[200px] h-4" />
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="w-[441px] h-[234px]" />
            <div className="space-y-2">
              <Skeleton className="w-[300px] h-4" />
              <Skeleton className="w-[250px] h-4" />
              <Skeleton className="w-[200px] h-4" />
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="w-[441px] h-[234px]" />
            <div className="space-y-2">
              <Skeleton className="w-[300px] h-4" />
              <Skeleton className="w-[250px] h-4" />
              <Skeleton className="w-[200px] h-4" />
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="w-[441px] h-[234px]" />
            <div className="space-y-2">
              <Skeleton className="w-[300px] h-4" />
              <Skeleton className="w-[250px] h-4" />
              <Skeleton className="w-[200px] h-4" />
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="w-[441px] h-[234px]" />
            <div className="space-y-2">
              <Skeleton className="w-[300px] h-4" />
              <Skeleton className="w-[250px] h-4" />
              <Skeleton className="w-[200px] h-4" />
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="w-[441px] h-[234px]" />
            <div className="space-y-2">
              <Skeleton className="w-[300px] h-4" />
              <Skeleton className="w-[250px] h-4" />
              <Skeleton className="w-[200px] h-4" />
            </div>
          </div>
        </div>

        <Button
          variant="link"
          onClick={() => setExpanded(!expanded)}
          className="pb-[83px]"
        >
          See More
        </Button>
        {expanded && (
          <div className="bg-whitebase pb-[83px]">
            <div className="space-y-4">
              <Skeleton className="w-[441px] h-[234px]" />
              <div className="space-y-2">
                <Skeleton className="w-[300px] h-4" />
                <Skeleton className="w-[250px] h-4" />
                <Skeleton className="w-[200px] h-4" />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="bg-whitebase flex flex-col justify-center items-center w-screen pb-[103px]">
        <div className="pb-[42px]">
          <h1>Companies we have partnered with</h1>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <Skeleton className="w-[373px] h-[233px]" />
          <Skeleton className="w-[373px] h-[233px]" />
          <Skeleton className="w-[373px] h-[233px]" />
          <Skeleton className="w-[373px] h-[233px]" />
          <Skeleton className="w-[373px] h-[233px]" />
          <Skeleton className="w-[373px] h-[233px]" />
          <Skeleton className="w-[373px] h-[233px]" />
          <Skeleton className="w-[373px] h-[233px]" />
          <Skeleton className="w-[373px] h-[233px]" />
          <Skeleton className="w-[373px] h-[233px]" />
          <Skeleton className="w-[373px] h-[233px]" />
          <Skeleton className="w-[373px] h-[233px]" />
        </div>
      </div>
    </>
  );
}
