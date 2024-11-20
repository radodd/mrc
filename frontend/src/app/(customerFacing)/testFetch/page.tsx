"use client";
import React, { useEffect, useState } from "react";

const TestFetch = () => {
  const [materials, setMaterials] = useState([]);
  const [sizes, setSizes] = useState([]);
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch(
          "https://mrc-two.vercel.app/api/materials",
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
        setMaterials(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching DATA:", error);
      }
    };
    fetchMaterials();
  }, []),
    useEffect(() => {
      const fetchSizes = async () => {
        try {
          const response = await fetch("https://mrc-two.vercel.app/api/sizes", {
            method: "GET",
            credentials: "include",

            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setSizes(data);
          console.log(data);
        } catch (error) {
          console.error("Error fetching DATA:", error);
        }
      };
      fetchSizes();
    }, []);

  return (
    <div>
      {materials.map((material, index) => (
        <div key={index}>
          <span>
            {material.color.map((col, i) => (
              <ol key={i}>
                <li>{col}</li>
              </ol>
            ))}
          </span>
          <span>{material.category.name}</span>
        </div>
      ))}
    </div>
  );
};

export default TestFetch;
