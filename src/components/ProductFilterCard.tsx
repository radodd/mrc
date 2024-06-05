import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

type ProductFilterCardProps = {
  filter: string;
  onRemove: (filter: string) => void;
};
export function ProductFilterCard({
  filter,
  onRemove,
}: ProductFilterCardProps) {
  const handleClick = () => {
    onRemove(filter);
    console.log("onRemove", filter);
  };
  return (
    <>
      <div className=" flex gap-4">
        <Button
          variant="filter"
          size="filter"
          onClick={handleClick}
          className=""
        >
          {filter} X
        </Button>
        <Separator
          orientation="vertical"
          decorative={true}
          className="mr-4 translate-y-[-6px]"
        />
      </div>

      {/* <Card className="flex w-[907px]">
        <CardHeader className="gap-4">
          <CardTitle className="underline">{filter}</CardTitle>
        </CardHeader>
      </Card> */}
    </>
  );
}
