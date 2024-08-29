"use client";
// src/contexts/FilterContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface FilterContextProps {
  filterValueList: string[];
  setFilterValueList: React.Dispatch<React.SetStateAction<string[]>>;
  clearFilter: (filter: string) => void;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filterValueList, setFilterValueList] = useState<string[]>(() => {
    const savedFilterValueList = localStorage.getItem("filterValueList");
    return savedFilterValueList ? JSON.parse(savedFilterValueList) : [];
  });

  useEffect(() => {
    localStorage.setItem("filterValueList", JSON.stringify(filterValueList));
  }, [filterValueList]);

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
