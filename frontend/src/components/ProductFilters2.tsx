"use client";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { ProductState } from "../lib/product-validator";
import { useFilter } from "../context/FilterContext";

import styles from "./scss/ProductFilters.module.scss";

// Define FilterGroup before using it
type FilterGroupProps = {
  title: string;
  filterKey: string;
  filterCounts: Record<string, number>;
  filterValueList: string[];
  handleCheckboxChange: (filterKey: string, value: string) => void;
};

const FilterGroup: React.FC<FilterGroupProps> = ({
  title,
  filterKey,
  filterCounts,
  filterValueList,
  handleCheckboxChange,
}) => (
  <AccordionItem value={filterKey}>
    <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
      <span className="font-medium text-gray-900">{title}</span>
    </AccordionTrigger>
    <AccordionContent className="pt-6">
      <ul className="space-y-4">
        {Object.keys(filterCounts).map((key) => (
          <FilterItem
            key={key}
            label={key}
            count={filterCounts[key]}
            isChecked={filterValueList.includes(key)}
            onChange={() => handleCheckboxChange(filterKey, key)}
          />
        ))}
      </ul>
    </AccordionContent>
  </AccordionItem>
);

type FilterItemProps = {
  label: string;
  count: number;
  isChecked: boolean;
  onChange: () => void;
};

const FilterItem: React.FC<FilterItemProps> = ({
  label,
  count,
  isChecked,
  onChange,
}) => (
  <li className="flex items-center">
    <input
      type="checkbox"
      checked={isChecked}
      onChange={onChange}
      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
    />
    <label className="ml-3 text-sm text-gray-700">
      {label} ({count})
    </label>
  </li>
);

export const ProductFilters2: React.FC<{
  filterValueList: string[];
  handleCheckboxChange: (filterKey: string, value: string) => void;
  companyCounts: Record<string, number>;
  categoryCounts: Record<string, number>;
  textureCounts: Record<string, number>;
  colorCounts: Record<string, number>;
  sizeCounts: Record<string, number>;
}> = ({
  filterValueList,
  handleCheckboxChange,
  companyCounts,
  categoryCounts,
  textureCounts,
  colorCounts,
  sizeCounts,
}) => (
  <Accordion type="multiple">
    <FilterGroup
      title="Company"
      filterKey="company"
      filterCounts={companyCounts}
      filterValueList={filterValueList}
      handleCheckboxChange={handleCheckboxChange}
    />
    <FilterGroup
      title="Category"
      filterKey="category"
      filterCounts={categoryCounts}
      filterValueList={filterValueList}
      handleCheckboxChange={handleCheckboxChange}
    />
    <FilterGroup
      title="Texture"
      filterKey="texture"
      filterCounts={textureCounts}
      filterValueList={filterValueList}
      handleCheckboxChange={handleCheckboxChange}
    />
    <FilterGroup
      title="Color"
      filterKey="color"
      filterCounts={colorCounts}
      filterValueList={filterValueList}
      handleCheckboxChange={handleCheckboxChange}
    />
    <FilterGroup
      title="Size"
      filterKey="size"
      filterCounts={sizeCounts}
      filterValueList={filterValueList}
      handleCheckboxChange={handleCheckboxChange}
    />
  </Accordion>
);

// The rest of your ProductFilters component
// ...
