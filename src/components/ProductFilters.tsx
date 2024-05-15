"use client";
import { useCallback, useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { ProductState } from "@/lib/product-validator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { PrismaClient, Product } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../config/supabaseClient";
// import { QueryResult } from '@upstash/vector'

// Make API call to fetch products
// Function to fetch products from Supabase
// const FetchProducts = async () => {
//   const [filter, setFilter] = useState({
//     sort: "none",
//   });

const SORT_OPTIONS = [
  { name: "None", value: "none" },
  { name: "Name: Ascending", value: "name-asc" },
  { name: "Name: Descending", value: "name-desc" },
] as const;

const COMPANIES = [
  { name: "MRC Rock & Sand", selected: true, href: "#" },
  { name: "Santa Paula Materials", selected: false, href: "#" },
  { name: "Stoneyard", selected: false, href: "#" },
];

const COMPANIES_FILTERS = {
  id: "company",
  name: "Company",
  options: [
    { value: "mrc", label: "MRC Rock & Sand" },
    { value: "spm", label: "Santa Paula Materials" },
    { value: "stoneyard", label: "Stoneyard" },
  ] as const,
};

type ProductFilterProps = {
  onFilterChange: (filterValue: string) => void;
};

export function ProductFilters({ onFilterChange }: ProductFilterProps) {
  const [filter, setFilter] = useState<ProductState>({
    company: ["mrc", "spm", "stoneyard"],
    sort: "none",
  });
  // console.log(filter);

  console.log(supabase);

  const fetchData = async (filterValue: any) => {
    try {
      const { data, error } = await supabase
        .from("Product")
        .select("*")
        .filter("company", "eq", filterValue);

      // Check if there was an error fetching the data
      if (error) {
        console.error("Error fetching products:", error.message);
        return null; // or handle the error appropriately
      }

      // Data fetched successfully
      console.log("Products:", data);
      return data; // Return the fetched data
    } catch (error: any) {
      console.error("Error fetching products:", error.message);
      throw error; // Rethrow the error to be caught by the caller
    }
  };

  // if (!process.env.DATABASE_URL) {
  //   throw new Error("DATABASE_URL environment variable is not defined");
  // }
  //     const response = await axios.post(
  //       `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/product`,
  //       {
  //         filter: {
  //           sort: filter.sort,
  //           company: filter.company,
  //         },
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           apikey: process.env.SUPABASE_API_KEY || "", // Providing a default value ('') if SUPABASE_API_KEY is undefined
  //         },
  //       },
  //     );

  //     return response.data;
  //   } catch (error: any) {
  //     console.error("Error fetching products:", error.message);
  //     throw error;
  //   }
  // };
  // const { data: products, refetch } = useQuery({
  //   queryKey: ["products", filter],
  //   queryFn: fetchData,
  //   enabled: !!process.env.NEXT_PUBLIC_DATABASE_URL,
  // });

  // async function filterProducts({
  //   sort,
  //   company,
  // }: {
  //   sort: string;
  //   company: string[];
  // }) {
  //   const whereClause = {
  //     company: {
  //       in: company,
  //     },
  //   };
  // }

  const applyArrayFilter = ({
    category,
    value,
  }: {
    category: keyof Omit<typeof filter, "sort">;
    value: string;
  }) => {
    const isFilterApplied = filter[category].includes(value as never);

    if (isFilterApplied) {
      setFilter((prev) => ({
        ...prev,
        [category]: prev[category].filter((v) => v !== value),
      }));
    } else {
      // @ts-ignore
      setFilter((prev) => ({
        ...prev,
        [category]: [...prev[category], value],
      }));
    }
  };

  // useEffect(() => {
  //   refetch();
  // }, [filter, refetch]);
  return (
    //     <div className='flex items-center'>
    //     <DropdownMenu>
    //       <DropdownMenuTrigger className='group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900'>
    //         Sort
    //         <ChevronDown className='-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500' />
    //       </DropdownMenuTrigger>

    //       <DropdownMenuContent align='end'>
    //         {SORT_OPTIONS.map((option) => (
    //           <button
    //             key={option.name}
    //             className={cn('text-left w-full block px-4 py-2 text-sm', {
    //               'text-gray-900 bg-gray-100': option.value === filter.sort,
    //               'text-gray-500': option.value !== filter.sort,
    //             })}
    //             onClick={() => {
    //               setFilter((prev) => ({
    //                 ...prev,
    //                 sort: option.value,
    //               }))

    //               _debouncedSubmit()
    //             }}>
    //             {option.name}
    //           </button>
    //         ))}
    //       </DropdownMenuContent>
    //     </DropdownMenu>

    //     <button className='-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden'>
    //       <Filter className='h-5 w-5' />
    //     </button>
    //   </div>
    // </div>
    <div className="hidden lg:block">
      <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
        {COMPANIES.map((category) => (
          <li key={category.name}>
            <button
              disabled={!category.selected}
              className="disabled:cursor-not-allowed disabled:opacity-60"
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>

      <Accordion type="multiple" className="">
        <AccordionItem value="company">
          <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
            <span className="font-medium text-gray-900">Company</span>
          </AccordionTrigger>

          <AccordionContent className="pt-6">
            <ul className="space-y-4">
              {COMPANIES_FILTERS.options.map((option, optionIdx) => (
                <li key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`company-${optionIdx}`}
                    onChange={() => {
                      applyArrayFilter({
                        category: "company",
                        value: option.value,
                      });
                      fetchData(option.value);
                    }}
                    checked={filter.company.includes(option.value)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={`company-${optionIdx}`}
                    className="ml-3 text-sm text-gray-600"
                  >
                    {option.label}
                  </label>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
