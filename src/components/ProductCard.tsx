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
};
export function ProductCard({
  id,
  name,
  description,
  imagePath,
}: ProductCardProps) {
  return (
    <Card>
      <div className="relative w-full h-auto aspect-video">
        <Image src={imagePath} fill alt={name} />
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardContent className="flex-grow">
          <p className="line-clamp-4">{description}</p>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
