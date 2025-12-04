import { z } from 'zod';

const ProductCategory = z.enum(['CHAIRS', 'CLOCKS', 'LAMPS', 'TABLES', 'ACCESSORIES']);

const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  price: z.number(),
  image: z.string(), // backend sends relative path
  description: z.string(),
  isFeatured: z.boolean().optional(), // backend doesn't send it
  stripePriceId: z.string().optional(),
  Category: ProductCategory,
  tags: z.array(z.string()),
});

const featuredSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.string(),
});

const orderItemSchema = z.object({
  id: z.string().uuid().optional(),
  quantity: z.number().int().min(1),
  price: z.number().int().nonnegative(),
  productId: z.string().uuid(),
  product: ProductSchema,
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const orderSchema = z.object({
  id: z.string().uuid().optional(),
  status: z.enum(['PENDING', 'COMPLETED', 'CANCELLED']),
  totalAmount: z.number().int().min(0),
  userId: z.string().uuid().nullable().optional(), // backend returns null
  items: z.array(orderItemSchema),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type ProductDto = z.infer<typeof ProductSchema>;
export type featuredDto = z.infer<typeof featuredSchema>;
export type orderDto = z.infer<typeof orderSchema>;
