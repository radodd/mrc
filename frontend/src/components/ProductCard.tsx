import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";

import styles from "../components/scss/ProductCard.module.scss";

type ProductCardProps = {
  id: string;
  name: string;
  description: string;
  image_primary: string;
  imagePath: string;
  company: string;
  color: string[];
  category: string[];
};
export function ProductCard({
  id,
  name,
  description,
  image_primary,
  imagePath,
  company,
  color,
  category,
}: ProductCardProps) {
  return (
    <>
      <Separator
        orientation="horizontal"
        decorative={true}
        className={styles.separator}
      />
      <Card className={styles.card}>
        <div className={styles.imageWrapper}>
          <Image
            src={image_primary}
            alt={name}
            // width={325}
            // height={325}
            layout="responsive"
            // fill
            width={325}
            height={325}
            style={{ objectFit: "cover" }}
            className={styles.image}
          />
        </div>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>{name}</CardTitle>
          <CardDescription className={styles.CardDescription}>
            {description}
          </CardDescription>
          <CardContent className="flex flex-col gap-4">
            <div className="items-center gap-1">
              <p className="">
                <h3 className="inline-flex mr-2"> Categories:</h3>
                {category.join(", ")}
              </p>
            </div>
            <div className="items-center gap-1">
              <p className="">
                <h3 className="inline-flex mr-2"> Colors:</h3>
                {color.join(", ")}
              </p>
            </div>
            <div className="items-center gap-1">
              <p className="">
                <h3 className="inline-flex mr-2"> Company:</h3>
                {company}
              </p>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </>
  );
}
