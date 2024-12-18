"use client";

import { useForm } from "react-hook-form";
import { FormValues } from "./../../lib/formTypes";
import { sendFormData } from "./apiClient";
import { useToast } from "./../ui/use-toast";
import { useScreenSize } from "./../../lib/useScreenSize";
import { useState } from "react";

export const useContactForm = ({ cartItems }) => {
  const { toast } = useToast();
  const isScreenSmall = useScreenSize(430);
  const [openModal, setOpenModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      position: "",
      company: "",
      message: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (formData: FormValues) => {
    try {
      const payload = {
        ...formData,
        cartItems,
      };
      const result = await sendFormData(payload);
      console.log("Form data and cart data:", payload);

      if (!result.success) {
        console.error("Error sending email:", result.error);
      } else {
        if (isScreenSmall) {
          setOpenModal(true);
        } else {
          toast({
            title: "Submitted",
            description:
              "Thank you for your inquiry! We have received your message and will respond within 24 hours.",
            src: "/Group 271.svg",
          });
        }
        reset();
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    openModal,
    setOpenModal,
    isScreenSmall,
  };
};

export default useContactForm;
