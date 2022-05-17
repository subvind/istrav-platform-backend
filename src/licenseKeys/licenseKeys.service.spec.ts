import { Test, TestingModule } from '@nestjs/testing';
import { LicenseKeysService } from './licenseKeys.service';

describe('LicenseKeysService', () => {
  let service: LicenseKeysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LicenseKeysService],
    }).compile();

    service = module.get<LicenseKeysService>(LicenseKeysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
