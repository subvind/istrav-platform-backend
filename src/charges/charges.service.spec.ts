import { Test, TestingModule } from '@nestjs/testing';
import { ChargesService } from './charges.service';

describe('ChargesService', () => {
  let service: ChargesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChargesService],
    }).compile();

    service = module.get<ChargesService>(ChargesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
