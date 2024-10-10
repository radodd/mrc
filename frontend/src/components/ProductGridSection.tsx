"use client";
import { useFilter } from "../context/FilterContext";
import { ProductCard } from "./ProductCard";
import { ProductFilterCard } from "./ProductFilterCard";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { ProductFilters2 } from "./ProductFilters2";
import Image from "next/image";
import Link from "next/link";
import FilterDropDown from "./FilterDropDown";
import AlphabetizeButtons from "./AlphabetizeButtons";
import AlphabetizeRadio from "./AlphabetizeRadio";
import { Separator } from "./ui/separator";
import ChevronIcon from "../../public/chevron_nav_sharp.svg";

import styles from "./scss/ProductGridSection.module.scss";

interface Product {
  id: string;
  name: string;
  description: string;
  image_primary: string;
  imagePath: string;
  company: string;
  color: string[];
  category: string[];
  texture: string[];
  size: string[];
}

type ProductGridSectionProps = {
  title: string;
};

export default function ProductGridSection({ title }: ProductGridSectionProps) {
  const { filterValueList, setFilterValueList, clearFilter } = useFilter();
  const [products, setProducts] = useState<Product[]>([]);
  const [alphabetFilter, setAlphabetFilter] = useState(false);
  const [filterDropDown, setFilterDropdown] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://mrc-two.vercel.app/api/products",
          {
            method: "GET",
            credentials: "include",

            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data IN GRID SECTION:", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching DATA:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProductList = products.filter((product) => {
    if (filterValueList.length === 0) {
      return true;
    } else {
      return filterValueList.every((filterValue) => {
        const colorFilter = product.color.includes(filterValue);
        const companyFilter = product.company.includes(filterValue);
        const categoryFilter = product.category.includes(filterValue);
        const textureFilter = product.texture.includes(filterValue);
        const sizeFilter = product.size.includes(filterValue);

        return (
          colorFilter ||
          companyFilter ||
          categoryFilter ||
          textureFilter ||
          sizeFilter
        );
      });
    }
  });

  const categoryCounts = filteredProductList.reduce(
    (counts: Record<string, number>, product) => {
      product.category.forEach((cat) => {
        counts[cat] = (counts[cat] || 0) + 1;
      });
      return counts;
    },
    {},
  );

  const colorCounts = filteredProductList.reduce(
    (counts: Record<string, number>, product) => {
      product.color.forEach((col) => {
        counts[col] = (counts[col] || 0) + 1;
      });
      return counts;
    },
    {},
  );

  const companyCounts = filteredProductList.reduce(
    (counts: Record<string, number>, product) => {
      counts[product.company] = (counts[product.company] || 0) + 1;
      return counts;
    },
    {},
  );

  const textureCounts = filteredProductList.reduce(
    (counts: Record<string, number>, product) => {
      product.texture.forEach((tex) => {
        counts[tex] = (counts[tex] || 0) + 1;
      });
      return counts;
    },
    {},
  );

  const sizeCounts = filteredProductList.reduce(
    (counts: Record<string, number>, product) => {
      product.size.forEach((size) => {
        counts[size] = (counts[size] || 0) + 1;
      });
      return counts;
    },
    {},
  );
  const handleRemoveFilter = (filter: string) => {
    setFilterValueList((prevFilters) =>
      prevFilters.filter((f) => f !== filter),
    );
    clearFilter(filter);
  };

  const clearAllFilters = () => {
    setFilterValueList([]);
  };

  return (
    <section className={styles.sectionContainer}>
      <h1>{title}</h1>
      <div className={styles.buttonContainer}>
        <Button
          variant="outline"
          size="mobileFilterOpen"
          onClick={() => setFilterDropdown(!filterDropDown)}
          className="relative"
        >
          Sort & Filter
        </Button>
        <div className={styles.productFilterCardContainer}>
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
      </div>
      {filterDropDown && (
        <div className="absolute top-[100px] min-[1306px]:hidden">
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
      <div className="flex">
        <div className="flex flex-col max-[1306px]:hidden">
          {filterValueList.length === 0 ? (
            <Button
              variant="filter"
              size="filter"
              className=" mb-6 min-[1306px]:ml-[72px]"
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
              variant="filter"
              size="filter"
              className="mb-6 min-[1306px]:ml-[72px]"
              onClick={clearAllFilters}
            >
              Clear All Filters
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

        <div>
          <div className="flex justify-between min-[1306px]:mx-[72px] max-[1306px]:hidden">
            <div className={styles.productFilterCardContainer}>
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
          <div>
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
                {filteredProductList.length === 0 && (
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
                  {filteredProductList.map((product) => (
                    <Link
                      href={`/materials/${product.id}`}
                      key={product.id}
                      prefetch={false}
                    >
                      <ProductCard {...product} />
                    </Link>
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
