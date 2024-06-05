"use client";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilterCard } from "@/components/ProductFilterCard";
import { ProductFilters } from "@/components/ProductFilters";
import { Separator } from "@/components/ui/separator";
// import { Product } from "@prisma/client";
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

  console.log(products);

  const filteredProductList = products.filter((product) => {
    console.log("in filterdProducts", products);
    if (filterValueList.length === 1) {
      console.log("FILTER VALUE LIST", filterValueList);
      return true;
    } else {
      console.log("FILTER VALUE LIST", filterValueList);
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

  function applyArrayFilter(filterValueList: string[]) {
    setFilterValueList(filterValueList);
    console.log("applyArrayFilter", applyArrayFilter);
  }
  console.log("Filtered", filteredProductList);

  const removeFilter = (filter: string) => {
    setFilterValueList((prevFilters) =>
      prevFilters.filter((f) => f !== filter),
    );
  };

  return (
    <>
      <div className="flex gap-[6vw]">
        <ProductFilters
          arrayFilter={applyArrayFilter}
          filterValueList={filterValueList}
        />
        <ProductGridSection
          title="Materials"
          productsFetcher={filteredProductList}
          filterValueList={filterValueList}
          removeFilter={removeFilter}
        />
      </div>
    </>
  );
}

type ProductGridSectionProps = {
  productsFetcher: Product[];
  title: string;
  filterValueList: string[];
  removeFilter: (filter: string) => void;
};

function ProductGridSection({
  productsFetcher,
  title,
  filterValueList,
  removeFilter,
}: ProductGridSectionProps) {
  console.log("TEST", filterValueList);

  return (
    <>
      <div>
        <h1 className="flex flex-col justify-center items-center text-[64px] pb-[154px]">
          {title}
        </h1>
        <div className="flex">
          {filterValueList.map((filter, index) => (
            <ProductFilterCard
              key={index}
              filter={filter}
              onRemove={removeFilter}
            ></ProductFilterCard>
          ))}
        </div>

        <div className="flex space-y-3 justify-end items-end">
          <div className="flex flex-col gap-4">
            {productsFetcher.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
