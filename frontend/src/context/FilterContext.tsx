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

// export const FilterProvider = ({ children }: { children: ReactNode }) => {
//   const [filterValueList, setFilterValueList] = useState<string[]>(() => {
//     const savedFilterValueList = localStorage.getItem("filterValueList");
//     return savedFilterValueList ? JSON.parse(savedFilterValueList) : [];
//   });

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filterValueList, setFilterValueList] = useState<string[]>([]);

  // useEffect(() => {
  //   localStorage.setItem("filterValueList", JSON.stringify(filterValueList));
  // }, [filterValueList]);

  useEffect(() => {
    const savedFilterValueList = localStorage.getItem("filterValueList");
    if (savedFilterValueList) {
      setFilterValueList(JSON.parse(savedFilterValueList));
    }
  }, []);

  const clearFilter = (filter: string) => {
    setFilterValueList((prevFilters) =>
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

// import React, {
//   createContext,
//   useContext,
//   useState,
//   ReactNode,
//   useEffect,
//   useMemo,
// } from "react";

// interface FilterContextProps {
//   filterValueList: string[];
//   setFilterValueList: React.Dispatch<React.SetStateAction<string[]>>;
//   clearFilter: (filter: string) => void;
// }

// const FilterContext = createContext<FilterContextProps | undefined>(undefined);

// export const FilterProvider = ({ children }: { children: ReactNode }) => {
//   console.log("FilterProvider render");
//   // Initialize state
//   const [filterValueList, setFilterValueList] = useState<string[]>(() => {
//     if (typeof window !== "undefined") {
//       try {
//         const savedFilterValueList = localStorage.getItem("filterValueList");
//         console.log(
//           "Initializing state with localStorage value:",
//           savedFilterValueList,
//         );

//         if (savedFilterValueList) {
//           return Array.from(new Set(JSON.parse(savedFilterValueList)));
//         }
//       } catch (error) {
//         console.error("Error parsing localStorage value:", error);
//       }
//     } else {
//       console.log(
//         "Running on the server; skipping localStorage initialization",
//       );
//     }
//     return [];
//   });

//   // Effect to synchronize state with localStorage
//   useEffect(() => {
//     if (typeof window !== "undefined" && filterValueList.length > 0) {
//       console.log(
//         "Updating localStorage with filterValueList:",
//         filterValueList,
//       );

//       localStorage.setItem("filterValueList", JSON.stringify(filterValueList));
//     } else {
//       console.log(
//         "No update to localStorage; either on server or filterValueList is empty",
//       );
//     }
//   }, [filterValueList]);

//   const clearFilter = (filter: string) => {
//     console.log("Clearing filter:", filter);

//     setFilterValueList((prevFilters) => {
//       const updatedFilters = prevFilters.filter((f) => f !== filter);
//       console.log(
//         "Updated filterValueList after clearing filter:",
//         updatedFilters,
//       );
//       return updatedFilters;
//     });
//   };

//   // Avoid rendering anything during server-side rendering
//   if (typeof window === "undefined") {
//     return null;
//   }
//   const value = useMemo(
//     () => ({ filterValueList, setFilterValueList, clearFilter }),
//     [filterValueList],
//   );

//   return (
//     <FilterContext.Provider value={value}>
//       <div suppressHydrationWarning>{children}</div>
//     </FilterContext.Provider>
//   );
// };

// export const useFilter = () => {
//   const context = useContext(FilterContext);
//   if (context === undefined) {
//     throw new Error("useFilter must be used within a FilterProvider");
//   }
//   console.log("useFilter called; returning context:", context);

//   return context;
// };

// export const FilterProvider = ({ children }: { children: ReactNode }) => {
//   const [filterValueList, setFilterValueList] = useState<string[]>(() => {
//     const savedFilterValueList = localStorage.getItem("filterValueList");
//     if (savedFilterValueList) {
//       // Parse and ensure uniqueness using Set
//       return Array.from(new Set(JSON.parse(savedFilterValueList)));
//     }
//     return [];
//   });

//   useEffect(() => {
//     if (filterValueList.length > 0) {
//       // Only update localStorage if the list is not empty
//       localStorage.setItem("filterValueList", JSON.stringify(filterValueList));
//     }
//   }, [filterValueList]);

//   const clearFilter = (filter: string) => {
//     setFilterValueList((prevFilters) =>
//       prevFilters.filter((f) => f !== filter),
//     );
//   };

//   return (
//     <FilterContext.Provider
//       value={{ filterValueList, setFilterValueList, clearFilter }}
//     >
//       {children}
//     </FilterContext.Provider>
//   );
// };

// export const useFilter = () => {
//   const context = useContext(FilterContext);
//   if (context === undefined) {
//     throw new Error("useFilter must be used within a FilterProvider");
//   }
//   return context;
// };
