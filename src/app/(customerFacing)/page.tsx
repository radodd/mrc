import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function HomePage() {
  return (
    <>
      <h1>Hello</h1>
      {/* HERO Section Carousel */}
      <Carousel className="flex bg-slate-400 h-[605px] justify-center items-center">
        <CarouselContent className=" h-[400px]">
          <CarouselItem className="flex bg-slate-600 items-center justify-center">
            MRC ROCK
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

      {/* TESTIMONIAL Section */}

      <Carousel className="flex bg-slate-400 h-[365px] justify-center items-center my-[50px]">
        <CarouselContent className="">
          <CarouselItem className="flex bg-slate-600 items-center justify-center">
            &quot;Working with MRC Rock & Sand was an absolute pleasure! Their
            team&apos;s dedication to quality and customer satisfaction is
            unmatched. From start to finish, they provided top-notch service and
            delivered exceptional materials for our construction project. We
            couldn&apos;t be happier with the results and highly recommend MRC
            Rock & Sand to anyone in need of reliable and high-quality rock and
            sand materials.&quot;
          </CarouselItem>
          <CarouselItem className="flex bg-slate-600 items-center justify-center">
            A STELLAR REVIEW
          </CarouselItem>
          <CarouselItem className="flex bg-slate-600 items-center justify-center">
            ANOTHER STELLAR REVIEDW
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* TRY OUT REQUEST TO QUOTE */}
      <div className="flex">
        <div className="grow">
          <h1>Try out our Request to Quote</h1>
          <p className="w-[600px]">
            Our request to quote feature allows you to add materials you are
            interested in buying from us into a cart. Once you have added all
            materials you are interested in, submit your cart, and someone from
            our companies will reach out to you within 48 hours to let you know
            how much each material costs.
          </p>
          <Button>View Our Materials</Button>
        </div>
        <div className="grow">
          <div className="flex justify-center items-center h-[605px] border-2 border-red-400">
            A LARGE IMAGE HERE
          </div>
        </div>
      </div>

      {/* GOV AGENCIES */}

      <h1>Government Agencies We have partnered with</h1>
      <div className="my-[60px] flex gap-4">
        <div className="bg-slate-300 h-[234px] w-[324px]">
          <h2 className="">LOGO</h2>
        </div>
        <div className="bg-slate-300 h-[234px] w-[324px]">
          <h2 className="">LOGO</h2>
        </div>
        <div className="bg-slate-300 h-[234px] w-[324px]">
          <h2 className="">LOGO</h2>
        </div>
        <div className="bg-slate-300 h-[234px] w-[324px]">
          <h2 className="">LOGO</h2>
        </div>
      </div>

      {/* NEWS ARTICLES */}

      <h1>News Articles</h1>
      <div className="my-[60px] flex gap-4">
        <div className="bg-slate-300 h-[234px] w-[324px]">
          <h2 className="">IMAGE</h2>
        </div>
        <div className="w-[200px]">
          <h1>Natural History Museum</h1>
          <p>
            Lúthien ar rochathol an-uir uir velithil i'elvathren. Ithil ír
            anlínath ar arthelon i'nórello. Eldalië valinor ar nai quendi, ar
            thalion estel enwathiel arnanor. Aerlinn i'rína anweryn, hiril alda
            ristaer ar lúthalion úmenethel
          </p>
        </div>
        <div className="bg-slate-300 h-[234px] w-[324px]">
          <h2 className="">IMAGE</h2>
        </div>
        <div className="w-[200px]">
          <h1>Natural History Museum</h1>
          <p>
            Lúthien ar rochathol an-uir uir velithil i'elvathren. Ithil ír
            anlínath ar arthelon i'nórello. Eldalië valinor ar nai quendi, ar
            thalion estel enwathiel arnanor. Aerlinn i'rína anweryn, hiril alda
            ristaer ar lúthalion úmenethel
          </p>
        </div>
      </div>

      {/* CONTACT US */}

      <div className="h-[400px] py-[60px] bg-slate-300 flex gap-4 justify-center items-center">
        <div className="bg-slate-400 h-[300px] w-[400px]">
          <h1>IMGAGE</h1>
        </div>
        <div>
          <h1>Interested in working with us?</h1>
          <p>
            Lúthien i'elvathren, ithil arnath ar valinor. Aerlinn i'rína, hiril
            alda ar lúthalion."
          </p>
          <Button>Contact Us</Button>
        </div>
      </div>
    </>
  );
}
