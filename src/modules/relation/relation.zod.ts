import z from "zod";

export const relationSchema = z.object({

    userId: z.number().positive(),
    roadId: z.number().positive(),
    addressId: z.number().positive(),
});

export const updateRelationSchema = relationSchema.partial();
