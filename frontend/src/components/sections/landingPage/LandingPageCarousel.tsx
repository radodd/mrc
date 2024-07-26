import { Button } from "../../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";

// import styles from "../../scss/HeroAnimation.module.scss";
import SliderAnimation from "../../SliderAnimation";
import Slider from "../../SliderAnimation";

import styles from "../../scss/LandingPageCarousel.module.scss";

export default function LandingPageCarousel() {
  return (
    <div className="bg-tanbase">
      <Carousel className={styles.carousel}>
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

                {/* <SliderAnimation /> */}
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
    </div>
  );
}
