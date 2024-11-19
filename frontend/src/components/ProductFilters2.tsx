"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Checkbox } from "./ui/checkbox";
import {
  AllCategories,
  AllColors,
  AllCompanies,
  AllSizes,
  AllTextures,
} from "../../..";

import styles from "./scss/ProductFilters.module.scss";
// Define FilterGroup before using it
type FilterGroupProps = {
  title: string;
  filterKey: string;
  filterCounts: Record<string, number>;
  filterValueList: string[];
  handleCheckboxChange: (filterKey: string, value: string) => void;
  allFilters?: string[];
};

const FilterGroup: React.FC<FilterGroupProps> = ({
  title,
  filterKey,
  filterCounts,
  filterValueList,
  handleCheckboxChange,
  allFilters,
}) => (
  <AccordionItem value={filterKey} className={styles.filterContainer}>
    <AccordionTrigger className={styles.trigger}>
      <span>{title}</span>
    </AccordionTrigger>
    <AccordionContent className={styles.accordionContent}>
      <ul>
        {allFilters.map((key) => (
          // {Object.keys(filterCounts).map((key) => (
          <FilterItem
            key={key}
            label={key}
            count={filterCounts[key] || 0}
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
  // sizeCounts: Record<string, number>;
  allFilters: string[];
}> = ({
  filterValueList,
  setFilterValueList,
  clearFilter,
  companyCounts,
  categoryCounts,
  textureCounts,
  colorCounts,
  // sizeCounts,
  allFilters,
}) => {
  const handleCheckboxChange = (category: string, value: string) => {
    if (filterValueList.includes(value)) {
      setFilterValueList((prev) => prev.filter((v) => v !== value));
      clearFilter(value);
    } else {
      setFilterValueList((prev) => [...prev, value]);
    }
  };
  return (
    <Accordion type="multiple">
      <FilterGroup
        title="Company"
        filterKey="company"
        filterCounts={companyCounts}
        filterValueList={filterValueList}
        handleCheckboxChange={handleCheckboxChange}
        allFilters={AllCompanies}
      />
      <FilterGroup
        title="Category"
        filterKey="category"
        filterCounts={categoryCounts}
        filterValueList={filterValueList}
        handleCheckboxChange={handleCheckboxChange}
        allFilters={AllCategories}
      />
      <FilterGroup
        title="Texture"
        filterKey="texture"
        filterCounts={textureCounts}
        filterValueList={filterValueList}
        handleCheckboxChange={handleCheckboxChange}
        allFilters={AllTextures}
      />
      <FilterGroup
        title="Color"
        filterKey="color"
        filterCounts={colorCounts}
        filterValueList={filterValueList}
        handleCheckboxChange={handleCheckboxChange}
        allFilters={AllColors}
      />
      {/* <FilterGroup
        title="Size"
        filterKey="size"
        filterCounts={sizeCounts}
        filterValueList={filterValueList}
        handleCheckboxChange={handleCheckboxChange}
        allFilters={AllSizes}
      /> */}
    </Accordion>
  );
};
// The rest of your ProductFilters component
// ...
