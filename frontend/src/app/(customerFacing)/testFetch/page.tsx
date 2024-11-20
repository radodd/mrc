"use client";

import React, { useEffect, useState } from "react";

const MaterialDetailForm = () => {
  const [categories, setCategories] = useState([]); // List of all categories
  const [sizes, setSizes] = useState([]); // List of all sizes
  const [filteredSizes, setFilteredSizes] = useState([]); // Sizes filtered by selected category
  const [selectedCategory, setSelectedCategory] = useState(""); // User-selected category

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://mrc-two.vercel.app/api/materials",
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const uniqueCategories = [
          ...new Set(data.map((material: any) => material.category.name)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    // Fetch sizes
    const fetchSizes = async () => {
      try {
        const response = await fetch("https://mrc-two.vercel.app/api/sizes", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setSizes(data);
      } catch (error) {
        console.error("Error fetching sizes:", error);
      }
    };

    fetchCategories();
    fetchSizes();
  }, []);

  // Update filtered sizes when the category changes
  useEffect(() => {
    if (selectedCategory) {
      const matchingSizes = sizes.filter(
        (size: any) => size.category.name === selectedCategory,
      );
      setFilteredSizes(matchingSizes);
    } else {
      setFilteredSizes([]);
    }
  }, [selectedCategory, sizes]);

  return (
    <div>
      <h2>Material Detail Form</h2>
      <form>
        {/* Category Dropdown */}
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Size Dropdown */}
        <div>
          <label htmlFor="size">Size:</label>
          <select id="size">
            <option value="">Select a size</option>
            {filteredSizes.map((size: any, index) => (
              <option key={index} value={size.sizeValue}>
                {size.sizeValue}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default MaterialDetailForm;

// "use client";
// import React, { useEffect, useState } from "react";

// const TestFetch = () => {
//   const [materials, setMaterials] = useState([]);
//   const [sizes, setSizes] = useState([]);
//   useEffect(() => {
//     const fetchMaterials = async () => {
//       try {
//         const response = await fetch(
//           "https://mrc-two.vercel.app/api/materials",
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
//         setMaterials(data);
//         console.log(data);
//       } catch (error) {
//         console.error("Error fetching DATA:", error);
//       }
//     };
//     fetchMaterials();
//   }, []),
//     useEffect(() => {
//       const fetchSizes = async () => {
//         try {
//           const response = await fetch("https://mrc-two.vercel.app/api/sizes", {
//             method: "GET",
//             credentials: "include",

//             headers: {
//               "Content-Type": "application/json",
//             },
//           });

//           if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//           }
//           const data = await response.json();
//           setSizes(data);
//           console.log("Sizes Data:", data);
//         } catch (error) {
//           console.error("Error fetching DATA:", error);
//         }
//       };
//       fetchSizes();
//     }, []);

//   return (
//     <div>
//       {materials.map((material, index) => (
//         <div key={index}>
//           <span>
//             {material.color.map((col, i) => (
//               <ol key={i}>
//                 <li>{col}</li>
//               </ol>
//             ))}
//           </span>
//           <span>{material.category.name}</span>
//         </div>
//       ))}
//       {sizes.map((size, index) => (
//         <span key={index}>{size.sizeValue}</span>
//       ))}
//     </div>
//   );
// };

// export default TestFetch;
