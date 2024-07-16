"use client";
// src/components/ProductGridSection.tsx
import { useFilter } from "../context/FilterContext";
import { ProductCard } from "./ProductCard";
import { ProductFilterCard } from "./ProductFilterCard";
import { ProductFilters } from "./ProductFilters";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  imagePath: string;
  company: string;
  color: string[];
  category: string[];
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
        const response = await fetch(
          "https://mrc-two.vercel.app/api/products",
          { mode: "no-cors" },
        );

        // const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
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
      return colorFilter || companyFilter || categoryFilter;
    }
  });

  //   function applyArrayFilter(filterValueList: string[]) {
  //     setFilterValueList(filterValueList);
  //   }

  function handleRemoveFilter(filter: string) {
    setFilterValueList((prevFilters) =>
      prevFilters.filter((f) => f !== filter),
    );
    clearFilter(filter);
  }

  return (
    <div>
      <h1 className="flex flex-col justify-center items-center text-[64px] my-[80px] max-[1305px]:hidden">
        {title}
      </h1>
      <div className="ml-[250px] flex max-[1305px]:hidden">
        {filterValueList.map((filter, index) => (
          <ProductFilterCard
            key={index}
            filter={filter}
            onRemove={handleRemoveFilter}
          />
        ))}
      </div>
      <div className="min-[1305px]:hidden flex justify-center">
        <Button variant="outline" className="w-full mx-8 my-10">
          Sort & Filter
        </Button>
      </div>
      <div className="flex">
        <ProductFilters
        //   arrayFilter={applyArrayFilter}
        //   filterValueList={filterValueList}
        //   clearFilter={clearFilter}
        />
        <div className="border-2 border-red-300 flex flex-col space-y-6 min-[769px]:mx-[72px] min-[1305px]:mx-0 min-[1306px]:mx-[72px]">
          {filteredProductList.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
