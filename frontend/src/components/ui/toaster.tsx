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
              <Image alt="" src={src} width={88} height={88} className="" />
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
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
