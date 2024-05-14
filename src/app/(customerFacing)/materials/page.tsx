import db from "@/app/db/db";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import Link from "next/link";

function getAllProducts() {
  return db.product.findMany()
}



export default function MaterialsPage() {


  return (
    <>
      <div>
        <ProductGridSection title="All Products" productsFetcher={getAllProducts}/>
        </div>   
         </>
  );
}

type ProductGridSectionProps = {
  productsFetcher: () => Promise<Product[]>
  title: string
}

async function ProductGridSection({productsFetcher, title}:
  ProductGridSectionProps) {
    return (
 <div className="space-y-3">
      <div className="flex gap-4">
        <h2 className="text-3xl">{title}</h2>
        <Button asChild>
          <Link href="/">View More</Link>
        </Button>
        {(await productsFetcher()).map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
        
      </div>
    </div>
    )
   
  }