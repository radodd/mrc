import { RequestQuoteCards } from "../../../../..";
import { Button } from "../../ui/button";
import Image from "next/image";

import styles from "../../scss/RequestQuote.module.scss";

export default function RequestQuote() {
  return (
    <div className={styles.quoteContainer}>
      <div>
        <h1>Try out our Request to Quote</h1>
      </div>

      <div className={styles.cardContainer}>
        {RequestQuoteCards.map((card, index) => (
          <>
            <Card
              key={index}
              image={card.image}
              title={card.title}
              description={card.text}
            />
            <Image
              src="/dotted_arrow.svg"
              alt=""
              width={60}
              height={108}
              className={index % 2 !== 0 ? "last:hidden" : ""}
            />
          </>
        ))}
      </div>
    </div>
  );
}

const Card = ({ image, title, description }) => {
  return (
    <div className={styles.card}>
      <Image
        src={image}
        alt={title}
        className="justify-center flex "
        width={93}
        height={99}
      />
      <div className={styles.cardContent}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};
