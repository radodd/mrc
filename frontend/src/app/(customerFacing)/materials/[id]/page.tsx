"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../../../../components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../../components/ui/carousel";
import MaterialDetailForm from "../../../../components/sections/materialDetailPage/MaterialDetailForm";

import styles from "../../../../components/scss/MaterialDetail.module.scss";

export type ProductCardProps = {
  id: string;
  name: string;
  description: string;
  imagePrimary: string;
  imagePath: string[];
  company: string[];
  color: string[];
  uses: string[];
  categories: {
    name: string;
    sizes: string[];
  }[];
  texture: string[];
};

type Orientation = "horizontal" | "vertical";

const fetchMaterialById = async (
  id: string,
): Promise<ProductCardProps | null> => {
  try {
    const response = await fetch(
      `https://mrc-two.vercel.app/api/materials/${id}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Origin: window.location.origin,
        },
      },
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}. Message: ${errorText}`,
      );
    }

    const data = await response.json();
    console.log("Data", data);
    const mappedProduct: ProductCardProps = {
      id: data.id,
      name: data.name,
      description: data.description,
      imagePrimary: data.imagePrimary,
      imagePath: data.imagePath,
      company: data.company,
      color: data.color,
      uses: data.uses,
      texture: data.texture,
      categories: data.MaterialCategories.map((cat: any) => {
        if (!cat.Categories) {
          console.warn("Missing Category in MaterialCategories entry:", cat);
          return null;
        }
        return {
          name: cat.Categories.name,
          sizes: (cat.MaterialCategorySizes || []).map(
            (size: any) => size.Sizes?.sizeValue.trim() || "Unknown size",
          ),
        };
      }).filter((category: any) => category !== null),
    };
    console.log("Data in fetch early", data.MaterialCategories);
    console.log("mapped product", mappedProduct);

    return mappedProduct;
  } catch (error) {
    if (error instanceof TypeError) {
      console.error("Network error or invalid URL:", error);
    } else if (error instanceof SyntaxError) {
      console.error("Failed to parse JSON response:", error);
    } else {
      console.error("Error fetching product by ID:", error);
    }
    return null;
  }
};

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [product, setProduct] = useState<ProductCardProps | null>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [orientation, setOrientation] = useState<Orientation>("horizontal");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setOrientation(
        window.innerWidth > 1306 || window.innerWidth < 768
          ? "horizontal"
          : "vertical",
      );
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (product && product.imagePath?.length > 0) {
      setSelectedImage(product.imagePath[0]);
    } else {
      setSelectedImage("/image_not_available.svg");
    }
  }, [product]);

  useEffect(() => {
    if (id) {
      console.log("in page.tsx::", id, typeof id);
      const productId = Array.isArray(id) ? id[0] : id;
      fetchMaterialById(productId as string)
        .then((mappedProduct) => {
          setProduct(mappedProduct);
          console.log("prodcuts", productId, product, mappedProduct);
        })

        .catch((error) => {
          console.error("Failed to fetch product data:", error);
        });
    }
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center">
        <Image
          src="/loading.svg"
          alt="loading page"
          width={1000}
          height={1000}
        />
      </div>
    );
  }

  const numImages = product.imagePath ? product.imagePath.length : 0;
  const totalGapWidthPercentage = ((4 * 5) / 480) * 50;
  const imageWidthPercentage = (100 - totalGapWidthPercentage) / numImages;
  const basisPercentage = imageWidthPercentage.toFixed(2);

  return (
    <>
      <div className={styles.headerContainer}>
        <h1>Material Details</h1>
      </div>
      <div className={styles.materialDetailsContainer}>
        <div className={styles.materialImagesContainer}>
          <div className={styles.carouselContainer}>
            <Carousel
              orientation={orientation}
              opts={{
                align: "center",
              }}
              className={styles.carousel}
            >
              <CarouselPrevious
                className={styles.prev}
                width={13}
                height={23}
                color="hsl(var(--icon))"
              />
              <CarouselContent className={styles.carouselContent}>
                {product.imagePath?.map((image, index) => (
                  <CarouselItem
                    key={index}
                    className={`basis-[${basisPercentage}%] ${styles.carouselItem}`}
                  >
                    <div
                      className={`${selectedImage === image ? styles.selectedImage : ""} ${styles.carouselImageContainer}`}
                    >
                      <Image
                        src={image}
                        alt=""
                        width={93}
                        height={93}
                        onClick={() => setSelectedImage(image)}
                        className={styles.carouselImage}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselNext
                className={styles.next}
                width={13}
                height={23}
                color="hsl(var(--icon))"
              />
            </Carousel>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src={selectedImage}
              alt={product.name}
              width={601}
              height={601}
              className={styles.image}
            />

            <div className={styles.overlay}>
              {product.company.length !== 1 ? (
                <>
                  {selectedImage
                    .split("/")
                    .pop()
                    ?.split("?")[0]
                    .replace(/_/g, "/")
                    .replace(/%20/g, " ")
                    .replace(".png", "")
                    .replace(/in/, '"')}{" "}
                </>
              ) : (
                product.name
              )}
            </div>
          </div>
        </div>

        <div className={styles.materialInfoContainer}>
          <h1>{product.name}</h1>
          {product.company.length !== 1 ? (
            <>
              <h3>
                Categories:
                <span>
                  {product.categories?.map((cat) => cat.name).join(", ")}
                </span>
              </h3>
              <h3>
                Colors:
                <span>{product.color?.join(", ")}</span>
              </h3>
              <h3>
                Textures:
                <span>{product.texture?.join(", ")}</span>
              </h3>
              {/* <h3>
                Company:
                <span className="text-secondary-text font-normal pl-1">
                  {product.company.join(", ")}
                </span>
              </h3> */}
            </>
          ) : (
            <>
              <h3>
                Colors:
                <span>{product.color?.join(", ")}</span>
              </h3>
              {/* <h3>
                Company:
                <span className="text-secondary-text font-normal pl-1">
                  {product.company.join(", ")}
                </span>
              </h3> */}
              <h3>
                Uses:
                <span>{product.uses?.join(", ")}</span>
              </h3>
            </>
          )}

          <div className="flex gap-6">
            <Button>Category Sizes</Button>
          </div>

          <MaterialDetailForm product={product} />
          <div className={styles.seeMoreButton}>
            <Button variant="link" onClick={() => setExpanded(!expanded)}>
              What is Request to Quote?
            </Button>
            {expanded && (
              <div
                className={`${styles.expandableContent} ${expanded ? styles.expanded : ""}`}
              >
                <p className="text-[16px]">
                  We strive to provide the best price for your materials,
                  whether you're a wholesaler, retailer, or homeowner. To
                  request a quote, simply select the category, size, and
                  quantity of the material, then click the “Request to Quote”
                  button to add the item to your cart. Afterward, fill out your
                  contact information in the cart. Once submitted, we will
                  promptly email you a detailed quote, allowing you to proceed
                  with placing your order.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
