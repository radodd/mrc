import { z } from "zod";

export const AVAILABLE_COMPANIES = ["mrc", "spm", "stoneyard"] as const;

export const AVAILABLE_SORT = ["none", "name-asc", "name-desc"] as const;

export const ProductFilterValidator = z.object({
  company: z.array(z.enum(AVAILABLE_COMPANIES)),
  sort: z.enum(AVAILABLE_SORT),
});

export type ProductState = z.infer<typeof ProductFilterValidator>;
