"use client";

import React, { useEffect, useState } from "react";

const MaterialDetailForm = () => {
  const [materials, setMaterials] = useState([]); // All materials
  const [categories, setCategories] = useState([]); // Selected material's categories
  const [sizes, setSizes] = useState([]); // All sizes
  const [filteredSizes, setFilteredSizes] = useState([]); // Sizes filtered by category
  const [selectedMaterial, setSelectedMaterial] = useState(null); // Selected material
  const [selectedCategory, setSelectedCategory] = useState(""); // Selected category

  // Fetch materials and sizes on mount
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch(
          "https://mrc-two.vercel.app/api/materials",
          // `https://mrc-two.vercel.app/api/materials`,
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
        console.log("Materials Data:", data);
        setMaterials(data);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };

    //     const fetchSizes = async () => {
    //       try {
    //         const response = await fetch("https://mrc-two.vercel.app/api/sizes", {
    //           method: "GET",
    //           credentials: "include",
    //           headers: { "Content-Type": "application/json" },
    //         });

    //         if (!response.ok) {
    //           throw new Error(`HTTP error! Status: ${response.status}`);
    //         }

    //         const data = await response.json();
    //         setSizes(data);
    //       } catch (error) {
    //         console.error("Error fetching sizes:", error);
    //       }
    //     };

    fetchMaterials();
    // fetchSizes();
  }, []);

  useEffect(() => {
    if (selectedMaterial) {
      const categoryNames =
        selectedMaterial.MaterialCategories?.map(
          (categoryItem) => categoryItem.Categories.name,
        ) || [];

      setCategories(categoryNames);
      //   setSelectedCategory(""); // Reset selected category
      //   setFilteredSizes([]); // Clear filtered sizes
    }
  }, [selectedMaterial]);

  useEffect(() => {
    if (selectedCategory) {
      console.log("selectedCategory:", selectedCategory);
      console.log(
        "selectedMaterial.MaterialCategories:",
        selectedMaterial.MaterialCategories,
      );
      const category = selectedMaterial.MaterialCategories?.find(
        (cat) => cat.Categories.name === selectedCategory,
      );
      console.log("Category", category);

      const categorySizes =
        category?.MaterialCategorySizes?.map(
          (categorySize) => categorySize.Sizes.sizeValue,
        ) || [];
      console.log("category sizes", categorySizes);

      setSizes(categorySizes);
      setFilteredSizes(categorySizes);
      console.log("filter sizes", filteredSizes);
    }
  }, [selectedCategory]);

  return (
    <div>
      <h2>Material Detail Form</h2>

      {/* Render materials at the top */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {materials.map((material: any, index) => (
          <button
            key={index}
            style={{
              padding: "10px",
              border:
                selectedMaterial?.id === material.id
                  ? "2px solid blue"
                  : "1px solid gray",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => setSelectedMaterial(material)}
          >
            {material.name}
          </button>
        ))}
      </div>

      {/* Form */}
      <form>
        {/* Category Dropdown */}
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            disabled={!categories.length}
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
          <select id="size" disabled={!filteredSizes.length}>
            <option value="">Select a size</option>
            {sizes.map((size, index) => (
              <option key={index} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default MaterialDetailForm;
