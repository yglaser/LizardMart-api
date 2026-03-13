import { Injectable } from '@nestjs/common';
import { Prisma, Product as PrismaProduct } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.ProductCreateInput): Promise<PrismaProduct> {
    return this.prisma.product.create({ data });
  }

  findAll(): Promise<PrismaProduct[]> {
    return this.prisma.product.findMany({ orderBy: { name: 'asc' } });
  }

  findById(id: string): Promise<PrismaProduct | null> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  update(id: string, data: Prisma.ProductUpdateInput): Promise<PrismaProduct> {
    return this.prisma.product.update({ where: { id }, data });
  }

  delete(id: string): Promise<PrismaProduct> {
    return this.prisma.product.delete({ where: { id } });
  }
}
