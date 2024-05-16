import ContactUs from "@/components/sections/ContactUs";
import FamilyOwned from "@/components/sections/landingPage/FamilyOwned";
import GovAgencies from "@/components/sections/landingPage/GovAgencies";
import LandingPageCarousel from "@/components/sections/landingPage/LandingPageCarousel";
import NewsArticles from "@/components/sections/landingPage/NewsArticles";
import RequestQuote from "@/components/sections/landingPage/RequestQuote";
import WeSpecialize from "@/components/sections/landingPage/WeSpecialize";

export default function HomePage() {
  return (
    <>
      <LandingPageCarousel />
      <FamilyOwned />
      <RequestQuote />
      <GovAgencies />
      <NewsArticles />
      <WeSpecialize />
      <ContactUs />
    </>
  );
}

{
  /* TESTIMONIAL Section */
}
{
  /* <Carousel className="flex bg-slate-400 h-[365px] justify-center items-center my-[50px]">
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
      </Carousel> */
}
