"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Separator } from "../../../../components/ui/separator";
import { Button } from "../../../../components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../../../components/ui/hover-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../../components/ui/carousel";
import MaterialDetailForm from "../../../../components/sections/materialDetailPage/MaterialDetailForm";

import styles from "../../../../components/scss/MaterialDetail.module.scss";
import { useRouter } from "next/navigation";

export type ProductCardProps = {
  id: string;
  name: string;
  description: string;
  image_primary: string;
  imagePath: string[];
  company: string;
  color: string[];
  category: string[];
  texture: string[];
  size: string[];
};

type Orientation = "horizontal" | "vertical";

const fetchProductById = async (
  id: string,
): Promise<ProductCardProps | null> => {
  try {
    console.log("ID IN PAGE.tsx", id);
    const response = await fetch(
      `https://mrc-two.vercel.app/api/products/${id}`,
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
    console.log("Fetched data IN DETAILS PAGE:", data);

    // if (!Array.isArray(data)) {
    //   throw new Error("Unexpected response format: data is not an array.");
    // }

    // return data.length > 0 ? data[0] : null;
    return data;
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
  console.log("ID in page.tsx productpage", id, typeof id);
  const router = useRouter();
  // const { id } = router.query;
  const [product, setProduct] = useState<ProductCardProps | null>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [orientation, setOrientation] = useState<Orientation>("horizontal");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setOrientation(
        window.innerWidth < 1305 && window.innerWidth > 768
          ? "vertical"
          : "horizontal",
      );
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (product && product.imagePath?.length > 0) {
      console.log("Fetched product IN DETAIL:", product); // Logging the product data
      setSelectedImage(product.imagePath[0]);
    } else {
      setSelectedImage("/gsa.png");
    }
  }, [product]);

  useEffect(() => {
    if (id) {
      console.log("in page.tsx::", id, typeof id);
      const productId = Array.isArray(id) ? id[0] : id;
      fetchProductById(productId as string)
        .then((data) => {
          console.log("Fetched data IN DETAILS:", data); // Logging the product data
          setProduct(data);
        })
        .catch((error) => {
          console.error("Failed to fetch product data:", error);
        });
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const numImages = product.imagePath.length;
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
              <CarouselPrevious className={styles.prev} />
              <CarouselContent className={styles.carouselContent}>
                {product.imagePath.map((image, index) => (
                  <CarouselItem
                    key={index}
                    // className="basis-1/4 pl-[10px] pr-[0px]"
                    // className={`basis-[calc((75% - ${product.imagePath.length - 1} * 5px) / ${product.imagePath.length})] ml-[25px]`}
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

              <CarouselNext className={styles.next} />
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
          </div>
        </div>

        <div className={styles.materialInfo}>
          <h1>{product.name}</h1>
          <h3>
            Categories:
            <span className="text-secondary-text font-normal pl-1">
              {product.category?.join(", ")}
            </span>
          </h3>
          <h3>
            Colors:
            <span className="text-secondary-text font-normal pl-1">
              {product.color?.join(", ")}
            </span>
          </h3>
          <h3>
            Textures:
            <span className="text-secondary-text font-normal pl-1">
              {product.texture?.join(", ")}
            </span>
          </h3>
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
                  {" "}
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
            {/* <HoverCard>
              <HoverCardTrigger>
                <span className="italic underline text-secondary-text font-openSans cursor-pointer">
                  What is Request to Quote?
                </span>
              </HoverCardTrigger>
              <HoverCardContent>
                We strive to provide the best price for your materials, whether
                you're a wholesaler, retailer, or homeowner. To request a quote,
                simply select the category, size, and quantity of the material,
                then click the “Request to Quote” button to add the item to your
                cart. Afterward, fill out your contact information in the cart.
                Once submitted, we will promptly email you a detailed quote,
                allowing you to proceed with placing your order.
              </HoverCardContent>
            </HoverCard> */}
          </div>
        </div>
      </div>

      <div className={styles.materialDescriptionContainer}>
        <Separator className="bg-blackbase" />
        <h1>Material Description</h1>
        <p>{product.description}</p>
        <h3 className="text-blackbase">
          Company:
          <span className="text-secondary-text font-normal pl-1">
            {product.company}
          </span>
        </h3>
        <h3 className="text-blackbase">
          Uses:
          <span className="text-secondary-text font-normal pl-1">
            Pending more data from MRC
          </span>
        </h3>
      </div>
    </>
  );
}
