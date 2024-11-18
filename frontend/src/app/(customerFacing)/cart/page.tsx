"use client";

import { HOWTOUSE } from "../../../../../index";
import ContactForm from "../../../components/form/ContactForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";
import { Button } from "../../../components/ui/button";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Input } from "../../../components/ui/input";
import Image from "next/image";

import style from "../../../components/scss/CartPage.module.scss";
import ContactForm2 from "../../../components/form/ContactForm2";

const HowToUseSection = () => (
  <>
    {HOWTOUSE.map((item, index) => (
      <div key={index} className="mb-[30px]">
        <h2 className="font-bold text-xl text-primary">{item.title}</h2>
        <p className="text-secondary-text">{item.content}</p>
      </div>
    ))}
    <Button className="w-full">Contact Us</Button>
  </>
);

const QuantityInput = ({ value, onIncrease, onDecrease }) => {
  console.log("QuantityInput value:", value);

  return (
    <div className="flex flex-col items-start gap-[16px]">
      <span className="text-primary-text text-[20px]">Quantity (Per Ton)</span>
      <div className="flex gap-4">
        <Button
          variant="quantityCart"
          size="quantityCart"
          onClick={onDecrease}
          disabled={value <= 1}
        >
          -
        </Button>

        <Input readOnly type="number" value={value} className={style.input} />
        <Button
          variant="quantityCart"
          size="quantityCart"
          onClick={() => {
            console.log("Increase button clicked. Current value:", value);
            onIncrease();
          }}
        >
          +
        </Button>
      </div>
    </div>
  );
};

const Cart = ({ cartItems, setCartItems }) => {
  const methods = useForm();
  // const { control } = useForm();
  const { control, setValue } = methods;
  // const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const items = localStorage.getItem("cartItems");
      const parsedItems = items ? JSON.parse(items) : [];
      setCartItems(parsedItems);
      // Initialize form with the cart items
      parsedItems.forEach((item, index) => {
        setValue(`cartItems[${index}].quantity`, item.quantity); // Set default value for each item
      });
    }
  }, [setValue]);

  const handleQuantityChange = (index, newQuantity) => {
    const updatedCartItems = cartItems.map((item, i) =>
      i === index ? { ...item, quantity: newQuantity } : item,
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const handleIncrease = (index, fieldValue) => {
    console.log(
      `Increasing quantity for index ${index}. Current value: ${fieldValue}`,
    );

    const newQuantity = fieldValue + 1;
    console.log(`New quantity: ${newQuantity}`);

    setValue(`cartItems[${index}].quantity`, newQuantity); // Update form value
    handleQuantityChange(index, newQuantity); // Update local state
  };

  const handleDecrease = (index, fieldValue) => {
    if (fieldValue > 1) {
      console.log(
        `Decreasing quantity for index ${index}. Current value: ${fieldValue}`,
      );

      const newQuantity = fieldValue - 1;
      console.log(`New quantity: ${newQuantity}`);

      setValue(`cartItems[${index}].quantity`, newQuantity); // Update form value
      handleQuantityChange(index, newQuantity); // Update local state
    }
  };

  const handleDelete = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  return (
    <FormProvider {...methods}>
      <div>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col p-6 gap-6 border-t-[3px] border-icon"
            >
              <div className={style.imageContainer}>
                <Image
                  src={item.image}
                  alt=""
                  width={500}
                  height={500}
                  className={style.image}
                />
              </div>

              <h1>{item.name}</h1>

              <div className="flex flex-col gap-4">
                <span>
                  Category
                  <span className="ml-2 text-primary">{item.category}</span>
                </span>
                <span>
                  Size
                  <span className="ml-2 text-primary">{item.size}</span>
                </span>
                <div className="">
                  {/* add quantity input here */}
                  <Controller
                    name={`cartItems[${index}].quantity`}
                    control={control}
                    defaultValue={item.quantity}
                    render={({ field }) => {
                      console.log(
                        "Controller value for cartItem",
                        index,
                        ":",
                        field.value,
                      ); // Log field value
                      return (
                        <QuantityInput
                          value={field.value}
                          onIncrease={() => {
                            console.log(
                              "Increasing quantity for item",
                              index,
                              "Current value:",
                              field.value,
                            ); // Log current value when increase is triggered
                            handleIncrease(index, field.value);
                          }}
                          onDecrease={() => {
                            console.log(
                              "Decreasing quantity for item",
                              index,
                              "Current value:",
                              field.value,
                            ); // Log current value when decrease is triggered
                            handleDecrease(index, field.value);
                          }}
                        />
                      );
                    }}
                  />
                </div>
                <Button
                  variant="link"
                  className="w-fit p-0 italic"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p>Cart is empty.</p>
        )}
      </div>
    </FormProvider>
  );
};
export default function CartPage() {
  const [cartItems, setCartItems] = useState();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const items = localStorage.getItem("cartItems");
      setCartItems(items ? JSON.parse(items) : []);
    }
  }, []);

  return (
    <>
      <h1 className={style.header}>Request to Quote</h1>
      <div className={style.container}>
        <Accordion
          type="single"
          collapsible
          className="max-[1306px]:w-full flex-1"
        >
          <AccordionItem value="item-1" className="min-[1306px]:hidden">
            <AccordionTrigger className="text-blackbase">
              How to use
            </AccordionTrigger>
            <AccordionContent>
              <HowToUseSection />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-blackbase">Cart</AccordionTrigger>
            <AccordionContent>
              <Cart cartItems={cartItems} setCartItems={setCartItems} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Contact Information</AccordionTrigger>
            <AccordionContent>
              <ContactForm2 cartItems={cartItems} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex-1 max-[1306px]:hidden">
          <h2 className="font-bold text-xl text-primary mb-4">How to use</h2>
          <div>
            {HOWTOUSE.map((item, index) => (
              <div key={index} className="mb-8">
                <h2 className="font-bold text-xl text-primary">{item.title}</h2>
                <p className="text-secondary-text">{item.content}</p>
              </div>
            ))}
            <Button className="w-full mt-4">Contact Us</Button>
          </div>
        </div>
      </div>
    </>
  );
}
