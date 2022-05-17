import { Test, TestingModule } from '@nestjs/testing';
import { AmountsController } from './amounts.controller';
import { AmountsService } from './amounts.service';

describe('AmountsController', () => {
  let controller: AmountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AmountsController],
      providers: [AmountsService],
    }).compile();

    controller = module.get<AmountsController>(AmountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
