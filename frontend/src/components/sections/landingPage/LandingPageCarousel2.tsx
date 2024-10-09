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
        variant: "carouselPrimary",
        text: "View All Materials",
        navigateTo: "/materials",
      },
      {
        variant: "carouselOutline",
        text: "Contact Us",
        navigateTo: "/contact",
      },
    ],
    image: null,
  },
  {
    logo: "/logo_stoneyard.svg",
    subheader: "Stoneyard",
    description:
      "We specialize in providing natural stone products for construction and landscaping purposes. Our stone may be used in various applications like building facades, countertops, and retaining walls. Our high quality natural stone products can enhance any project design.",
    buttons: [
      {
        // variant: "default",
        text: "View Materials",
        navigateTo: "/contact",
      },
    ],
    image: "/image_carousel_stoneyard.png", // Replace with your actual image path
  },
  {
    logo: "/logo_mrc.svg",
    subheader: "MRC Rock & Sand",
    description:
      "Our main business is to supply a range of aggregates for the construction industry. We operate quarries, processing facilities and have a range of portable equipment to provide services for various projects.",
    buttons: [
      {
        // variant: "default",
        text: "View Materials",
        navigateTo: "/contact",
      },
      {
        // variant: "carouselOutline",
        text: "View Services",
        navigateTo: "/about",
      },
    ],
    image: "/about_us_timeline.png", // Replace with your actual image path
  },
  {
    logo: "/logo_spm.svg",
    subheader: "Santa Paula Materials",
    description:
      "We specialize in the demolition and recycling of building materials. We can take materials such as concrete, asphalt dirt and rock. We then break the materials down to offer products like crushed miscellaneous base.",
    buttons: [
      {
        // variant: "carouselPrimary",
        text: "View Materials",
        navigateTo: "/contact",
      },
      {
        // variant: "carouselOutline",
        text: "View Services",
        navigateTo: "/about",
      },
    ],
    image: "/image_carousel_spm.png", // Replace with your actual image path
  },
];

export default function LandingPageCarousel2() {
  const [currentSlide, setCurrentSlide] = useState(-1);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Set up a resize event listener to track window width changes
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Attach the event listener on mount
    window.addEventListener("resize", handleResize);

    // Remove the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    "carouselOutline",
    "carouselPrimary",
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
                className={`${currentSlide === 2 || currentSlide === 3 || currentSlide === 4 ? styles.noPadding : ""} ${styles.carouselItem}`}
              >
                {index === 0 ? (
                  <div className={styles.uniqueContentContainer}>
                    <div className={styles.uniqueHeader}>
                      <span className="flex">{slide.header}</span>
                      <div className="flex flex-row min-[857px]:items-center max-[856px]:flex-col">
                        <span>{slide.subheader}</span>
                        <div className={styles.sliderContainer}>
                          <Slider />
                        </div>
                      </div>
                    </div>
                    <p className={styles.uniqueDescription}>
                      {slide.description}
                    </p>
                    <div className={styles.uniqueButtonContainer}>
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
                      <Image alt="" src={slide.logo} width={56} height={24} />
                      <div className={styles.headerContainer}>
                        {/* <span>{slide.header}</span> */}
                        <span>{slide.subheader}</span>
                      </div>
                      <p className={styles.description}>{slide.description}</p>
                      <div className={styles.buttonContainer}>
                        {slide.buttons.map((button, btnIndex) => {
                          console.log(
                            `Button Index: ${btnIndex}, Button Text: ${button.text}`,
                          );
                          let variant = button.variant; // Default to the button's specified variant
                          if (isMounted) {
                            const isSmallScreen = windowWidth <= 900;
                            const isLargeScreen = windowWidth > 900;

                            if (
                              isSmallScreen &&
                              currentSlide !== 1 &&
                              btnIndex === 0
                            ) {
                              variant = "default"; // For small screens on the first button when currentSlide is not 1
                            } else if (btnIndex === 1 && isLargeScreen) {
                              variant = "outline"; // For large screens on the second button
                            } else if (btnIndex === 1 && isSmallScreen) {
                              variant = "carouselOutline"; // Second button on any screen size
                            } else if (btnIndex === 0 && isLargeScreen) {
                              variant = "default";
                            }
                          }

                          // Fall back to valid variants or default to "outline"
                          // if (
                          //   !validVariants.includes(
                          //     variant as (typeof validVariants)[number],
                          //   )
                          // ) {
                          //   variant = "destructive";
                          // }

                          return (
                            <Button
                              key={btnIndex}
                              variant={variant}
                              size="default"
                              navigateTo={button.navigateTo}
                            >
                              {button.text}
                            </Button>
                          );
                        })}
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
