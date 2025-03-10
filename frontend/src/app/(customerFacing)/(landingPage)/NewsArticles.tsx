"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import styles from "@/scss/NewsArticles.module.scss";
import { useEffect, useState } from "react";
import CarouselIndicator from "@/components/ui/CarouselIndicator";
import { Button } from "@/components/ui/button";
import { Articles } from "../../../../..";
// import { Articles } from "@/index";
export default function NewsArticles() {
  const [current, setCurrent] = useState(-1);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [isAbove980px, setIsAbove980px] = useState(
    typeof window !== "undefined" ? window.innerWidth > 980 : true,
  );

  // useEffect(() => {
  //   if (window.innerWidth < 980) setIsAbove768px(false);
  // }, [window.innerWidth]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAbove980px(window.innerWidth > 980);
    }
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
      <Carousel setApi={setApi} className={styles.carousel}>
        <CarouselContent className={styles.carouselContent}>
          {Articles.map((article, index) => (
            <CarouselItem
              key={index}
              className="pl-3 min-[980px]:flex max-h-fit"
            >
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
          color={isAbove980px ? "#FDFBF6" : "#235E74"}
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
