import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/carousel";

import styles from "../../scss/NewsArticles.module.scss";
import { Articles } from "../../../../..";

export default function NewsArticles() {
  return (
    <div className={styles.sectionContainer}>
      <h1>News Articles</h1>

      <div className="flex gap-6 justify-center max-[1305px]:hidden">
        {Articles.map((article, index) => (
          <div key={index} className={styles.articleContainer}>
            <div className={styles.imageContainer}>
              <Image src={article.image} alt="" width={325} height={230} />
            </div>
            <div className={styles.textContainer}>
              <h1>{article.title}</h1>
              <p>{article.content}</p>
            </div>
          </div>
        ))}
      </div>

      <Carousel className="min-[1305px]:hidden">
        <CarouselContent>
          {Articles.map((article, index) => (
            <CarouselItem>
              <div key={index} className={styles.articleContainer}>
                <div className={styles.imageContainer}>
                  <Image src={article.image} alt="" width={325} height={230} />
                </div>
                <div className={styles.textContainer}>
                  <h1>{article.title}</h1>
                  <p>{article.content}</p>
                </div>
              </div>{" "}
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute top-[-100px] right-0 min-w-[90px] min-h-[70px]">
          <CarouselPrevious className={styles.prev} />
          <CarouselNext className={styles.next} />
        </div>
      </Carousel>
    </div>
  );
}
