import { Test, TestingModule } from '@nestjs/testing';
import { LicenseKeysController } from './licenseKeys.controller';
import { LicenseKeysService } from './licenseKeys.service';

describe('LicenseKeysController', () => {
  let controller: LicenseKeysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LicenseKeysController],
      providers: [LicenseKeysService],
    }).compile();

    controller = module.get<LicenseKeysController>(LicenseKeysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
