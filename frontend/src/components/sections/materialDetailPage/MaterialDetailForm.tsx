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

interface FormProps {
  product: ProductCardProps;
}

const formSchema = z.object({
  name: z.string(),
  image: z.string(),
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product.name,
      image: product.image_primary,
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
    console.log(values);

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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
        <CategorySelect product={product} form={form} />
        <SizeSelect
          product={product}
          form={form}
          selectedCategory={form.watch("category")}
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
        <Button type="submit" className={styles.submitButton}>
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
}

const CategorySelect = ({ product, form }: SelectProps) => (
  <FormField
    control={form.control}
    name="category"
    render={({ field }) => (
      <FormItem>
        <FormLabel className={styles.formLabel}>Category:</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger className={styles.selectTrigger}>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {product.category?.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormItem>
    )}
  />
);

const SizeSelect = ({ product, form, selectedCategory }: SelectProps) => (
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
            {product.size?.map((sz) => (
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

// interface QuantityInputProps {
//   quantity: string;
//   onDecrement: () => void;
//   onIncrement: () => void;
//   onChange: (e: ChangeEvent<HTMLInputElement>) => void;
// }

// const QuantityInput = ({
//   quantity,
//   onDecrement,
//   onIncrement,
//   onChange,
// }: QuantityInputProps) => (
//   <FormField
//     name="quantity"
//     render={({ field }) => (
//       <FormItem className={styles.formItem}>
//         <FormLabel className={styles.formLabel}>Quantity (Per Ton)</FormLabel>
//         <div className={styles.quantityToggleContainer}>
//           <Button
//             type="button"
//             variant="quantity"
//             size="quantity"
//             onClick={onDecrement}
//           >
//             <DecrementIcon color="hsl(var(--icon))" size={12} />
//           </Button>
//           <FormControl>
//             <Input
//               {...field}
//               value={quantity}
//               onChange={(e) => {
//                 field.onChange(e);
//                 onChange(e);
//               }}
//               className={styles.Input}
//             />
//           </FormControl>
//           <Button
//             type="button"
//             variant="quantity"
//             size="quantity"
//             onClick={onIncrement}
//           >
//             <IncrementIcon color="hsl(var(--icon))" size={12} />
//           </Button>
//         </div>
//         <FormMessage />
//       </FormItem>
//     )}
//   />
// );
