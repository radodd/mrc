import { Button } from "./ui/button";
import Image from "next/image";
import styles from "../components/scss/ProductFilterCards.module.scss";

type ProductFilterCardProps = {
  filter: string;
  onRemove?: (filter: string) => void;
};
export function ProductFilterCard({
  filter,
  onRemove,
}: ProductFilterCardProps) {
  const handleClick = () => {
    onRemove(filter);
  };

  return (
    <>
      <div className={styles.container}>
        <Button
          variant="otherFilter"
          size="filter"
          onClick={handleClick}
          className={styles.buttonDesktop}
        >
          {filter}
          {filter !== "All Materials" && (
            <Image
              src="/close.svg"
              alt=""
              width={12}
              height={12}
              className={styles.image}
            />
          )}
        </Button>
        <Button
          variant="filterMobile"
          size="filterMobile"
          onClick={handleClick}
          className={styles.buttonMobile}
        >
          {filter}
          {filter !== "All Materials" && (
            <div className={styles.imageContainer}>
              <Image
                src="/close.svg"
                alt=""
                width={12}
                height={12}
                className={styles.image}
              />
            </div>
          )}
        </Button>
      </div>
    </>
  );
}
