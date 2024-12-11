"use client";

import { useFilter } from "../context/FilterContext";
import { ProductCard } from "./ProductCard";
import { ProductFilterCard } from "./ProductFilterCard";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { ProductFilters2 } from "./ProductFilters2";
import Image from "next/image";
import FilterDropDown from "./FilterDropDown";
import AlphabetizeButtons from "./AlphabetizeButtons";
import AlphabetizeRadio from "./AlphabetizeRadio";
import ChevronIcon from "../../public/chevron_nav_sharp.svg";

import styles from "./scss/ProductGridSection.module.scss";

interface Product {
  id: number;
  name: string;
  description: string;
  image_primary: string | null;
  imagePath: string[] | null;
  company: string[];
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
          image_primary: material.imagePrimary,
          imagePath: material.imagePath,
          company: material.company,
          color: material.color,
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

  const filteredProductList = products.filter((product) => {
    if (filterValueList.length === 0) return true;

    return filterValueList.every((filterValue) => {
      return (
        product.color.includes(filterValue) ||
        product.company.includes(filterValue) ||
        product.category.includes(filterValue) ||
        product.texture.includes(filterValue) ||
        product.size.includes(filterValue)
      );
    });
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
      product.company.forEach((comp) => {
        counts[comp] = (counts[comp] || 0) + 1;
      });
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

  const clearAllFilters = () => setFilterValueList([]);

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
                onClick={() => setFilterValueList([])}
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
              {filteredProductList.map((product, index) => (
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
              variant="filter"
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
              className="flex items-center mb-6 min-[1306px]:ml-[72px]"
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
                  {filteredProductList.map((product, index) => (
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

// "use client";
// import { useFilter } from "../context/FilterContext";
// import { ProductCard } from "./ProductCard";
// import { ProductFilterCard } from "./ProductFilterCard";
// import { Button } from "./ui/button";
// import { useEffect, useState } from "react";
// import { ProductFilters2 } from "./ProductFilters2";
// import Image from "next/image";
// import FilterDropDown from "./FilterDropDown";
// import AlphabetizeButtons from "./AlphabetizeButtons";
// import AlphabetizeRadio from "./AlphabetizeRadio";
// import ChevronIcon from "../../public/chevron_nav_sharp.svg";

// import styles from "./scss/ProductGridSection.module.scss";

// interface Product {
//   id: string;
//   name: string;
//   description: string;
//   image_primary: string;
//   imagePath: string[];
//   company: string;
//   color: string[];
//   category: string[];
//   texture: string[];
//   size: string[];
// }

// type ProductGridSectionProps = {
//   title: string;
// };

// export default function ProductGridSection({ title }: ProductGridSectionProps) {
//   const { filterValueList, setFilterValueList, clearFilter } = useFilter();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [alphabetFilter, setAlphabetFilter] = useState(false);
//   const [filterDropDown, setFilterDropdown] = useState(false);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     console.log("Current filters:", filterValueList);
//   }, [filterValueList]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch(
//           "https://mrc-two.vercel.app/api/products",
//           // "https://mrc-two.vercel.app/api/materials",
//           {
//             method: "GET",
//             credentials: "include",

//             headers: {
//               "Content-Type": "application/json",
//             },
//           },
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching DATA:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const filteredProductList = products.filter((product) => {
//     if (filterValueList.length === 0) {
//       return true;
//     } else {
//       return filterValueList.every((filterValue) => {
//         const colorFilter = product.color.includes(filterValue);
//         const companyFilter = product.company.includes(filterValue);
//         const categoryFilter = product.category.includes(filterValue);
//         const textureFilter = product.texture.includes(filterValue);
//         const sizeFilter = product.size.includes(filterValue);

//         return (
//           colorFilter ||
//           companyFilter ||
//           categoryFilter ||
//           textureFilter ||
//           sizeFilter
//         );
//       });
//     }
//   });

//   const categoryCounts = filteredProductList.reduce(
//     (counts: Record<string, number>, product) => {
//       product.category.forEach((cat) => {
//         counts[cat] = (counts[cat] || 0) + 1;
//       });
//       return counts;
//     },
//     {},
//   );

//   // const categoryCounts = filteredProductList.reduce(
//   //   (counts: Record<string, number>, product) => {
//   //     // Replace `product.category` with the correct field or transform `category_id` to a category name.
//   //     const categories = Array.isArray(product.color) ? product.color : [];
//   //     categories.forEach((cat) => {
//   //       counts[cat] = (counts[cat] || 0) + 1;
//   //     });
//   //     return counts;
//   //   },
//   //   {},
//   // );
//   const colorCounts = filteredProductList.reduce(
//     (counts: Record<string, number>, product) => {
//       product.color.forEach((col) => {
//         counts[col] = (counts[col] || 0) + 1;
//       });
//       return counts;
//     },
//     {},
//   );

//   const companyCounts = filteredProductList.reduce(
//     (counts: Record<string, number>, product) => {
//       counts[product.company] = (counts[product.company] || 0) + 1;
//       return counts;
//     },
//     {},
//   );

//   const textureCounts = filteredProductList.reduce(
//     (counts: Record<string, number>, product) => {
//       product.texture.forEach((tex) => {
//         counts[tex] = (counts[tex] || 0) + 1;
//       });
//       return counts;
//     },
//     {},
//   );

//   const sizeCounts = filteredProductList.reduce(
//     (counts: Record<string, number>, product) => {
//       product.size.forEach((size) => {
//         counts[size] = (counts[size] || 0) + 1;
//       });
//       return counts;
//     },
//     {},
//   );
//   const handleRemoveFilter = (filter: string) => {
//     setFilterValueList((prevFilters) =>
//       prevFilters.filter((f) => f !== filter),
//     );
//     clearFilter(filter);
//   };

//   const clearAllFilters = () => {
//     setFilterValueList([]);
//   };
//   console.log("before return", filterValueList);
//   return (
//     <section className={styles.sectionContainer}>
//       <h1>{title}</h1>
//       <div className={styles.buttonContainer}>
//         <div className="flex flex-row gap-6 w-full justify-center items-center">
//           <div className="w-full">
//             <Button
//               variant="outline"
//               size="mobileFilterOpen"
//               onClick={() => setFilterDropdown(!filterDropDown)}
//               className=""
//             >
//               Sort & Filter
//             </Button>
//           </div>

//           {filterValueList.length !== 0 && (
//             <div className="max-w-min">
//               <Button
//                 variant="filterClear"
//                 size="slim"
//                 onClick={() => setFilterValueList([])}
//               >
//                 Clear All
//               </Button>
//             </div>
//           )}
//         </div>

//         <div className={styles.productFilterCardContainer}>
//           {filterValueList.length === 0 ||
//           (filterValueList.length === 1 && filterValueList[0] === "") ? (
//             <ProductFilterCard filter="All Materials" />
//           ) : (
//             filterValueList
//               .filter((filter) => filter && filter.length > 0)
//               .map((filter, index) => (
//                 <ProductFilterCard
//                   key={index}
//                   filter={filter}
//                   onRemove={handleRemoveFilter}
//                 />
//               ))
//           )}
//         </div>
//       </div>
//       <div className="flex justify-center min-[1306px]:hidden ">
//         {loading ? ( // Display loading icon while fetching data
//           <div className={styles.loadingContainer}>
//             <Image
//               src="/loading.svg"
//               alt="Loading..."
//               width={800}
//               height={400}
//             />
//           </div>
//         ) : (
//           <>
//             {filteredProductList.length === 0 && (
//               <div className={styles.noItemsMatchContainer}>
//                 <Image
//                   src="/no_items_match.svg"
//                   alt="No items match your filters"
//                   width={777}
//                   height={405}
//                 />
//               </div>
//             )}
//             <div className={styles.productCardContainer}>
//               {filteredProductList.map((product, index) => (
//                 <ProductCard {...product} key={index} />
//               ))}
//             </div>
//           </>
//         )}
//       </div>

//       {filterDropDown && (
//         <div className=" bg-whitebase absolute top-[100px] min-[1306px]:hidden">
//           <Button
//             variant="mobileFilterClose"
//             size="mobileFilterClose"
//             onClick={() => setFilterDropdown(!filterDropDown)}
//           >
//             <ChevronIcon
//               width={30}
//               height={30}
//               className={styles.chevronClose}
//             />
//             Sort & Filter
//           </Button>

//           {/* <Separator /> */}

//           <AlphabetizeRadio products={products} setProducts={setProducts} />
//           <FilterDropDown
//             filterValueList={filterValueList}
//             setFilterValueList={setFilterValueList}
//             clearFilter={clearFilter}
//             categoryCounts={categoryCounts}
//             colorCounts={colorCounts}
//             companyCounts={companyCounts}
//             textureCounts={textureCounts}
//             sizeCounts={sizeCounts}
//             allFilters={[]}
//             filterDropDown={filterDropDown}
//             setFilterDropDown={setFilterDropdown}
//           />
//         </div>
//       )}
//       {/* DESKTOP */}

//       <div className="flex flex-row justify-center items-start gap-[72px] max-[1306px]:hidden">
//         <div className="flex flex-col">
//           {filterValueList.length === 0 ? (
//             <Button
//               variant="filter"
//               size="filter"
//               className={`mb-6 min-[1306px]:ml-[72px] `}
//               onClick={clearAllFilters}
//             >
//               <Image
//                 src="/filter.svg"
//                 alt=""
//                 width={25}
//                 height={25}
//                 className="pr-2"
//               />
//               Filter
//             </Button>
//           ) : (
//             <Button
//               variant="otherFilter"
//               size="filter"
//               className="flex items-center mb-6 min-[1306px]:ml-[72px]"
//               onClick={clearAllFilters}
//             >
//               Clear All Filters
//             </Button>
//           )}
//           <ProductFilters2
//             filterValueList={filterValueList}
//             setFilterValueList={setFilterValueList}
//             clearFilter={clearFilter}
//             categoryCounts={categoryCounts}
//             colorCounts={colorCounts}
//             companyCounts={companyCounts}
//             textureCounts={textureCounts}
//             sizeCounts={sizeCounts}
//             allFilters={[]}
//           />
//         </div>
//         <div className="flex flex-col">
//           <div className="flex flex-row">
//             <div className={styles.productFilterCardContainerDesktop}>
//               {filterValueList.map((filter, index) => (
//                 <ProductFilterCard
//                   key={index}
//                   filter={filter}
//                   onRemove={handleRemoveFilter}
//                 />
//               ))}
//               {filterValueList.length === 0 && (
//                 <ProductFilterCard
//                   filter="All Materials"
//                   onRemove={handleRemoveFilter}
//                 />
//               )}
//             </div>
//             <AlphabetizeButtons
//               products={products}
//               setProducts={setProducts}
//               alphabetFilter={alphabetFilter}
//               setAlphabetFilter={setAlphabetFilter}
//             />
//           </div>

//           <div className="min-[1306px]:mx-[0px] ">
//             {loading ? ( // Display loading icon while fetching data
//               <div className={styles.loadingContainer}>
//                 <Image
//                   src="/loading.svg"
//                   alt="Loading..."
//                   width={800}
//                   height={400}
//                 />
//               </div>
//             ) : (
//               <>
//                 {filteredProductList.length === 0 && (
//                   <div className={styles.noItemsMatchContainer}>
//                     <Image
//                       src="/no_items_match.svg"
//                       alt="No items match your filters"
//                       width={777}
//                       height={405}
//                     />
//                   </div>
//                 )}
//                 <div className={styles.productCardContainer}>
//                   {filteredProductList.map((product, index) => (
//                     <ProductCard {...product} key={index} />
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// "use client";
// import { useFilter } from "../context/FilterContext";
// import { ProductCard } from "./ProductCard";
// import { ProductFilterCard } from "./ProductFilterCard";
// import { Button } from "./ui/button";
// import { useEffect, useState } from "react";
// import { ProductFilters2 } from "./ProductFilters2";
// import Image from "next/image";
// import FilterDropDown from "./FilterDropDown";
// import AlphabetizeButtons from "./AlphabetizeButtons";
// import AlphabetizeRadio from "./AlphabetizeRadio";
// import ChevronIcon from "../../public/chevron_nav_sharp.svg";

// import styles from "./scss/ProductGridSection.module.scss";

// interface Product {
//   id: string;
//   name: string;
//   description: string;
//   image_primary: string;
//   imagePath: string[];
//   company: string;
//   color: string[];
//   category: string[];
//   texture: string[];
//   size: string[];
// }

// type ProductGridSectionProps = {
//   title: string;
// };

// export default function ProductGridSection({ title }: ProductGridSectionProps) {
//   const { filterValueList, setFilterValueList, clearFilter } = useFilter();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [alphabetFilter, setAlphabetFilter] = useState(false);
//   const [filterDropDown, setFilterDropdown] = useState(false);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     console.log("Current filters:", filterValueList);
//   }, [filterValueList]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch(
//           "https://mrc-two.vercel.app/api/products",
//           // "https://mrc-two.vercel.app/api/materials",
//           {
//             method: "GET",
//             credentials: "include",

//             headers: {
//               "Content-Type": "application/json",
//             },
//           },
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching DATA:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const filteredProductList = products.filter((product) => {
//     if (filterValueList.length === 0) {
//       return true;
//     } else {
//       return filterValueList.every((filterValue) => {
//         const colorFilter = product.color.includes(filterValue);
//         const companyFilter = product.company.includes(filterValue);
//         const categoryFilter = product.category.includes(filterValue);
//         const textureFilter = product.texture.includes(filterValue);
//         const sizeFilter = product.size.includes(filterValue);

//         return (
//           colorFilter ||
//           companyFilter ||
//           categoryFilter ||
//           textureFilter ||
//           sizeFilter
//         );
//       });
//     }
//   });

//   const categoryCounts = filteredProductList.reduce(
//     (counts: Record<string, number>, product) => {
//       product.category.forEach((cat) => {
//         counts[cat] = (counts[cat] || 0) + 1;
//       });
//       return counts;
//     },
//     {},
//   );

//   // const categoryCounts = filteredProductList.reduce(
//   //   (counts: Record<string, number>, product) => {
//   //     // Replace `product.category` with the correct field or transform `category_id` to a category name.
//   //     const categories = Array.isArray(product.color) ? product.color : [];
//   //     categories.forEach((cat) => {
//   //       counts[cat] = (counts[cat] || 0) + 1;
//   //     });
//   //     return counts;
//   //   },
//   //   {},
//   // );
//   const colorCounts = filteredProductList.reduce(
//     (counts: Record<string, number>, product) => {
//       product.color.forEach((col) => {
//         counts[col] = (counts[col] || 0) + 1;
//       });
//       return counts;
//     },
//     {},
//   );

//   const companyCounts = filteredProductList.reduce(
//     (counts: Record<string, number>, product) => {
//       counts[product.company] = (counts[product.company] || 0) + 1;
//       return counts;
//     },
//     {},
//   );

//   const textureCounts = filteredProductList.reduce(
//     (counts: Record<string, number>, product) => {
//       product.texture.forEach((tex) => {
//         counts[tex] = (counts[tex] || 0) + 1;
//       });
//       return counts;
//     },
//     {},
//   );

//   const sizeCounts = filteredProductList.reduce(
//     (counts: Record<string, number>, product) => {
//       product.size.forEach((size) => {
//         counts[size] = (counts[size] || 0) + 1;
//       });
//       return counts;
//     },
//     {},
//   );
//   const handleRemoveFilter = (filter: string) => {
//     setFilterValueList((prevFilters) =>
//       prevFilters.filter((f) => f !== filter),
//     );
//     clearFilter(filter);
//   };

//   const clearAllFilters = () => {
//     setFilterValueList([]);
//   };
//   console.log("before return", filterValueList);
//   return (
//     <section className={styles.sectionContainer}>
//       <h1>{title}</h1>
//       <div className={styles.buttonContainer}>
//         <div className="flex flex-row gap-6 w-full justify-center items-center">
//           <div className="w-full">
//             <Button
//               variant="outline"
//               size="mobileFilterOpen"
//               onClick={() => setFilterDropdown(!filterDropDown)}
//               className=""
//             >
//               Sort & Filter
//             </Button>
//           </div>

//           {filterValueList.length !== 0 && (
//             <div className="max-w-min">
//               <Button
//                 variant="filterClear"
//                 size="slim"
//                 onClick={() => setFilterValueList([])}
//               >
//                 Clear All
//               </Button>
//             </div>
//           )}
//         </div>

//         <div className={styles.productFilterCardContainer}>
//           {filterValueList.length === 0 ||
//           (filterValueList.length === 1 && filterValueList[0] === "") ? (
//             <ProductFilterCard filter="All Materials" />
//           ) : (
//             filterValueList
//               .filter((filter) => filter && filter.length > 0)
//               .map((filter, index) => (
//                 <ProductFilterCard
//                   key={index}
//                   filter={filter}
//                   onRemove={handleRemoveFilter}
//                 />
//               ))
//           )}
//         </div>
//       </div>
//       <div className="flex justify-center min-[1306px]:hidden ">
//         {loading ? ( // Display loading icon while fetching data
//           <div className={styles.loadingContainer}>
//             <Image
//               src="/loading.svg"
//               alt="Loading..."
//               width={800}
//               height={400}
//             />
//           </div>
//         ) : (
//           <>
//             {filteredProductList.length === 0 && (
//               <div className={styles.noItemsMatchContainer}>
//                 <Image
//                   src="/no_items_match.svg"
//                   alt="No items match your filters"
//                   width={777}
//                   height={405}
//                 />
//               </div>
//             )}
//             <div className={styles.productCardContainer}>
//               {filteredProductList.map((product, index) => (
//                 <ProductCard {...product} key={index} />
//               ))}
//             </div>
//           </>
//         )}
//       </div>

//       {filterDropDown && (
//         <div className=" bg-whitebase absolute top-[100px] min-[1306px]:hidden">
//           <Button
//             variant="mobileFilterClose"
//             size="mobileFilterClose"
//             onClick={() => setFilterDropdown(!filterDropDown)}
//           >
//             <ChevronIcon
//               width={30}
//               height={30}
//               className={styles.chevronClose}
//             />
//             Sort & Filter
//           </Button>

//           {/* <Separator /> */}

//           <AlphabetizeRadio products={products} setProducts={setProducts} />
//           <FilterDropDown
//             filterValueList={filterValueList}
//             setFilterValueList={setFilterValueList}
//             clearFilter={clearFilter}
//             categoryCounts={categoryCounts}
//             colorCounts={colorCounts}
//             companyCounts={companyCounts}
//             textureCounts={textureCounts}
//             sizeCounts={sizeCounts}
//             allFilters={[]}
//             filterDropDown={filterDropDown}
//             setFilterDropDown={setFilterDropdown}
//           />
//         </div>
//       )}
//       {/* DESKTOP */}

//       <div className="flex flex-row justify-center items-start gap-[72px] max-[1306px]:hidden">
//         <div className="flex flex-col">
//           {filterValueList.length === 0 ? (
//             <Button
//               variant="filter"
//               size="filter"
//               className={`mb-6 min-[1306px]:ml-[72px] `}
//               onClick={clearAllFilters}
//             >
//               <Image
//                 src="/filter.svg"
//                 alt=""
//                 width={25}
//                 height={25}
//                 className="pr-2"
//               />
//               Filter
//             </Button>
//           ) : (
//             <Button
//               variant="otherFilter"
//               size="filter"
//               className="flex items-center mb-6 min-[1306px]:ml-[72px]"
//               onClick={clearAllFilters}
//             >
//               Clear All Filters
//             </Button>
//           )}
//           <ProductFilters2
//             filterValueList={filterValueList}
//             setFilterValueList={setFilterValueList}
//             clearFilter={clearFilter}
//             categoryCounts={categoryCounts}
//             colorCounts={colorCounts}
//             companyCounts={companyCounts}
//             textureCounts={textureCounts}
//             sizeCounts={sizeCounts}
//             allFilters={[]}
//           />
//         </div>
//         <div className="flex flex-col">
//           <div className="flex flex-row">
//             <div className={styles.productFilterCardContainerDesktop}>
//               {filterValueList.map((filter, index) => (
//                 <ProductFilterCard
//                   key={index}
//                   filter={filter}
//                   onRemove={handleRemoveFilter}
//                 />
//               ))}
//               {filterValueList.length === 0 && (
//                 <ProductFilterCard
//                   filter="All Materials"
//                   onRemove={handleRemoveFilter}
//                 />
//               )}
//             </div>
//             <AlphabetizeButtons
//               products={products}
//               setProducts={setProducts}
//               alphabetFilter={alphabetFilter}
//               setAlphabetFilter={setAlphabetFilter}
//             />
//           </div>

//           <div className="min-[1306px]:mx-[0px] ">
//             {loading ? ( // Display loading icon while fetching data
//               <div className={styles.loadingContainer}>
//                 <Image
//                   src="/loading.svg"
//                   alt="Loading..."
//                   width={800}
//                   height={400}
//                 />
//               </div>
//             ) : (
//               <>
//                 {filteredProductList.length === 0 && (
//                   <div className={styles.noItemsMatchContainer}>
//                     <Image
//                       src="/no_items_match.svg"
//                       alt="No items match your filters"
//                       width={777}
//                       height={405}
//                     />
//                   </div>
//                 )}
//                 <div className={styles.productCardContainer}>
//                   {filteredProductList.map((product, index) => (
//                     <ProductCard {...product} key={index} />
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
