import { z } from 'zod';

const ProductCategory = z.enum(['CHAIRS', 'CLOCKS', 'LAMPS', 'TABLES', 'ACCESSORIES']);

const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  price: z.number(),
  image: z.string().url(),
  description: z.string(),
  isFeatured: z.boolean(),
  stripePriceId: z.string().optional(),
  Category: ProductCategory,
  tags: z.array(z.string()), // ✅ this is the correct tags type
});

const featuredSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.string().url(),
});

const orderItemSchema = z.object({
  id: z.string().uuid().optional(), // frontend usually optional
  name: z.string(),
  image: z.string().optional(),
  quantity: z.number().int().min(1),

  price: z.number().int().nonnegative(),
  productId: z.string().uuid(),
});
const orderSchema = z.object({
  id: z.string().uuid().optional(),
  status: z.enum(['PENDING', 'COMPLETED', 'CANCELLED']).default('PENDING'),
  totalAmount: z.number().int().min(0),
  userId: z.string().uuid().optional(), // optional same as Prisma
  items: z.array(orderItemSchema).min(1),
  createdAt: z.string().optional(), // ✔ ADD THIS
  updatedAt: z.string().optional(), // ✔ AND THIS
});

export type ProductDto = z.infer<typeof ProductSchema>;
export type featuredDto = z.infer<typeof featuredSchema>;
export type orderDto = z.infer<typeof orderSchema>;
