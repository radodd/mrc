"use client";

import { Button } from "../../ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import { useEffect, useState } from "react";
import Image from "next/image";

import Slider from "../../SliderAnimation";
import styles from "../../scss/LandingPageCarousel.module.scss";

export default function LandingPageCarousel() {
  const [current, setCurrent] = useState(-1);
  const [api, setApi] = useState<CarouselApi | null>(null);

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
    <div className="bg-tanbase">
      <Carousel setApi={setApi} className={styles.carousel}>
        <CarouselContent>
          <CarouselItem className={styles.carouselItem}>
            <div className={styles.carouselContainer}>
              <div className={styles.carouselHeader}>
                <h1>Hello!</h1>
                <div className="flex flex-row">
                  <div className="w-[230px]">
                    <span className="block ">We are</span>
                  </div>
                  <div className="flex flex-col w-fit justify-start text-start">
                    <Slider />
                  </div>
                </div>
              </div>
              <div>
                <p className="">
                  We are a collection of companies here to service your
                  construction needs.
                </p>
              </div>
              <div className="gap-6 inline-flex max-[768px]:flex-col">
                <Button variant="outline" size="default" navigateTo="/about">
                  About Us
                </Button>
                <Button variant="default" size="default" navigateTo="/contact">
                  Contact Us
                </Button>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="flex bg-slate-600 items-center justify-center">
            SANTA PAULA MATERIALS
          </CarouselItem>
          <CarouselItem className="flex bg-slate-600 items-center justify-center">
            SOME OTHER COMPANY
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className={styles.indicatorContainer}>
        {Array.from({ length: 3 }).map((item, index) => (
          <div key={index} className="">
            <Image
              src="/indicator.svg"
              alt=""
              width={12}
              height={12}
              className={`${styles.indicator} ${current === index + 1 ? styles.active : ""}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
