import { Test, TestingModule } from '@nestjs/testing';
import { MastersController } from './masters.controller';
import { MastersService } from './masters.service';

describe('MastersController', () => {
  let controller: MastersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MastersController],
      providers: [MastersService],
    }).compile();

    controller = module.get<MastersController>(MastersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
