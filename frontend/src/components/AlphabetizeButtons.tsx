import React from "react";
import { Button } from "./ui/button";
import sortProducts from "../lib/sortProducts";

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
    <div>
      <Button
        variant="otherFilter"
        size="filter"
        onClick={() => setAlphabetFilter(!alphabetFilter)}
      >
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
    </div>
  );
};

export default AlphabetizeButtons;
