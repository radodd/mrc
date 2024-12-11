// import { ProductCardProps } from "../../../app/(customerFacing)/materials/[id]/page";
import { Button } from "../../ui/button";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductCardProps } from "../../../app/(customerFacing)/materials/[id]/page";
import ShoppingCartIcon from "../../icons/ShoppingCartIcon";
import QuantityInput from "../../QuantityInput";

import styles from "../../scss/MaterialDetailForm.module.scss";
import { useState } from "react";

interface FormProps {
  product: ProductCardProps;
}

const formSchema = z.object({
  name: z.string(),
  image: z.string().nullable(),
  category: z.string({
    required_error: "Please select one of the available categories.",
  }),
  size: z.string({
    required_error: "Please select one of the available sizes.",
  }),
  quantity: z.string().refine((val) => Number(val) > 0, {
    message: "Quantity must be greater than zero.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function MaterialDetailForm({ product }: FormProps) {
  // const [quantity, setQuantity] = useState("1");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product.name,
      image: product.imagePrimary,
      category: "",
      size: "",
      quantity: "1",
    },
  });

  // const adjustQuantity = (amount: number) => {
  //   const newQuantity = Math.max(Number(quantity) + amount, 1).toString();
  //   setQuantity(newQuantity);
  //   form.setValue("quantity", newQuantity);
  // };

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    console.log("Form Errors:", form.formState.errors);

    console.log(values);
    console.log("Form Values Before Submit:", form.getValues());

    const formDataJSON = {
      name: values.name,
      image: values.image,
      category: values.category,
      size: values.size,
      quantity: values.quantity,
    };

    const cart = localStorage.getItem("cartItems");
    let cartList = cart ? JSON.parse(cart) : [];
    if (!Array.isArray(cartList)) {
      cartList = [];
    }
    cartList.push(formDataJSON);
    localStorage.setItem("cartItems", JSON.stringify(cartList));
    console.log("Form Data JSON:", formDataJSON);
  };

  const handleQuantityChange = (newQuantity: string) => {
    form.setValue("quantity", newQuantity); // Update the quantity in the form state
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    form.setValue("category", category);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
        <CategorySelect
          product={product}
          form={form}
          onCategoryChange={handleCategoryChange}
        />
        <SizeSelect
          product={product}
          form={form}
          // selectedCategory={form.watch("category")}
          selectedCategory={selectedCategory}
        />
        <QuantityInput
          // quantity={quantity}
          // onDecrement={() => adjustQuantity(-1)}
          // onIncrement={() => adjustQuantity(1)}
          // onChange={(e) => setQuantity(e.target.value)}

          // initialQuantity={form.watch("quantity")}
          onQuantityChange={handleQuantityChange}
          control={form.control}
          variant="quantity"
        />
        <Button
          type="submit"
          onClick={() => console.log("Form Errors:", form.formState.errors)}
          className={styles.submitButton}
        >
          <ShoppingCartIcon color="hsl(var(--white-base))" size={22} />
          Request to Quote
        </Button>
      </form>
    </Form>
  );
}

interface SelectProps {
  product: ProductCardProps;
  form: ReturnType<typeof useForm<FormValues>>;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const CategorySelect = ({ product, form, onCategoryChange }: SelectProps) => {
  //   const categories = Array.isArray(product.category)
  //     ? product.category
  //     : product.category
  //     ? [product.category.name] // Extract `name` if it's an object
  //     : [];

  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel className={styles.formLabel}>Category:</FormLabel>
          {/* <Select onValueChange={field.onChange} defaultValue={field.value}> */}
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              onCategoryChange?.(value);
            }}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger className={styles.selectTrigger}>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {product.categories?.map((cat) => (
                <SelectItem key={cat.name} value={cat.name}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

const SizeSelect = ({ product, form, selectedCategory }: SelectProps) => {
  const selectedCategorySizes =
    selectedCategory &&
    product.categories.find((category) => category.name === selectedCategory)
      ?.sizes;

  // console.log("Selected Category Sizes:", selectedCategorySizes);

  return (
    <FormField
      control={form.control}
      name="size"
      render={({ field }) => (
        <FormItem>
          <FormLabel className={styles.formLabel}>Size:</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={!selectedCategory}
          >
            <FormControl>
              <SelectTrigger className={styles.selectTrigger}>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {selectedCategorySizes?.map((sz) => (
                <SelectItem key={sz} value={sz}>
                  {sz}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};
