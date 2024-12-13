import React from "react";
import { Button } from "./ui/button";
import sortProducts from "../lib/sortProducts";
import Image from "next/image";

const AlphabetizeButtons = ({
  products,
  setProducts,
  alphabetFilter,
  setAlphabetFilter,
}) => {
  const handleSort = (direction) => {
    const sortedList = sortProducts(products, direction);
    setProducts(sortedList);
  };
  return (
    <>
      <Button
        variant="otherFilter"
        size="filter"
        onClick={() => setAlphabetFilter(!alphabetFilter)}
        className="h-fit"
      >
        <Image
          src="/sort_arrows.svg"
          alt=""
          width={23}
          height={23}
          className="pr-2"
        />
        Sort by: A-Z
      </Button>
      {alphabetFilter && (
        <div className="z-50 absolute">
          <Button
            variant="filter"
            size="filter"
            onClick={() => handleSort("asc")}
          >
            A-Z
          </Button>
          <Button
            variant="filter"
            size="filter"
            onClick={() => handleSort("desc")}
          >
            Z-A
          </Button>
        </div>
      )}
    </>
  );
};

export default AlphabetizeButtons;
