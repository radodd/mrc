"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/carousel";
import { Articles } from "../../../../..";

import styles from "../../scss/NewsArticles.module.scss";
import { useEffect, useState } from "react";
import CarouselIndicator from "../../ui/CarouselIndicator";
import { Button } from "../../ui/button";

export default function NewsArticles() {
  const [current, setCurrent] = useState(-1);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [isAbove768px, setIsAbove768px] = useState(
    typeof window !== "undefined" ? window.innerWidth > 768 : false,
  );

  // useEffect(() => {
  //   function handleResize() {
  //     setIsAbove768px(window.innerWidth > 768);
  //   }
  //   window.addEventListener("resize", handleResize);
  //   handleResize();
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    function handleResize() {
      setIsAbove768px(window.innerWidth > 768);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className={styles.sectionContainer}>
      {/* <h1>Spirit</h1> */}

      <Carousel setApi={setApi} className={styles.carousel}>
        <CarouselContent className={styles.carouselContent}>
          {Articles.map((article, index) => (
            <CarouselItem key={index} className="pl-3 min-[769px]:flex">
              <div className={styles.imageContainer}>
                <Image
                  src={article.image}
                  alt=""
                  width={700}
                  height={700}
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  className={styles.image}
                />
              </div>
              <div className={styles.textContainer}>
                <h1>{article.title}</h1>
                <p>{article.content}</p>
                <Button
                  variant="outline"
                  size="default"
                  navigateTo={article.url}
                >
                  {article.button}
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          width={20}
          height={30}
          color={isAbove768px ? "#FDFBF6" : "#235E74"}
          className={styles.prev}
        />
        <CarouselNext
          width={20}
          height={30}
          color="#235E74"
          className={styles.next}
        />
      </Carousel>
      <CarouselIndicator
        total={3}
        current={current}
        color="fill-[#307084]"
        className={styles.indicatorContainer}
      />
    </div>
  );
}
