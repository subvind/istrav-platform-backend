import { Test, TestingModule } from '@nestjs/testing';
import { AmountsService } from './amounts.service';

describe('AmountsService', () => {
  let service: AmountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmountsService],
    }).compile();

    service = module.get<AmountsService>(AmountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
