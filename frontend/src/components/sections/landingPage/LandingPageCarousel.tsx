import { Button } from "../../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import Image from "next/image";
import Link from "next/link";

import styles from "../../scss/HeroAnimation.module.scss";
import SliderAnimation from "../../SliderAnimation";

export default function LandingPageCarousel() {
  return (
    <Carousel className="section-padding bg-tanbase h-[605px] justify-center items-center">
      <CarouselContent className="">
        <CarouselItem className="flex bg-tanbase items-center justify-center">
          <div className="flex flex-col justify-start items-start gap-10">
            <div className="flex">
              <h1>Hello! We are </h1>
              {/* <SliderAnimation /> */}
            </div>
            {/* <div className="gap-10 inline-flex">
              <Link href="/">
                <Image src="/Nextjs.png" alt="" height={100} width={100} />
              </Link>
              <Link href="/">
                <Image src="/PostgreSQL.png" alt="" height={100} width={100} />
              </Link>
              <Link href="/">
                <Image src="/TailwindCss.png" alt="" height={100} width={100} />
              </Link>
            </div> */}
            <div className="self-stretch text-center text-secondary-foreground text-2xl font-normal max-w-[1200px]">
              We are a collection of companies here to service your construction
              needs.{" "}
            </div>
            <div className="gap-6 inline-flex">
              <Button variant="default" size="default" navigateTo="/materials">
                View Materials
              </Button>

              <Button variant="outline" size="default" navigateTo="contact">
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
  );
}
