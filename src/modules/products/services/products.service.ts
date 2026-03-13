import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';
import { ProductsRepository } from '../repositories/products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async create(dto: CreateProductDto): Promise<Product> {
    const product = await this.productsRepository.create({
      name: dto.name,
      description: dto.description,
      price: dto.price,
      stock: dto.stock,
    });

    return Product.fromPrisma(product);
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productsRepository.findAll();
    return products.map((product) => Product.fromPrisma(product));
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.ensureExists(id);
    return Product.fromPrisma(product);
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    await this.ensureExists(id);

    const data: Prisma.ProductUpdateInput = {};
    if (dto.name !== undefined) {
      data.name = dto.name;
    }
    if (dto.description !== undefined) {
      data.description = dto.description;
    }
    if (dto.price !== undefined) {
      data.price = dto.price;
    }
    if (dto.stock !== undefined) {
      data.stock = dto.stock;
    }

    if (Object.keys(data).length === 0) {
      throw new BadRequestException(
        'At least one field must be provided to update a product',
      );
    }

    const updated = await this.productsRepository.update(id, data);
    return Product.fromPrisma(updated);
  }

  async remove(id: string): Promise<Product> {
    await this.ensureExists(id);
    const deleted = await this.productsRepository.delete(id);
    return Product.fromPrisma(deleted);
  }

  private async ensureExists(id: string) {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with id "${id}" not found`);
    }

    return product;
  }
}
