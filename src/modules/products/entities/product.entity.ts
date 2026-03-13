import { Product as PrismaProduct } from '@prisma/client';

export class Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }

  static fromPrisma(product: PrismaProduct): Product {
    return new Product({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });
  }
}
