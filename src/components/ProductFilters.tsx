"use client";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { ProductState } from "@/lib/product-validator";
import { useFilter } from "@/context/FilterContext";

const SORT_OPTIONS = [
  { name: "None", value: "none" },
  { name: "Name: Ascending", value: "name-asc" },
  { name: "Name: Descending", value: "name-desc" },
] as const;

const COMPANIES = [
  { name: "MRC Rock & Sand", selected: true, href: "#" },
  { name: "Santa Paula Materials", selected: false, href: "#" },
  { name: "Stoneyard", selected: false, href: "#" },
];

const COMPANY_FILTERS = {
  id: "company",
  name: "Company",
  options: [
    { value: "MRC Rock & Sand", label: "MRC Rock & Sand" },
    { value: "Santa Paula Materials", label: "Santa Paula Materials" },
    { value: "Stoneyard", label: "Stoneyard" },
  ] as const,
};

const COLOR_FILTERS = {
  id: "colors",
  name: "Colors",
  options: [
    { value: "yellow", label: "Yellow" },
    { value: "blue", label: "Blue" },
    { value: "gray", label: "Gray" },
  ] as const,
};
const CATEGORY_FILTERS = {
  id: "category",
  name: "Category",
  options: [
    { value: "aggregate", label: "aggregate" },
    { value: "cobble & rubble", label: "cobble & rubble" },
    { value: "boulders", label: "boulders" },
    { value: "decomposed granite", label: "decomposed granite" },
    { value: "base materials", label: "base materials" },
    { value: "rip rap", label: "rip rap" },
    { value: "drain rock", label: "drain rock" },
    { value: "rock dust", label: "rock dust" },
  ] as const,
};

export const ProductFilters: React.FC = () => {
  const { setFilterValueList, filterValueList, clearFilter } = useFilter();

  const handleCheckboxChange = (category: string, value: string) => {
    if (filterValueList.includes(value)) {
      setFilterValueList((prev) => prev.filter((v) => v !== value));
      clearFilter(value);
    } else {
      setFilterValueList((prev) => [...prev, value]);
    }
  };

  return (
    <>
      <div className="ml-[72px] max-[1305px]:hidden max-w-[240px] min-w-[170px]">
        <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
          {COMPANIES.map((category) => (
            <li key={category.name}>
              <button
                disabled={!category.selected}
                className="disabled:cursor-not-allowed disabled:opacity-60"
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>

        <Accordion type="multiple" className="">
          <AccordionItem value="company">
            <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
              <span className="font-medium text-gray-900">Company</span>
            </AccordionTrigger>

            <AccordionContent className="pt-6">
              <ul className="space-y-4">
                {COMPANY_FILTERS.options.map((option, optionIdx) => (
                  <li key={option.value} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`company-${optionIdx}`}
                      onChange={() =>
                        handleCheckboxChange("company", option.value)
                      }
                      checked={filterValueList.includes(option.value)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={`company-${optionIdx}`}
                      className="ml-3 text-sm text-gray-600"
                    >
                      {option.label}
                    </label>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="color">
            <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
              <span className="font-medium text-gray-900">Color</span>
            </AccordionTrigger>

            <AccordionContent className="pt-6">
              <ul className="space-y-4">
                {COLOR_FILTERS.options.map((option, optionIdx) => (
                  <li key={option.value} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`color-${optionIdx}`}
                      onChange={() =>
                        handleCheckboxChange("colors", option.value)
                      }
                      checked={filterValueList.includes(option.value)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={`color-${optionIdx}`}
                      className="ml-3 text-sm text-gray-600"
                    >
                      {option.label}
                    </label>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="category">
            <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
              <span className="font-medium text-gray-900">Category</span>
            </AccordionTrigger>

            <AccordionContent className="pt-6">
              <ul className="space-y-4">
                {CATEGORY_FILTERS.options.map((option, optionIdx) => (
                  <li key={option.value} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${optionIdx}`}
                      onChange={() =>
                        handleCheckboxChange("category", option.value)
                      }
                      checked={filterValueList.includes(option.value)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={`category-${optionIdx}`}
                      className="ml-3 text-sm text-gray-600"
                    >
                      {option.label}
                    </label>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

// console.log("HERERERE", filterValueList, filter);
// const initializeFilterState = () => {
//   const initialFilter: ProductState = {
//     company: COMPANY_FILTERS.options
//       .filter((option) => filterValueList.includes(option.value))
//       .map((option) => option.value),
//     colors: COLOR_FILTERS.options
//       .filter((option) => filterValueList.includes(option.value))
//       .map((option) => option.value),
//     category: CATEGORY_FILTERS.options
//       .filter((option) => filterValueList.includes(option.value))
//       .map((option) => option.value),
//     sort: "none",
//   };
//   setFilter(initialFilter);
// };
// type ProductFilterProps = {
//   arrayFilter: (filterValueList: string[]) => void;
//   filterValueList: string[];
//   clearFilter: (filter: string) => void;
// };

// export const ProductFilters: React.FC<ProductFilterProps> = (props) => {
//   const { arrayFilter, filterValueList, clearFilter } = props;
// const [filter, setFilter] = useState<ProductState>({
//   company: [],
//   colors: [],
//   category: [],
//   // sort: "none",
// });

// console.log("Filter Value List", filterValueList);

// const applyArrayFilter = ({
//   category,
//   value,
// }: {
//   category: keyof Omit<typeof filter, "sort">;
//   value: string;
// }) => {
//   const isFilterApplied = filter[category].includes(value as never);
//   if (isFilterApplied) {
//     setFilter((prev) => ({
//       ...prev,
//       [category]: prev[category].filter((v) => v !== value),
//     }));
//   } else {
//     // @ts-ignore
//     setFilter((prev) => ({
//       ...prev,
//       [category]: [...prev[category], value],
//     }));
//   }
// };  // useEffect(() => {
//   const filterValues = Object.values(filter).flat();
//   arrayFilter(filterValues);
// }, [filter]);

// useEffect(() => {
//   const filterValues = Object.values(filter).flat();
//   setFilterValueList(filterValues);
// }, [filter]);

// useEffect(() => {
//   filterValueList.forEach((value) => {
//     const category = Object.keys(filter).find((key) =>
//       filter[key as keyof typeof filter].includes(value as never),
//     );
//     if (!category) {
//       clearFilter(value);
//     }
//   });
// }, [filterValueList]);
