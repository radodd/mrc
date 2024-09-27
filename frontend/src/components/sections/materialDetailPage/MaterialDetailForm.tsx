// import { ProductCardProps } from "../../../app/(customerFacing)/materials/[id]/page";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import styles from "../../scss/MaterialDetailForm.module.scss";
import { ProductCardProps } from "../../../app/materials/[id]/page";

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
        <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={styles.FormLabel}>Category:</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className={styles.SelectTrigger}>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {product.category?.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* <FormDescription
                  className={`${!errors.category ? "" : "hidden"} `}
                >
                  Select one of the available categories.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={styles.FormLabel}>Size:</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className={styles.SelectTrigger}>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {product.size?.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* <FormDescription className={`${!errors.size ? "" : "hidden"} `}>
                  Select one of the available sizes.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className={styles.FormItem}>
                <FormLabel className={styles.FormLabel}>
                  Quantity (Per Ton)
                </FormLabel>

                <div className={styles.quantityToggleContainer}>
                  <Button
                    type="button"
                    variant="quantity"
                    size="quantity"
                    onClick={() => {
                      field.onChange(decrementQty());
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <rect
                        x="12"
                        y="5"
                        width="2"
                        height="12"
                        rx="1"
                        transform="rotate(90 12 5)"
                        fill="#5C5D6D"
                      />
                    </svg>
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
                      className={styles.Input}
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <rect x="5" width="2" height="12" rx="1" fill="#5C5D6D" />
                      <rect
                        x="12"
                        y="5"
                        width="2"
                        height="12"
                        rx="1"
                        transform="rotate(90 12 5)"
                        fill="#5C5D6D"
                      />
                    </svg>
                  </Button>
                </div>

                {/* <FormDescription
                  className={`${!errors.quantity ? "" : "hidden"} `}
                >
                  Select one of the available sizes.
                </FormDescription> */}
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
