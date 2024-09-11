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
            width={325}
            height={325}
            className={styles.image}
          />
        </div>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>{name}</CardTitle>
          <CardDescription className={styles.cardDescription}>
            {description}
          </CardDescription>
          <CardContent className={styles.cardContent}>
            <CardInfoRow label="Categories" value={category.join(", ")} />
            <CardInfoRow label="Color" value={color.join(", ")} />
            <CardInfoRow label="Company" value={company} />
          </CardContent>
        </CardHeader>
      </Card>
    </>
  );
}

type CardInfoRowProps = {
  label: string;
  value: string;
};

const CardInfoRow: React.FC<CardInfoRowProps> = ({ label, value }) => {
  return (
    <div className={styles.infoContainer}>
      <h3>{label}:</h3>
      <span>{value}</span>
    </div>
  );
};
