import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";

type ProductCardProps = {
  id: string;
  name: string;
  description: string;
  imagePath: string;
  company: string;
  color: string[];
  category: string[];
};
export function ProductCard({
  id,
  name,
  description,
  imagePath,
  company,
  color,
  category,
}: ProductCardProps) {
  return (
    <>
      <Separator orientation="horizontal" decorative={true} />
      <Card className="flex w-[907px]">
        <div className="relative w-[325px] h-auto aspect-square">
          <Image src={imagePath} alt={name} width={325} height={325} />
        </div>
        <CardHeader className="gap-4">
          <CardTitle className="underline">{name}</CardTitle>
          <CardDescription className="max-w-[542px]">
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
