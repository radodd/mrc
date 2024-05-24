"use client";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilters } from "@/components/ProductFilters";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";

export default function MaterialsPage() {
  const [filterValueList, setFilterValueList] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3030/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProductList = products.filter((product) => {
    if (filterValueList.length === 0) {
      return true;
    } else {
      return filterValueList.includes(product.company);
    }
  });

  function applyArrayFilter(filterValueList: string[]) {
    setFilterValueList(filterValueList);
  }

  return (
    <>
      <div>
        <ProductFilters arrayFilter={applyArrayFilter} />
        <ProductGridSection
          title="Materials"
          productsFetcher={filteredProductList}
        />
      </div>
    </>
  );
}

type ProductGridSectionProps = {
  productsFetcher: Product[];
  title: string;
};

function ProductGridSection({
  productsFetcher,
  title,
}: ProductGridSectionProps) {
  return (
    <>
      <h2 className="flex justify-center items-center text-3xl pb-[154px]">
        {title}
      </h2>
      <div className="flex space-y-3 justify-end items-end">
        <div className="flex flex-col gap-4">
          {productsFetcher.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </>
  );
}
