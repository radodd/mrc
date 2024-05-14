"use client";
// import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
// import { startTransition, useTransition } from "react";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { deleteProduct } from "../_actions/products";
import { useRouter } from "next/navigation";


// export function ActiveToggleDropdownItem({id}: {id: string}) {
//     const [isPending, startTransition] = useTransition()
//     return <DropdownMenuItem onClick={() => {
//         startTransition(async () => {
//             await toggleProductAvailabiliy(id, !isAvailableForPurchase)
//         })
//     }}></DropdownMenuItem>
// }

export function DeleteDropdownItem({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter()
  return (
    <DropdownMenuItem
    variant="destructive"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id);
          router.refresh()
        });
      }}
    >
      Delete
    </DropdownMenuItem>
  );
}
