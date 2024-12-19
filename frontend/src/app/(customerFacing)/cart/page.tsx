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
  <div className=" py-[40px]">
    {HOWTOUSE.map((item, index) => (
      <div key={index} className="mb-[30px]">
        <h2 className="font-bold text-xl text-primary">{item.title}</h2>
        <p className="text-secondary-text">{item.content}</p>
      </div>
    ))}
    <Button className="w-full">Contact Us</Button>
  </div>
);

const QuantityInput = ({ value, handleIncrease, handleDecrease, index }) => {
  // console.log("QuantityInput value:", value);

  return (
    <div className={style.quantityContainer}>
      <span>Quantity (Per Ton)</span>
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
            <div key={index} className={style.cartItemContainer}>
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

              <div className="flex flex-col">
                {item?.category ? (
                  <div className={style.cartItemDetail}>
                    <h3>
                      Category
                      <span className="ml-2 text-primary">
                        {item?.category}
                      </span>
                    </h3>
                    <h3>
                      Size
                      <span className="ml-2 text-primary">{item?.size}</span>
                    </h3>
                  </div>
                ) : (
                  <></>
                )}

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
                className="w-fit p-0 mt-2 italic"
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
  const [openAccordion, setOpenAccordion] = useState("item-1");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const items = localStorage.getItem("cartItems");
      const parsedItems = items ? JSON.parse(items) : [];
      setCartItems(parsedItems);
      if (items.length > 0) {
        setOpenAccordion("item-2");
      }
    }
  }, []);

  return (
    <>
      <h1 className={style.header}>Request to Quote</h1>
      <div className={style.container}>
        <Accordion
          type="single"
          collapsible
          value={openAccordion} // Controlled state
          onValueChange={setOpenAccordion}
          className="max-[1306px]:w-full flex-1"
        >
          <AccordionItem value="item-1" className="min-[1306px]:hidden">
            <AccordionTrigger className={style.AccordionTrigger}>
              How to use
            </AccordionTrigger>
            <AccordionContent>
              <HowToUseSection />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className={style.AccordionTrigger}>
              Cart
            </AccordionTrigger>
            <AccordionContent>
              <Cart cartItems={cartItems} setCartItems={setCartItems} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className={style.AccordionTrigger}>
              Contact Information
            </AccordionTrigger>
            <AccordionContent>
              <div className={style.padding}>
                <ContactForm2 cartItems={cartItems} />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex-1 max-[1306px]:hidden">
          <h2 className={style.howToText}>How to use</h2>
          <div className={style.howToContainer}>
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
