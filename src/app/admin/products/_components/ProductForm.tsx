"use client";

import { Label } from "@/components/ui/label";
// import { PageHeader } from "../../_components/PageHeader";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { addProduct } from "../_actions/products";
import { useFormState, useFormStatus } from "react-dom";
import { Product } from "@prisma/client";
import Image from "next/image";

export function ProductForm({ product }: { product?: Product | null }) {
  const [error, action] = useFormState(addProduct, {});

  // Default value for product if it's undefined
  const defaultProduct: Product = {
    id: "",
    name: "",
    imagePath: "",
    description: "",
    company: "",
  };

  // Use product or defaultProduct if product is undefined
  const productData = product || defaultProduct;

  return (
    <>
      <form action={action} className="space-y-8">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            required
            defaultValue={product?.name || ""}
          />
          {error.name && <div className="text-destructive">{error.name}</div>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            required
            defaultValue={product?.description || ""}
          />
          {error.description && (
            <div className="text-destructive">{error.description}</div>
          )}
        </div>
        <div className="space-y-4 flex flex-col">
          <Label htmlFor="company" className="space-x-2">
            Company
          </Label>
          <select
            id="company"
            name="company"
            required
            defaultValue={product?.company || ""}
          >
            <option value="">Select Company</option>
            <option value="MRC Rock & Sand">MRC Rock & Sand</option>
            <option value="Santa Paula Materials">Santa Paula Materials</option>
            <option value="Stoneyard">Stoneyard</option>
          </select>
          {error.company && (
            <div className="text-destructive">{error.company}</div>
          )}
        </div>
        {/* <div className="space-y-2">
          <Label htmlFor="category">Categories</Label>
          <Input type="text" id="category" name="category" required />
        </div> */}
        <div className="space-y-2">
          <Label htmlFor="image">Image</Label>
          <Input
            type="file"
            id="image"
            name="image"
            required={product === null}
          />
          {product !== null && product !== undefined && (
            <Image
              src={product.imagePath}
              alt="Product Image"
              height="400"
              width="400"
            />
          )}
          {error.image && <div className="text-destructive">{error.image}</div>}
        </div>
        <SubmitButton />
      </form>
    </>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
