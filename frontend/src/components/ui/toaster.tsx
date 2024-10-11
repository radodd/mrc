"use client";

import Image from "next/image";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "../../components/ui/toast";
import { useToast } from "../../components/ui/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, src, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex flex-col items-center gap-10">
              <div className="bg-primary-dark w-[88px] h-[88px] flex justify-center rounded-full">
                <Image alt="" src={src} width={48} height={48} />
              </div>
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
              <div className="flex gap-2">
                <Image
                  src="/phone(black).svg"
                  width={33}
                  height={33}
                  alt="phone"
                />
                <p className="font-bold text-primary-text tracking-[-0.8px]">
                  (805) 524 - 5569
                </p>
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport className="" />
    </ToastProvider>
  );
}
