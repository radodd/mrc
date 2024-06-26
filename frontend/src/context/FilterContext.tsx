"use client";
// src/contexts/FilterContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface FilterContextProps {
  filterValueList: string[];
  setFilterValueList: React.Dispatch<React.SetStateAction<string[]>>;
  clearFilter: (filter: string) => void;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filterValueList, setFilterValueList] = useState<string[]>([]);
  const clearFilter = (filter: string) => {
    setFilterValueList((prevFilters) =>
      prevFilters.filter((f) => f !== filter),
    );
  };
  return (
    <FilterContext.Provider
      value={{ filterValueList, setFilterValueList, clearFilter }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
