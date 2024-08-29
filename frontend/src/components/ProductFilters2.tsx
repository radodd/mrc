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
import { Checkbox } from "./ui/checkbox";

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
  <AccordionItem value={filterKey} className={styles.filterContainer}>
    <AccordionTrigger className={styles.trigger}>
      <span>{title}</span>
    </AccordionTrigger>
    <AccordionContent className={styles.accordionContent}>
      <ul>
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
  <li className={styles.filterItem}>
    {/* <input
      type="checkbox"
      checked={isChecked}
      onChange={onChange}
      className="border-2 border-red-300"
    /> */}
    <Checkbox checked={isChecked} onCheckedChange={onChange} />
    <label>
      {label} ({count})
    </label>
  </li>
);

export const ProductFilters2: React.FC<{
  filterValueList: string[];
  setFilterValueList: React.Dispatch<React.SetStateAction<string[]>>;
  clearFilter: (value: string) => void;
  companyCounts: Record<string, number>;
  categoryCounts: Record<string, number>;
  textureCounts: Record<string, number>;
  colorCounts: Record<string, number>;
  sizeCounts: Record<string, number>;
}> = ({
  filterValueList,
  setFilterValueList,
  clearFilter,
  companyCounts,
  categoryCounts,
  textureCounts,
  colorCounts,
  sizeCounts,
}) => {
  const handleCheckboxChange = (category: string, value: string) => {
    if (filterValueList.includes(value)) {
      console.log(filterValueList);
      setFilterValueList((prev) => prev.filter((v) => v !== value));
      clearFilter(value);
    } else {
      setFilterValueList((prev) => [...prev, value]);
    }
  };
  console.log("FILTER", filterValueList);
  return (
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
};
// The rest of your ProductFilters component
// ...
