"use client";
import { useEffect, useState } from "react";
// import { projects } from "../../../../..";
import Image from "next/image";

const page = () => {
  const [projects, setProjects] = useState([]);
  const gridItems = [];
  for (let i = 0; i < 12; i++) {
    gridItems.push(
      <div key={i} className="relative w-full h-48">
        <Image
          src="https://dzlauufqbyfqfivbiipg.supabase.co/storage/v1/object/sign/ProjectGalleryTest/image_145.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJQcm9qZWN0R2FsbGVyeVRlc3QvaW1hZ2VfMTQ1LnBuZyIsImlhdCI6MTcxOTQ2NjIyMiwiZXhwIjozMzIyMzkzMDIyMn0.hxTasZqFZ87hmSGYUhG-eNOpIrI4BIW1pNfbkpS-ZJQ&t=2024-06-27T05%3A30%3A24.434Z"
          layout="fill"
          objectFit="cover"
          alt={`Grid item ${i + 1}`}
        />
      </div>,
    );

    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const response = await fetch("http://localhost:3030/projects");
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          console.log(`this is the data: ${data}`);
          setProjects(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchProjects();
    }, []);
  }
  return (
    <div className="flex flex-col gap-20 mx-[72px] my-20">
      <h1 className="flex justify-center text-[64px]">Project Gallery</h1>
      <div className="grid grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="flex flex-col">
            <Image alt="project" src={project.image} width={416} height={234} />
            <div>
              <p className="font-bold">{project.name}</p>
              <p>{project.product}</p>
              <p>{project.adress}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <p className="text-primary text-2xl font-bold">Show more ^</p>
      </div>
      <p className="text-[40px] font-bold">Companies we have partnered with</p>
      <div className="grid grid-cols-3 gap-6">{gridItems}</div>
      <div className="flex justify-center">
        <p className="text-primary text-2xl font-bold">Show more ^</p>
      </div>
    </div>
  );
};

export default page;
