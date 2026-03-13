import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { jest } from '@jest/globals';
describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const productsServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  } as jest.Mocked<ProductsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{ provide: ProductsService, useValue: productsServiceMock }],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
