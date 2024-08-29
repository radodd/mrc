// src/pages/MaterialsPage.tsx
import { FilterProvider } from "../../../context/FilterContext";
import ProductGridSection from "../../../components/ProductGridSection";

export default function MaterialsPage() {
  return (
    <FilterProvider>
      <div className="flex justify-center">
        <ProductGridSection title="Materials" />
      </div>
    </FilterProvider>
  );
}
// gap-[6vw]
// "use client";
// import { ProductCard } from "@/components/ProductCard";
// import { ProductFilterCard } from "@/components/ProductFilterCard";
// import { ProductFilters } from "@/components/ProductFilters";
// import { Button } from "@/components/ui/button";
// import { useEffect, useState } from "react";

// interface Product {
//   id: string;
//   name: string;
//   description: string;
//   imagePath: string;
//   company: string;
//   color: string[];
//   category: string[];
// }
// export default function MaterialsPage() {
//   const [filterValueList, setFilterValueList] = useState<string[]>([]);
//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("http://localhost:3030/products");
//         const data = await response.json();
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   console.log(products);

//   const filteredProductList = products.filter((product) => {
//     console.log("in filterdProducts", products);
//     if (filterValueList.length === 1) {
//       console.log("FILTER VALUE LIST", filterValueList);
//       return true;
//     } else {
//       console.log("FILTER VALUE LIST", filterValueList);
//       const colorFilter = filterValueList.some((filterValue) =>
//         product.color.includes(filterValue),
//       );
//       const companyFilter = filterValueList.some((filterValue) =>
//         product.company.includes(filterValue),
//       );
//       const categoryFilter = filterValueList.some((filterValue) =>
//         product.category.includes(filterValue),
//       );
//       return colorFilter || companyFilter || categoryFilter;
//     }
//   });

//   function applyArrayFilter(filterValueList: string[]) {
//     setFilterValueList(filterValueList);
//     console.log("applyArrayFilter", applyArrayFilter);
//   }
//   console.log("Filtered", filteredProductList);

//   const removeFilter = (filter: string) => {
//     setFilterValueList((prevFilters) =>
//       prevFilters.filter((f) => f !== filter),
//     );
//   };

//   return (
//     <>
//       <div className="flex gap-[6vw]">
//         <ProductGridSection
//           title="Materials"
//           productsFetcher={filteredProductList}
//           filterValueList={filterValueList}
//           removeFilter={removeFilter}
//           applyArrayFilter={applyArrayFilter}
//         />
//       </div>
//     </>
//   );
// }

// type ProductGridSectionProps = {
//   productsFetcher: Product[];
//   title: string;
//   filterValueList: string[];
//   removeFilter: (filter: string) => void;
//   applyArrayFilter: (filterValueList: string[]) => void;
// };

// function ProductGridSection({
//   productsFetcher,
//   title,
//   filterValueList,
//   applyArrayFilter,
//   removeFilter,
// }: ProductGridSectionProps) {
//   console.log("TESTTEST", filterValueList);

//   return (
//     <>
//       <div>
//         <h1 className="flex flex-col justify-center items-center text-[64px] my-[80px] max-[1305px]:hidden">
//           {title}
//         </h1>
//         <div className="ml-[250px] flex max-[1305px]:hidden">
//           {filterValueList.map((filter, index) => (
//             <ProductFilterCard
//               key={index}
//               filter={filter}
//               onRemove={removeFilter}
//             ></ProductFilterCard>
//           ))}
//         </div>
//         <div className="min-[1305px]:hidden flex justify-center">
//           <Button variant="outline" className="w-full mx-8 my-10">
//             Sort & Filter
//           </Button>
//         </div>
//         <div className="flex">
//           <ProductFilters
//             arrayFilter={applyArrayFilter}
//             filterValueList={filterValueList}
//           />
//           <div className="border-2 border-red-300 flex flex-col space-y-6 min-[769px]:mx-[72px] min-[1306px]:mx-0 min-[1306px]:mx-[72px]">
//             {productsFetcher.map((product) => (
//               <ProductCard key={product.id} {...product} />
//             ))}
//           </div>{" "}
//         </div>
//       </div>
//     </>
//   );
// }
