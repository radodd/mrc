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
import Image from "next/image";

import styles from "../../scss/LandingPageCarousel2.module.scss";

const slides = [
  {
    header: "Hello!",
    subheader: "We are",
    description:
      "We are a collection of companies here to service your construction needs. Click the arrow for more details.",
    buttons: [
      {
        variant: "default",
        text: "View All Materials",
        navigateTo: "/materials",
      },
      { variant: "outline", text: "Contact Us", navigateTo: "/contact" },
    ],
    image: null,
  },
  {
    header: "We are",
    subheader: "Santa Paula Materials",
    description:
      "Our main business is to do demolition and recycling of building materials. We can come get your dirt and then sell it. We sell the material we recycle, like concrete and soil.",
    buttons: [
      { variant: "outline", text: "View Services", navigateTo: "/about" },
      { variant: "default", text: "View Materials", navigateTo: "/contact" },
    ],
    image: "/about_us_timeline.png", // Replace with your actual image path
  },
  {
    header: "We are",
    subheader: "Some Other Company",
    description:
      "We offer construction material recycling and demolition services.",
    buttons: [
      { variant: "outline", text: "View Services", navigateTo: "/about" },
      { variant: "default", text: "View Materials", navigateTo: "/contact" },
    ],
    image: "/about_us_timeline.png", // Replace with your actual image path
  },
];

export default function LandingPageCarousel2() {
  const [currentSlide, setCurrentSlide] = useState(-1);
  const [api, setApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (!api) return;

    setCurrentSlide(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const validVariants = [
    "outline",
    "default",
    "link",
    "filter",
    "destructive",
    "secondary",
    "ghost",
    "quantity",
  ] as const;

  return (
    <>
      <Carousel setApi={setApi} className={styles.carousel}>
        <CarouselContent className={styles.carouselContent}>
          {slides.map((slide, index) => {
            console.log("CarouselItem index:", currentSlide); // Log the index of each CarouselItem

            return (
              <CarouselItem
                key={index}
                className={`${currentSlide === 2 || currentSlide === 3 ? styles.noPadding : ""} ${styles.carouselItem}`}
              >
                {index === 0 ? (
                  <div className={styles.uniqueContentContainer}>
                    <div className={styles.uniqueHeader}>
                      <span>{slide.header}</span>
                      <div className="flex flex-row max-[856px]:flex-col">
                        <span>{slide.subheader}</span>
                        <div className={styles.sliderContainer}>
                          <Slider />
                        </div>
                      </div>
                    </div>
                    <p className={styles.uniqueDescription}>
                      {slide.description}
                    </p>
                    <div className="gap-6 inline-flex max-[768px]:flex-col">
                      {slide.buttons.map((button, btnIndex) => (
                        <Button
                          key={btnIndex}
                          variant={
                            validVariants.includes(
                              button.variant as (typeof validVariants)[number],
                            )
                              ? (button.variant as (typeof validVariants)[number])
                              : "default"
                          }
                          size="default"
                          navigateTo={button.navigateTo}
                        >
                          {button.text}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className={styles.container}>
                    <div className={styles.textContainer}>
                      <div className={styles.headerContainer}>
                        <span>{slide.header}</span>
                        <span>{slide.subheader}</span>
                      </div>
                      <p className={styles.description}>{slide.description}</p>
                      <div className={styles.buttonContainer}>
                        {slide.buttons.map((button, btnIndex) => (
                          <Button
                            key={btnIndex}
                            variant={
                              (currentSlide === 2 || currentSlide === 3) &&
                              btnIndex === 0 &&
                              window.innerWidth <= 900
                                ? "whiteOutline"
                                : validVariants.includes(
                                      button.variant as (typeof validVariants)[number],
                                    )
                                  ? (button.variant as (typeof validVariants)[number])
                                  : "default"
                            }
                            size="default"
                            navigateTo={button.navigateTo}
                          >
                            {button.text}
                          </Button>
                        ))}
                      </div>
                    </div>
                    {slide.image && (
                      <div className={styles.imageContainer}>
                        <Image
                          src={slide.image}
                          alt={`${slide.subheader} image`}
                          width={400}
                          height={300}
                          className={styles.image}
                        />
                      </div>
                    )}
                  </div>
                )}
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious
          className={`${currentSlide === 2 || currentSlide === 3 ? styles.whitePrev : ""} ${styles.prev}`}
        />
        <CarouselNext
          className={`${currentSlide === 2 || currentSlide === 3 ? styles.white : ""} ${styles.next}`}
        />
        <div className={styles.indicatorContainer}>
          {Array.from({ length: slides.length }).map((_, index) => (
            <div key={index}>
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
                  className={`${
                    currentSlide === index + 1 ? "fill-[#307084]" : ""
                  }`}
                />
              </svg>
            </div>
          ))}
        </div>
      </Carousel>
    </>
  );
}
