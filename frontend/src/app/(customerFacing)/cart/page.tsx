"use client";

import { HOWTOUSE } from "../../../../../index";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";
import { Button } from "../../../components/ui/button";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../../components/ui/input";
import Image from "next/image";
import LZString from "lz-string";

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

const QuantityInput = ({ value, handleIncrease, handleDecrease, index }) => {
  // console.log("QuantityInput value:", value);

  return (
    <div className="flex flex-col items-start gap-[16px]">
      <span className="text-primary-text text-[20px]">Quantity (Per Ton)</span>
      <div className="flex gap-4">
        <Button
          variant="quantityCart"
          size="quantityCart"
          onClick={() => handleDecrease(index)}
          disabled={value === 1}
        >
          -
        </Button>

        <Input readOnly type="number" value={value} className={style.input} />
        <Button
          variant="quantityCart"
          size="quantityCart"
          onClick={() => handleIncrease(index)}
        >
          +
        </Button>
      </div>
    </div>
  );
};

const Cart = ({ cartItems, setCartItems }) => {
  const methods = useForm();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      console.log("Stored Item", storedItems);

      const decompressedItems = storedItems
        .map((item) => {
          if (typeof item === "string") {
            const decompressedData = LZString.decompressFromUTF16(item);
            return decompressedData ? JSON.parse(decompressedData) : null;
          }
        })
        .filter((item) => item !== null);
      console.log("Decompressed Items", decompressedItems);
      setCartItems(decompressedItems);
    }
  }, [setCartItems]);

  const updateQuantity = (index, newQuantity) => {
    const updatedCart = cartItems.map((item, i) =>
      i === index ? { ...item, quantity: newQuantity } : item,
    );
    setCartItems(updatedCart);
    const compressedItems = updatedCart.map((item) =>
      LZString.compressToUTF16(JSON.stringify(item)),
    );
    localStorage.setItem("cartItems", JSON.stringify(compressedItems));
  };

  const handleIncrease = (index) => {
    const currentQuantity = parseInt(cartItems[index].quantity);
    const newQuantity = currentQuantity + 1;
    updateQuantity(index, newQuantity);
  };
  const handleDecrease = (index) => {
    const currentQuantity = parseInt(cartItems[index].quantity);
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      updateQuantity(index, newQuantity);
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
                  src={item?.image ? item.image : "/image_not_available.svg"}
                  alt=""
                  width={500}
                  height={500}
                  className={style.image}
                />
              </div>

              <h1>{item?.name}</h1>

              <div className="flex flex-col gap-4">
                <span>
                  Category
                  <span className="ml-2 text-primary">{item?.category}</span>
                </span>
                <span>
                  Size
                  <span className="ml-2 text-primary">{item?.size}</span>
                </span>
                <div className="quantity-controls">
                  <QuantityInput
                    index={index}
                    value={item?.quantity || 1}
                    handleIncrease={handleIncrease}
                    handleDecrease={handleDecrease}
                  />
                </div>
              </div>
              <Button
                variant="link"
                className="w-fit p-0 italic"
                onClick={() => handleDelete(index)}
              >
                Delete
              </Button>
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
