"use client";
// import { supabase } from '@/lib/supabaseClient';
// import { ProductCardProps } from '@/types';
// import PostLayout from "@/components/post-layout"; // Adjust if necessary
import { useEffect, useState } from "react";
// import supabase from "../../../../../../api/src/server";
import Image from "next/image";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { Separator } from "../../../../components/ui/separator";
import { Button } from "../../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
// import { useRouter } from "next/navigation";

import styles from "../../../../components/scss/QuantityToggle.module.scss";
import { Input } from "../../../../components/ui/input";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../../../components/ui/hover-card";
import ContactUs from "../../../../components/sections/ContactUs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../../components/ui/carousel";
import Form from "../../../../components/sections/materialDetailPage/MaterialDetailForm";
import MaterialDetailForm from "../../../../components/sections/materialDetailPage/MaterialDetailForm";

export type ProductCardProps = {
  id: string;
  name: string;
  description: string;
  imagePath: string[];
  company: string;
  color: string[];
  category: string[];
};

const fetchProductById = async (
  id: string,
): Promise<ProductCardProps | null> => {
  const res = await fetch(`http://localhost:3030/products/${id}`);
  if (!res.ok) {
    return null;
  }
  return await res.json();
};

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [product, setProduct] = useState<ProductCardProps | null>(null);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (product && product.imagePath.length > 0) {
      setImage(product.imagePath[0]);
    }
  }, [product]);

  useEffect(() => {
    if (id) {
      fetchProductById(id as string).then((data) => {
        setProduct(data);
      });
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex justify-center">
        <h1 className="pb-[84px]">Material Details</h1>
      </div>
      <div className="flex justify-center">
        <div className="flex pr-[72px] gap-[48px]">
          <div className="flex flex-col gap-6">
            <Carousel orientation="vertical">
              <CarouselContent className="h-[500px]">
                {product.imagePath.map((image, index) => (
                  <CarouselItem key={index} className="basis-1/6">
                    <Image
                      src={image}
                      alt=""
                      width={93}
                      height={93}
                      onClick={() => setImage(image)}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <div>
            <Image src={image} alt={product.name} width={601} height={601} />
            <h1 className="pt-6 text-[64px]">{product.name}</h1>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <h3>
            Categories:
            <span className="text-blackbase font-normal pl-1">
              {product.category.join(", ")}
            </span>
          </h3>
          <h3>
            Colors:
            <span className="text-blackbase font-normal pl-1">
              {product.color.join(", ")}
            </span>
          </h3>
          <h3>
            Textures:
            <span className="text-blackbase font-normal pl-1">
              {product.color.join(", ")}
            </span>
          </h3>
          <div className="flex gap-6">
            <Button>Spec Sheet</Button>
            <Button>Category Sizes</Button>
          </div>

          <MaterialDetailForm product={product} />
          <div className="flex justify-center">
            <HoverCard>
              <HoverCardTrigger>
                <span className="italic underline">
                  What is Request to Quote?
                </span>
              </HoverCardTrigger>
              <HoverCardContent>
                Hey dumbass! Dis faka dont know what shii bout quotes.
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </div>
      <div className="pt-[106px]">
        <div className="flex flex-col gap-10 pb-[85px]">
          <Separator />
          <h1>Material Description</h1>
          <p>{product.description}</p>
          <h3>
            Company:
            <span className="text-blackbase font-normal pl-1">
              {product.company}
            </span>
          </h3>
          <h3>
            Uses:
            <span className="text-blackbase font-normal pl-1">
              Pending more data from MRC
            </span>
          </h3>
        </div>

        <div>
          <h1>Projects using this material</h1>
          <div className="h-[280px] w-[280px] bg-slate-500"></div>
        </div>
        <div>
          <h1>Similar Products</h1>
          <div className="h-[280px] w-[280px] bg-slate-500"></div>
        </div>
        <ContactUs renderButton={false} />
      </div>
    </>
  );
}
