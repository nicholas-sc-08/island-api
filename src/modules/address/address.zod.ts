import z from "zod";
import { Category } from "../../generated/prisma/index.js";

export const addressSchema = z.object({

    name: z.string(),
    image_url: z.string(),
    category: z.enum(Category),
    check: z.boolean()
});

export const updateAddressSchema = addressSchema.partial();