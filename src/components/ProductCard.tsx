import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type ProductCardProps = {
  id: string;
  name: string;
  description: string;
  imagePath: string;
  company: string;
};
export function ProductCard({
  id,
  name,
  description,
  imagePath,
  company,
}: ProductCardProps) {
  return (
    <Card className="flex w-[907px]">
      <div className="relative w-[325px] h-auto aspect-square">
        <Image src={imagePath} fill alt={name} />
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardContent className="flex-grow">
          <p className="line-clamp-4">{description}</p>
          <p>{company}</p>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
