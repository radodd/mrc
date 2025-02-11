"use client";

import { useFilter } from "../context/FilterContext";
import { ProductCard } from "./MaterialCard";
import { ProductFilterCard } from "./ProductFilterCard";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { ProductFilters2 } from "./ProductFilters2";
import Image from "next/image";
import FilterDropDown from "./FilterDropDown";
import AlphabetizeButtons from "./AlphabetizeButtons";
import AlphabetizeRadio from "./AlphabetizeRadio";
import ChevronIcon from "../../public/chevron_nav_sharp.svg";
import {
  AllCompanies,
  AllCategories,
  AllTextures,
  AllColors,
  AllSizes,
} from "../../../index";

import styles from "./scss/ProductGridSection.module.scss";

interface Product {
  id: string;
  name: string;
  description: string;
  imagePrimary: string | null;
  imagePath: string[] | null;
  company: string[];
  color: string[];
  uses: string[];
  category: string[];
  texture: string[];
  size: string[];
}

type ProductGridSectionProps = {
  title: string;
};

export default function ProductGridSection({ title }: ProductGridSectionProps) {
  const {
    filterValueList,
    setFilterValueList,
    clearFilter,
    setTempFilterValueList,
    tempFilterValueList,
  } = useFilter();
  const [products, setProducts] = useState<Product[]>([]);
  const [alphabetFilter, setAlphabetFilter] = useState(false);
  const [filterDropDown, setFilterDropdown] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Current filters:", filterValueList);
  }, [filterValueList]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://mrc-two.vercel.app/api/materials",
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          },
        );
        console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const mappedProducts = data.map((material: any) => ({
          id: material.id,
          name: material.name,
          description: material.description,
          imagePrimary: material.imagePrimary,
          imagePath: material.imagePath,
          company: material.company,
          color: material.color,
          uses: material.uses,
          texture: material.texture,
          category: material.MaterialCategories.map(
            (cat: any) => cat.Categories.name,
          ),
          size: material.MaterialCategories.flatMap((cat: any) =>
            cat.MaterialCategorySizes.map((size: any) =>
              size.Sizes.sizeValue.trim(),
            ),
          ),
        }));
        console.log("Mapped Products", mappedProducts);
        setProducts(mappedProducts);
      } catch (error) {
        console.error("Error fetching DATA:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // const filteredProductList = products.filter((product) => {
  //   if (filterValueList.length === 0) return true;

  //   return filterValueList.every((filterValue) => {
  //     return (
  //       product.color.includes(filterValue) ||
  //       product.company.includes(filterValue) ||
  //       product.category.includes(filterValue) ||
  //       product.texture.includes(filterValue) ||
  //       product.size.includes(filterValue)
  //     );
  //   });
  // });
  // const filteredProductList = products.filter((product) => {
  //   if (filterValueList.length === 0) return true;

  //   // Separate company filters from other filters
  //   const companyFilters = filterValueList.filter((filter) =>
  //     product.company.includes(filter),
  //   );
  //   const otherFilters = filterValueList.filter(
  //     (filter) => !product.company.includes(filter),
  //   );

  //   // If any company filter is selected, prioritize it
  //   if (companyFilters.length > 0) {
  //     // Ensure the product matches a company filter and any of the other filters
  //     return (
  //       companyFilters.some((filter) => product.company.includes(filter)) &&
  //       (otherFilters.length === 0 ||
  //         otherFilters.some((filterValue) => {
  //           return (
  //             product.color.includes(filterValue) ||
  //             product.category.includes(filterValue) ||
  //             product.texture.includes(filterValue) ||
  //             product.size.includes(filterValue)
  //           );
  //         }))
  //     );
  //   }

  //   // If no company filter is selected, apply other filters normally
  //   return otherFilters.every((filterValue) => {
  //     return (
  //       product.color.includes(filterValue) ||
  //       product.category.includes(filterValue) ||
  //       product.texture.includes(filterValue) ||
  //       product.size.includes(filterValue)
  //     );
  //   });
  // });

  // const filteredProductList = products.filter((product) => {
  //   if (filterValueList.length === 0) return true; // No filters, return all products

  //   // Separate company filters from other filters
  //   const hardcodedCompanies = [
  //     "MRC Rock & Sand",
  //     "Stoneyard",
  //     "Santa Paula Materials",
  //   ];

  //   // Step 1: Separate company filters by checking if they match any of the hardcoded companies
  //   const companyFilters = filterValueList.filter(
  //     (filter) => hardcodedCompanies.includes(filter), // Check if filter matches any of the hardcoded companies
  //   );
  //   const otherFilters = filterValueList.filter(
  //     (filter) => !companyFilters.includes(filter),
  //   );
  //   console.log("Company filters:", companyFilters); // Log company filters
  //   console.log("Other filters:", otherFilters);

  //   // If company filters exist, prioritize them
  //   if (companyFilters.length > 0 && otherFilters.length === 0) {
  //     console.log(
  //       "Two or more company filters selected. Checking company match...",
  //     );
  //     const companyMatch = companyFilters.some((filter) =>
  //       product.company.includes(filter),
  //     );
  //     console.log("Company match:", companyMatch);
  //     return companyMatch;
  //   }

  //   // If one company filter exists, check the company and other filters
  //   if (companyFilters.length === 1) {
  //     console.log("One company filter selected. Checking company match...");
  //     const matchesCompany = companyFilters.some((filter) =>
  //       product.company.includes(filter),
  //     );
  //     console.log("Matches company:", matchesCompany);

  //     const matchesOtherFilters = otherFilters.every((filterValue) => {
  //       return (
  //         product.color.includes(filterValue) ||
  //         product.category.includes(filterValue) ||
  //         product.texture.includes(filterValue) ||
  //         product.size.includes(filterValue)
  //       );
  //     });

  //     // Return only products that match the company and all additional filters
  //     return matchesCompany && matchesOtherFilters;
  //   }

  //   // If no company filters exist, apply logic for other filters
  //   const matchesOtherFilters = otherFilters.every((filterValue) => {
  //     // For each filter value, check against each category independently (OR within categories)
  //     const matchesCategory =
  //       (product.color.some((color) => color.includes(filterValue)) ||
  //         product.category.some((cat) => cat.includes(filterValue)) ||
  //         product.texture.some((tex) => tex.includes(filterValue)) ||
  //         product.size.some((sz) => sz.includes(filterValue))) &&
  //       filterValue;
  //     console.log(
  //       `Filter '${filterValue}' matches category in product:`,
  //       matchesCategory,
  //     );
  //     return matchesCategory;
  //   });

  //   // Return true if product matches all selected filters (AND logic across categories)
  //   return matchesOtherFilters;
  // });

  // const filteredProductList = products.filter((product) => {
  //   if (filterValueList.length === 0) return true; // No filters, return all products

  //   // Separate company filters from other filters
  //   const hardcodedCompanies = [
  //     "MRC Rock & Sand",
  //     "Stoneyard",
  //     "Santa Paula Materials",
  //   ];

  //   // Step 1: Separate company filters by checking if they match any of the hardcoded companies
  //   const companyFilters = filterValueList.filter(
  //     (filter) => hardcodedCompanies.includes(filter), // Check if filter matches any of the hardcoded companies
  //   );
  //   const otherFilters = filterValueList.filter(
  //     (filter) => !companyFilters.includes(filter),
  //   );
  //   console.log("Company filters:", companyFilters); // Log company filters
  //   console.log("Other filters:", otherFilters);

  //   // If company filters exist, prioritize them
  //   if (companyFilters.length > 0 && otherFilters.length === 0) {
  //     console.log(
  //       "Two or more company filters selected. Checking company match...",
  //     );
  //     const companyMatch = companyFilters.some((filter) =>
  //       product.company.includes(filter),
  //     );
  //     console.log("Company match:", companyMatch);
  //     return companyMatch;
  //   }

  //   // If one company filter exists, check the company and other filters
  //   if (companyFilters.length === 1) {
  //     console.log("One company filter selected. Checking company match...");
  //     const matchesCompany = companyFilters.some((filter) =>
  //       product.company.includes(filter),
  //     );
  //     console.log("Matches company:", matchesCompany);

  //     const matchesOtherFilters = otherFilters.some((filterValue) => {
  //       // Use OR logic within categories
  //       return (
  //         product.color.some((color) => color.includes(filterValue)) ||
  //         product.category.some((cat) => cat.includes(filterValue)) ||
  //         product.texture.some((tex) => tex.includes(filterValue)) ||
  //         product.size.some((sz) => sz.includes(filterValue))
  //       );
  //     });

  //     // Return only products that match the company and any other filter
  //     return matchesCompany && matchesOtherFilters;
  //   }

  //   // If no company filters exist, apply logic for other filters
  //   const matchesOtherFilters = otherFilters.some((filterValue) => {
  //     // For each filter value, check against each category independently (OR within categories)
  //     const matchesCategory =
  //       (product.color.some((color) => color.includes(filterValue)) ||
  //         product.category.some((cat) => cat.includes(filterValue)) ||
  //         product.texture.some((tex) => tex.includes(filterValue)) ||
  //         product.size.some((sz) => sz.includes(filterValue))) &&
  //       filterValue;
  //     console.log(
  //       `Filter '${filterValue}' matches category in product:`,
  //       matchesCategory,
  //     );
  //     return matchesCategory;
  //   });

  //   // Return true if product matches all selected filters (AND logic across categories)
  //   return matchesOtherFilters;
  // });

  // const filteredProductList = products.filter((product) => {
  //   if (filterValueList.length === 0) {
  //     console.log("No filters applied, returning all products.");
  //     return true; // No filters, return all products
  //   }

  //   console.log("Filter values:", filterValueList);

  //   // Group filters by categories, including 'company'
  //   const groupedFilters = {
  //     company: [],
  //     color: [],
  //     category: [],
  //     texture: [],
  //     size: [],
  //   };

  //   // Populate grouped filters
  //   filterValueList.forEach((filter) => {
  //     if (product.company.includes(filter)) {
  //       groupedFilters.company.push(filter);
  //     } else if (product.color.some((color) => color.includes(filter))) {
  //       groupedFilters.color.push(filter);
  //     } else if (product.category.some((cat) => cat.includes(filter))) {
  //       groupedFilters.category.push(filter);
  //     } else if (product.texture.some((tex) => tex.includes(filter))) {
  //       groupedFilters.texture.push(filter);
  //     } else if (product.size.some((sz) => sz.includes(filter))) {
  //       groupedFilters.size.push(filter);
  //     }
  //   });

  //   console.log(
  //     `Grouped filters for product '${product.name}':`,
  //     groupedFilters,
  //   );

  //   // Track if product matches any filters across all categories
  //   let matchesAnyFilter = false;

  //   // Strict matching: Fail if a category has filters but no match
  //   const matchesGroupedFilters = Object.keys(groupedFilters).every((key) => {
  //     const filters = groupedFilters[key];

  //     // Skip categories without filters
  //     if (filters.length === 0) {
  //       console.log(`No filters in category '${key}', skipping.`);
  //       return true;
  //     }

  //     // Check for matches in this category
  //     const matches = filters.some((filter) => {
  //       if (key === "company") {
  //         return product.company.includes(filter); // Direct match for company
  //       }
  //       return product[key].some((value) =>
  //         value.toLowerCase().includes(filter.toLowerCase()),
  //       ); // Match for other categories
  //     });

  //     if (matches) {
  //       matchesAnyFilter = true; // Track if any filter matches
  //     } else {
  //       console.log(
  //         `Product '${product.name}' does not match any filter in category '${key}'.`,
  //       );
  //     }

  //     console.log(
  //       `Product '${product.name}' matches category '${key}' filters:`,
  //       matches,
  //     );
  //     return matches; // Fail if no match in this category
  //   });

  //   console.log(
  //     `Product '${product.name}' matches all category filters:`,
  //     matchesGroupedFilters,
  //   );
  //   console.log(
  //     `Product '${product.name}' matches at least one filter:`,
  //     matchesAnyFilter,
  //   );

  //   return matchesGroupedFilters && matchesAnyFilter;
  // });
  // Track filter counts for each category
  // Available filter lists from your index file
  // const categoryFilterCount = {
  //   company: 0,
  //   color: 0,
  //   category: 0,
  //   texture: 0,
  //   size: 0,
  // };

  // // Step 1: Count how many filters are applied per category
  // filterValueList.forEach((filter) => {
  //   Object.keys(categoryFilterCount).forEach((category) => {
  //     if (filterBelongsToCategory(filter, category)) {
  //       categoryFilterCount[category]++;
  //     }
  //   });
  // });

  // // Log the filter count per category
  // console.log("Category Filter Counts:", categoryFilterCount);

  // // Step 2: Identify categories with two or more filters applied
  // const categoriesWithMultipleFilters = Object.keys(categoryFilterCount).filter(
  //   (category) => categoryFilterCount[category] >= 2,
  // );

  // console.log(
  //   "Categories with two or more filters applied:",
  //   categoriesWithMultipleFilters,
  // );

  // // Step 3: Apply the filter to the product list
  // const filteredProductList = products.filter((product) => {
  //   if (filterValueList.length === 0) {
  //     console.log("No filters applied, returning all products.");
  //     return true; // No filters, return all products
  //   }

  //   let matchesAllFilters = true;

  //   // Step 3.1: Apply the "AND" logic for selected filters across categories
  //   filterValueList.forEach((filter) => {
  //     const filterCategory = Object.keys(categoryFilterCount).find((category) =>
  //       filterBelongsToCategory(filter, category)
  //     );

  //     console.log("Processing filter:", filter);
  //     console.log("Filter belongs to category:", filterCategory);

  //     if (filterCategory) {
  //       // Logic for categories with multiple filters (OR logic)
  //       if (categoryFilterCount[filterCategory] >= 2) {
  //         console.log(`Category "${filterCategory}" has multiple filters applied. Applying "OR" logic.`);

  //         const productValue = product[filterCategory];

  //         // Check if the product matches any of the selected filters in this category
  //         if (Array.isArray(productValue)) {
  //           matchesAllFilters =
  //             matchesAllFilters &&
  //             productValue.some((value) => filterValueList.includes(value));
  //         } else if (typeof productValue === "string") {
  //           matchesAllFilters =
  //             matchesAllFilters && filterValueList.includes(productValue);
  //         }
  //       } else {
  //         // Logic for categories with one filter applied (AND logic)
  //         console.log(`Category "${filterCategory}" has one filter applied. Applying "AND" logic.`);

  //         const matchesFilterInCategory = Object.keys(product).some((key) => {
  //           const productValue = product[key];
  //           if (Array.isArray(productValue)) {
  //             return productValue.some((value) => value.includes(filter));
  //           } else if (typeof productValue === "string") {
  //             return productValue.includes(filter);
  //           }
  //           return false;
  //         });

  //         console.log(`Product matches filter in category "${filterCategory}":`, matchesFilterInCategory);
  //         matchesAllFilters = matchesAllFilters && matchesFilterInCategory;
  //       }
  //     }
  //   });

  //   // Step 3.2: Ensure all conditions match across categories and handle "OR" logic for multiple filters in a category
  //   console.log("Product matches all filters:", matchesAllFilters);
  //   return matchesAllFilters;
  // });

  // console.log("Filtered Product List:", filteredProductList);

  // // Helper function to check if a filter belongs to a category
  // function filterBelongsToCategory(filter, category) {
  //   const categoryFilters = {
  //     company: AllCompanies,
  //     color: AllColors,
  //     category: AllCategories,
  //     texture: AllTextures,
  //     size: AllSizes,
  //   };

  //   // Check if the filter belongs to the category by checking against the predefined list
  //   return categoryFilters[category]?.includes(filter);
  // }

  // Track filter counts for each category
  const categoryFilterCount = {
    company: 0,
    color: 0,
    category: 0,
    texture: 0,
    size: 0,
  };

  // Step 1: Count how many filters are applied per category
  filterValueList.forEach((filter) => {
    Object.keys(categoryFilterCount).forEach((category) => {
      if (filterBelongsToCategory(filter, category)) {
        categoryFilterCount[category]++;
      }
    });
  });

  // Step 2: Identify categories with two or more filters applied
  const categoriesWithMultipleFilters = Object.keys(categoryFilterCount).filter(
    (category) => categoryFilterCount[category] >= 2,
  );

  // Log categories with two or more filters
  // console.log(
  //   "Categories with two or more filters:",
  //   categoriesWithMultipleFilters,
  // );

  // Step 3: Apply the filter to the product list
  let exactMatchFilteredProductList = [];
  let finalFilteredProductList = [];

  if (filterValueList.length === 1) {
    // console.log("Only one filter applied, applying exact match.");

    // Apply exact match filtering for a single filter
    exactMatchFilteredProductList = products.filter((product) => {
      return filterValueList.every((filter) => {
        const filterCategory = Object.keys(categoryFilterCount).find(
          (category) => filterBelongsToCategory(filter, category),
        );

        // console.log("Checking exact match for filter:", filter);
        // console.log("Filter belongs to category:", filterCategory);

        if (filterCategory) {
          const productValue = product[filterCategory];

          if (Array.isArray(productValue)) {
            return productValue.some((value) => value === filter); // Exact match in array
          } else if (typeof productValue === "string") {
            return productValue === filter; // Exact match for string values
          }
        }

        return false;
      });
    });

    console.log(
      "Exact Match Filtered Product List:",
      exactMatchFilteredProductList,
    );

    // Now, use the exact match filtered list as the final result
    finalFilteredProductList = exactMatchFilteredProductList;
  } else {
    console.log("More than one filter applied, applying AND filtering logic.");

    // Step 4: Apply existing AND filter logic (if multiple filters are selected)
    finalFilteredProductList = products.filter((product) => {
      const matchesAllFilters = filterValueList.every((filter) => {
        const matchesFilterInCategory = Object.keys(product).some((key) => {
          const productValue = product[key];
          if (Array.isArray(productValue)) {
            return productValue.some((value) => value.includes(filter));
          } else if (typeof productValue === "string") {
            return productValue.includes(filter);
          }
          return false;
        });

        return matchesFilterInCategory;
      });

      return matchesAllFilters;
    });

    // console.log("AND Filtered Product List:", finalFilteredProductList);
  }

  // Step 5: Apply OR logic for categories with multiple filters
  if (categoriesWithMultipleFilters.length > 0) {
    console.log("Applying OR filtering for categories with multiple filters.");

    const selectedCompanyFilters = filterValueList.filter((filter) =>
      filterBelongsToCategory(filter, "company"),
    );

    const orFilteredProductList = products.filter((product) => {
      // Ensure the product matches the selected company filter, if any
      const matchesSelectedCompany =
        selectedCompanyFilters.length === 0 ||
        selectedCompanyFilters.some((filter) => {
          const productCompany = product["company"];
          if (Array.isArray(productCompany)) {
            return productCompany.includes(filter);
          } else if (typeof productCompany === "string") {
            return productCompany === filter;
          }
          return false;
        });

      // If it doesn't match the selected company, skip it
      if (!matchesSelectedCompany) return false;

      // Apply OR logic for categories with multiple filters
      return categoriesWithMultipleFilters.some((category) => {
        const categoryFilters = filterValueList.filter((filter) =>
          filterBelongsToCategory(filter, category),
        );

        // Check if any filter in the category matches the product
        return categoryFilters.some((filter) => {
          const productValue = product[category];
          if (Array.isArray(productValue)) {
            return productValue.some((value) => value === filter);
          } else if (typeof productValue === "string") {
            return productValue === filter;
          }
          return false;
        });
      });
    });

    console.log("OR Filtered Product List:", orFilteredProductList);

    // Combine OR filtered results with the final result
    finalFilteredProductList = [
      ...new Set([...finalFilteredProductList, ...orFilteredProductList]),
    ];
  }

  // Final output
  console.log("Final Filtered Product List:", finalFilteredProductList);

  // Helper function to check if a filter belongs to a category
  function filterBelongsToCategory(filter, category) {
    const categoryFilters = {
      company: AllCompanies,
      color: AllColors,
      category: AllCategories,
      texture: AllTextures,
      size: AllSizes,
    };

    // Check if the filter belongs to the category by checking against the predefined list
    return categoryFilters[category]?.includes(filter);
  }

  const categoryCounts = finalFilteredProductList.reduce(
    (counts: Record<string, number>, product) => {
      product.category.forEach((cat) => {
        counts[cat] = (counts[cat] || 0) + 1;
      });
      return counts;
    },
    {},
  );

  const colorCounts = finalFilteredProductList.reduce(
    (counts: Record<string, number>, product) => {
      product.color?.forEach((col) => {
        counts[col] = (counts[col] || 0) + 1;
      });
      return counts;
    },
    {},
  );

  const companyCounts = finalFilteredProductList.reduce(
    (counts: Record<string, number>, product) => {
      product.company.forEach((comp) => {
        counts[comp] = (counts[comp] || 0) + 1;
      });
      return counts;
    },
    {},
  );

  const textureCounts = finalFilteredProductList.reduce(
    (counts: Record<string, number>, product) => {
      product.texture.forEach((tex) => {
        counts[tex] = (counts[tex] || 0) + 1;
      });
      return counts;
    },
    {},
  );

  const sizeCounts = finalFilteredProductList.reduce(
    (counts: Record<string, number>, product) => {
      product.size.forEach((size) => {
        counts[size] = (counts[size] || 0) + 1;
      });
      return counts;
    },
    {},
  );

  // const handleRemoveFilter = (filter: string) => {
  //   setFilterValueList((prevFilters: string[]) =>
  //     prevFilters.filter((f) => f !== filter),
  //   );
  //   clearFilter(filter);
  // };
  const handleRemoveFilter = (filter: string) => {
    const updatedFilter = filterValueList.filter((f) => f !== filter);
    setFilterValueList(updatedFilter);
    clearFilter(filter);
  };

  const clearAllFilters = () => {
    setFilterValueList([]), setTempFilterValueList([]);
  };

  return (
    <section className={styles.sectionContainer}>
      <h1>{title}</h1>
      <div className={styles.buttonContainer}>
        <div className="flex flex-row gap-6 w-full justify-center items-center">
          <div className="w-full">
            <Button
              variant="outline"
              size="mobileFilterOpen"
              onClick={() => setFilterDropdown(!filterDropDown)}
              className=""
            >
              Sort & Filter
            </Button>
          </div>

          {filterValueList.length !== 0 && (
            <div className="max-w-min">
              <Button
                variant="filterClear"
                size="slim"
                onClick={clearAllFilters}
              >
                Clear All
              </Button>
            </div>
          )}
        </div>

        <div className={styles.productFilterCardContainer}>
          {filterValueList.length === 0 ||
          (filterValueList.length === 1 && filterValueList[0] === "") ? (
            <ProductFilterCard filter="All Materials" />
          ) : (
            filterValueList
              .filter((filter) => filter && filter.length > 0)
              .map((filter, index) => (
                <ProductFilterCard
                  key={index}
                  filter={filter}
                  onRemove={handleRemoveFilter}
                />
              ))
          )}
        </div>
      </div>
      <div className="flex justify-center min-[1306px]:hidden ">
        {loading ? ( // Display loading icon while fetching data
          <div className={styles.loadingContainer}>
            <Image
              src="/loading.svg"
              alt="Loading..."
              width={800}
              height={400}
            />
          </div>
        ) : (
          <>
            {finalFilteredProductList.length === 0 && (
              <div className={styles.noItemsMatchContainer}>
                <Image
                  src="/no_items_match.svg"
                  alt="No items match your filters"
                  width={777}
                  height={405}
                />
              </div>
            )}
            <div className={styles.productCardContainer}>
              {finalFilteredProductList.map((product, index) => (
                <ProductCard {...product} key={index} />
              ))}
            </div>
          </>
        )}
      </div>

      {filterDropDown && (
        <div className=" bg-whitebase absolute top-[100px] min-[1306px]:hidden">
          <Button
            variant="mobileFilterClose"
            size="mobileFilterClose"
            onClick={() => setFilterDropdown(!filterDropDown)}
          >
            <ChevronIcon
              width={30}
              height={30}
              className={styles.chevronClose}
            />
            Sort & Filter
          </Button>

          {/* <Separator /> */}

          <AlphabetizeRadio products={products} setProducts={setProducts} />
          <FilterDropDown
            filterValueList={filterValueList}
            setFilterValueList={setFilterValueList}
            clearFilter={clearFilter}
            categoryCounts={categoryCounts}
            colorCounts={colorCounts}
            companyCounts={companyCounts}
            textureCounts={textureCounts}
            sizeCounts={sizeCounts}
            allFilters={[]}
            filterDropDown={filterDropDown}
            setFilterDropDown={setFilterDropdown}
          />
        </div>
      )}
      {/* DESKTOP */}

      <div className="flex flex-row justify-center items-start gap-[72px] max-[1306px]:hidden">
        <div className="flex flex-col">
          {filterValueList.length === 0 ? (
            <Button
              variant="filterDisabled"
              size="filter"
              className={`mb-6 min-[1306px]:ml-[72px] `}
              onClick={clearAllFilters}
            >
              <Image
                src="/filter.svg"
                alt=""
                width={25}
                height={25}
                className="pr-2"
              />
              Filter
            </Button>
          ) : (
            <Button
              variant="otherFilter"
              size="filter"
              className="flex items-center mb-6 min-[1306px]:ml-[72px] justify-between"
              onClick={clearAllFilters}
            >
              Clear All Filters
              <Image
                src="/close.svg"
                alt=""
                width={12}
                height={12}
                className={styles.image}
              />
            </Button>
          )}
          <ProductFilters2
            filterValueList={filterValueList}
            setFilterValueList={setFilterValueList}
            clearFilter={clearFilter}
            categoryCounts={categoryCounts}
            colorCounts={colorCounts}
            companyCounts={companyCounts}
            textureCounts={textureCounts}
            sizeCounts={sizeCounts}
            allFilters={[]}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row">
            <div className={styles.productFilterCardContainerDesktop}>
              {filterValueList.map((filter, index) => (
                <ProductFilterCard
                  key={index}
                  filter={filter}
                  onRemove={handleRemoveFilter}
                />
              ))}
              {filterValueList.length === 0 && (
                <ProductFilterCard
                  filter="All Materials"
                  onRemove={handleRemoveFilter}
                />
              )}
            </div>
            <AlphabetizeButtons
              products={products}
              setProducts={setProducts}
              alphabetFilter={alphabetFilter}
              setAlphabetFilter={setAlphabetFilter}
            />
          </div>

          <div className="min-[1306px]:mx-[0px] ">
            {loading ? ( // Display loading icon while fetching data
              <div className={styles.loadingContainer}>
                <Image
                  src="/loading.svg"
                  alt="Loading..."
                  width={800}
                  height={400}
                />
              </div>
            ) : (
              <>
                {finalFilteredProductList.length === 0 && (
                  <div className={styles.noItemsMatchContainer}>
                    <Image
                      src="/no_items_match.svg"
                      alt="No items match your filters"
                      width={777}
                      height={405}
                    />
                  </div>
                )}
                <div className={styles.materialCardContainer}>
                  {finalFilteredProductList.map((product, index) => (
                    <ProductCard {...product} key={index} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
