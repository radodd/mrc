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
    <>
      <Carousel setApi={setApi} className={styles.carousel}>
        <CarouselContent className={styles.carouselContent}>
          <CarouselItem className={styles.carouselItem}>
            <div className={styles.carouselContainer}>
              <div className={styles.carouselHeader}>
                <h1>Hello!</h1>
                <div className="flex flex-row">
                  <span className="w-[230px]">We are</span>
                  <div className={styles.sliderContainer}>
                    <Slider />
                  </div>
                </div>
              </div>
              <div className={styles.description}>
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
          {/* SLIDE 2 */}
          <CarouselItem className={styles.carouselItem2}>
            <div className={styles.subItem2}>
              <div className={styles.carouselHeader2}>
                <span>We are</span>
                <span>Santa Paula Materials</span>
              </div>
              <p className={styles.body2}>
                Our main business is to do demolition and recycling of building
                materials. We can come get your dirt and then sell it. We sell
                the material we recycle, like concrete and soil.
              </p>
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
          <CarouselItem className="flex max-h-[400px] bg-slate-600 items-center justify-center">
            SOME OTHER COMPANY
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className={styles.prev} />
        <CarouselNext className={styles.next} />
      </Carousel>
      <div className={styles.indicatorContainer}>
        {Array.from({ length: 3 }).map((item, index) => (
          <div key={index} className="">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`${styles.indicator}`}
            >
              <rect
                width="12"
                height="12"
                rx="6"
                fill="#A9C8D3"
                className={`${current === index + 1 ? "fill-[#307084]" : ""}`}
              />
            </svg>
          </div>
        ))}
      </div>
    </>
  );
}
