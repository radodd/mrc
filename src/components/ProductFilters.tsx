"use client";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { ProductState } from "@/lib/product-validator";

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

type ProductFilterProps = {
  arrayFilter: (filterValueList: string[]) => void;
  filterValueList: string[];
};

export const ProductFilters: React.FC<ProductFilterProps> = (props) => {
  const { arrayFilter, filterValueList } = props;
  const [filter, setFilter] = useState<ProductState>({
    company: [],
    colors: [],
    category: [],
    sort: "none",
  });

  console.log("Array Filter", arrayFilter);
  console.log("Filter Value List", filterValueList);

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

  const applyArrayFilter = ({
    category,
    value,
  }: {
    category: keyof Omit<typeof filter, "sort">;
    value: string;
  }) => {
    const isFilterApplied = filter[category].includes(value as never);
    if (isFilterApplied) {
      setFilter((prev) => ({
        ...prev,
        [category]: prev[category].filter((v) => v !== value),
      }));
    } else {
      // @ts-ignore
      setFilter((prev) => ({
        ...prev,
        [category]: [...prev[category], value],
      }));
    }
  };

  // useEffect(() => {
  //   initializeFilterState();
  // }, []);

  // useEffect(() => {
  //   initializeFilterState();
  // }, [filterValueList]);

  useEffect(() => {
    const filterValues = Object.values(filter).flat();
    arrayFilter(filterValues);
  }, [filter]);

  return (
    <>
      <div className="hidden lg:block max-w-[240px] min-w-[170px]">
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
                      onChange={() => {
                        applyArrayFilter({
                          category: "company",
                          value: option.value,
                        });
                      }}
                      checked={filter.company.includes(option.value)}
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
                      onChange={() => {
                        applyArrayFilter({
                          category: "colors",
                          value: option.value,
                        });
                      }}
                      checked={filter.colors.includes(option.value)}
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
                      onChange={() => {
                        applyArrayFilter({
                          category: "category",
                          value: option.value,
                        });
                      }}
                      checked={filter.category.includes(option.value)}
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
