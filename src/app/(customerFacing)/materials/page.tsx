import db from "@/app/db/db";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilters } from "@/components/ProductFilters";
import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import Link from "next/link";

function getAllProducts() {
  return db.product.findMany();
}

export default function MaterialsPage() {
  return (
    <>
      <div>
        <ProductFilters />
        <ProductGridSection
          title="Materials"
          productsFetcher={getAllProducts}
        />
      </div>
    </>
  );
}

type ProductGridSectionProps = {
  productsFetcher: () => Promise<Product[]>;
  title: string;
};

async function ProductGridSection({
  productsFetcher,
  title,
}: ProductGridSectionProps) {
  return (
    <>
      <h2 className="flex justify-center items-center text-3xl pb-[154px]">
        {title}
      </h2>
      <div className="flex space-y-3 justify-end items-end">
        <div className="flex flex-col gap-4">
          {/* <Button asChild>
          <Link href="/">View More</Link>
        </Button> */}
          {(await productsFetcher()).map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </>
  );
}
