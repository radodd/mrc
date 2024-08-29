import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import Image from "next/image";

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
          className="flex items-center justify-center gap-4"
        >
          {filter}
          {filter !== "All Materials" && (
            <Image src="/close.svg" alt="" width={12} height={12} />
          )}
        </Button>
        <Separator
          orientation="vertical"
          decorative={true}
          className="mr-4 translate-y-[-6px]"
        />
      </div>
    </>
  );
}
