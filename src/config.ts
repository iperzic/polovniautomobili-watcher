import { z } from 'zod';

export const configSchema = z.object({
    brand: z.string().optional(),
    model: z.array(z.string()).optional(),
    brand2: z.string().optional(),
    model2: z.array(z.string()).optional(),
    price_from: z.number().gte(0).int().optional(),
    price_to: z.number().gte(0).int().optional(),
    year_from: z.number().gte(0).int().optional(),
    year_to: z.number().gte(0).int().optional(),
});

export type Config = z.infer<typeof configSchema>;
