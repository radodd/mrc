import { ProductCardProps } from "@/app/(customerFacing)/materials/[id]/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

// const fetchProductById = async (
//   id: string,
// ): Promise<ProductCardProps | null> => {
//   const res = await fetch(`http://localhost:3030/products/${id}`);
//   if (!res.ok) {
//     return null;
//   }
//   return await res.json();
// };

interface FormProps {
  product: ProductCardProps;
}
export default function MaterialDetailForm({ product }: FormProps) {
  const [quantity, setQuantity] = useState("1");

  const decrementQty = () => {
    const updatedQty = Math.max(Number(quantity) - 1, 1).toString();
    setQuantity(updatedQty);
    return updatedQty;
  };
  const incrementQty = () => {
    const updatedQty = Math.max(Number(quantity) + 1).toString();
    setQuantity(updatedQty);
    return updatedQty;
  };
  const enterQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };

  const formSchema = z.object({
    category: z.string({
      required_error: "Please select one of the available categories.",
    }),
    size: z.string({
      required_error: "Please select one of the available sizes.",
    }),
    quantity: z.string().refine((val) => Number(val) > 0, {
      message: "BAD",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: "0",
    },
  });

  const {
    formState: { errors },
  } = form;
  console.log(errors);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-openSans text-[24px] m-0">
                  Category:
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className=" ">
                    <SelectTrigger className="w-full h-[56px] border-2 border-primary rounded-sm mt-4">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {product.category.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription
                  className={`${!errors.category ? "" : "hidden"} `}
                >
                  Select one of the available categories.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-openSans text-[24px]">
                  Size:
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full h-[56px]  border-2 border-primary rounded-sm">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {product.category.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription className={`${!errors.size ? "" : "hidden"} `}>
                  Select one of the available sizes.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-openSans text-[24px]">
                  Quantity (Per Ton)
                </FormLabel>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="quantity"
                    size="quantity"
                    onClick={() => {
                      field.onChange(decrementQty());
                    }}
                  >
                    <Image src="/minus.png" alt="" width={12} height={12} />
                  </Button>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      value={quantity}
                      onChange={(e) => {
                        field.onChange(e);
                        enterQty(e);
                      }}
                      className="w-[84px] h-14 text-center border-2 border-primary"
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="quantity"
                    size="quantity"
                    onClick={() => {
                      field.onChange(incrementQty());
                    }}
                  >
                    <Image src="/add.png" alt="" width={12} height={12} />
                  </Button>
                </div>

                <FormDescription
                  className={`${!errors.quantity ? "" : "hidden"} `}
                >
                  Select one of the available sizes.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">
            <Image
              src="/shopping_cart.svg"
              alt=""
              width={32}
              height={22}
              className="pr-[10px]"
            />
            Request to Quote
          </Button>
        </form>
      </Form>
    </>
  );
}
