"use client";

import { Label } from "@/components/ui/label";
import { PageHeader } from "../../_components/Pageheader";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { addProduct } from "../_actions/products";
import { useFormState, useFormStatus } from "react-dom";

export function ProductForm() {
  const [error, action] = useFormState(addProduct, {});
  return (
    <>
      <form action={action} className="space-y-8">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" name="name" required />
          {error.name && <div className="text-destructive">{error.name}</div>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" required />
          {error.description && (
            <div className="text-destructive">{error.description}</div>
          )}
        </div>
        {/* <div className="space-y-2">
          <Label htmlFor="category">Categories</Label>
          <Input type="text" id="category" name="category" required />
        </div> */}
        <div className="space-y-2">
          <Label htmlFor="image">Image</Label>
          <Input type="file" id="image" name="image" required />
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
