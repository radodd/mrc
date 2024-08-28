"use client";
import { text } from "stream/consumers";
// src/components/ProductGridSection.tsx
import { useFilter } from "../context/FilterContext";
import { ProductCard } from "./ProductCard";
import { ProductFilterCard } from "./ProductFilterCard";
import { ProductFilters } from "./ProductFilters";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

import styles from "./scss/ProductGridSection.module.scss";
import { ProductFilters2 } from "./ProductFilters2";

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const response = await fetch("http://localhost:3030/products");
        // const response = await fetch("https://mrc-two.vercel.app/api/products");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/Product`,
          {
            headers: {
              "Content-Type": "application/json",
              apikey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY,
            },
          },
        );
        // { mode: "no-cors" },

        // const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching DATA:", error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProductList = products.filter((product) => {
    if (filterValueList.length === 0) {
      return true;
    } else {
      const colorFilter = filterValueList.some((filterValue) =>
        product.color.includes(filterValue),
      );
      const companyFilter = filterValueList.some((filterValue) =>
        product.company.includes(filterValue),
      );
      const categoryFilter = filterValueList.some((filterValue) =>
        product.category.includes(filterValue),
      );
      const textureFilter = filterValueList.some((filterValue) =>
        product.texture.includes(filterValue),
      );
      const sizeFilter = filterValueList.some((filterValue) =>
        product.size.includes(filterValue),
      );
      return (
        colorFilter ||
        companyFilter ||
        categoryFilter ||
        textureFilter ||
        sizeFilter
      );
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

  const handleCheckboxChange = (filterKey: string, value: string) => {
    // Implement your logic here
    console.log(`Filter key: ${filterKey}, Value: ${value}`);
  };

  return (
    <section className={styles.sectionContainer}>
      <h1>{title}</h1>
      <div className={styles.productFilterCardContainer}>
        {filterValueList.map((filter, index) => (
          <ProductFilterCard
            key={index}
            filter={filter}
            onRemove={handleRemoveFilter}
          />
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <Button variant="outline">Sort & Filter</Button>
      </div>
      <div className="flex">
        <ProductFilters
          categoryCounts={categoryCounts}
          colorCounts={colorCounts}
          companyCounts={companyCounts}
          textureCounts={textureCounts}
          sizeCounts={sizeCounts}
        />
        <div className={styles.productCardContainer}>
          {filteredProductList.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
