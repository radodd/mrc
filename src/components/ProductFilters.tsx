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

const COMPANIES_FILTERS = {
  id: "company",
  name: "Company",
  options: [
    { value: "mrc", label: "MRC Rock & Sand" },
    { value: "spm", label: "Santa Paula Materials" },
    { value: "stoneyard", label: "Stoneyard" },
  ] as const,
};

type ProductFilterProps = {
  arrayFilter: (filterValueList: string[]) => void;
};

export const ProductFilters: React.FC<ProductFilterProps> = (props) => {
  const { arrayFilter } = props;
  const [filter, setFilter] = useState<ProductState>({
    company: ["mrc", "spm", "stoneyard"],
    sort: "none",
  });

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

  useEffect(() => {
    const filterValues = Object.values(filter).flat();
    arrayFilter(filterValues);
  }, [filter]);

  return (
    <>
      <div className="hidden lg:block">
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
                {COMPANIES_FILTERS.options.map((option, optionIdx) => (
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
        </Accordion>
      </div>
    </>
  );
};
