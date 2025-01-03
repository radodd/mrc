"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface FilterContextProps {
  filterValueList: string[];
  // setFilterValueList: React.Dispatch<React.SetStateAction<string[]>>;
  setFilterValueList: (newList: string[]) => void;
  clearFilter: (filter: string) => void;
  tempFilterValueList: string[];
  setTempFilterValueList: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

// export const FilterProvider = ({ children }: { children: ReactNode }) => {
//   const [filterValueList, setFilterValueList] = useState<string[]>(() => {
//     const savedFilterValueList = localStorage.getItem("filterValueList");
//     return savedFilterValueList ? JSON.parse(savedFilterValueList) : [];
//   });

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filterValueList, setFilterValueList] = useState<string[]>([]);
  const [tempFilterValueList, setTempFilterValueList] = useState<string[]>([]);

  // useEffect(() => {
  //   console.log("filterValueList updated:", filterValueList);
  // }, [filterValueList]);

  useEffect(() => {
    const savedFilterValueList = localStorage.getItem("filterValueList");
    if (savedFilterValueList) {
      setFilterValueList(JSON.parse(savedFilterValueList));
    }
  }, []);

  useEffect(() => {
    // Update localStorage whenever filterValueList changes
    if (filterValueList.length > 0) {
      localStorage.setItem("filterValueList", JSON.stringify(filterValueList));
    } else {
      localStorage.removeItem("filterValueList"); // Remove from localStorage when empty
    }
  }, [filterValueList]);

  const clearFilter = (filter: string) => {
    setFilterValueList((prevFilters) =>
      prevFilters.filter((f) => f !== filter),
    );
    setTempFilterValueList((prevFilters) =>
      prevFilters.filter((f) => f !== filter),
    );
  };
  // const clearFilter = (filter: string) => {
  //   setFilterValueList((prevFilters) => {
  //     const updatedFilters = prevFilters.filter((f) => f !== filter);
  //     localStorage.setItem("filterValueList", JSON.stringify(updatedFilters)); // Update local storage
  //     return updatedFilters; // Return the filtered array
  //   });
  // };

  return (
    <FilterContext.Provider
      value={{
        filterValueList,
        setFilterValueList,
        clearFilter,
        setTempFilterValueList,
        tempFilterValueList,
      }}
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
