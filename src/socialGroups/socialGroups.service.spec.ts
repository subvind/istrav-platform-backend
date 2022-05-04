import { Test, TestingModule } from '@nestjs/testing';
import { SocialGroupsService } from './socialGroups.service';

describe('SocialGroupsService', () => {
  let service: SocialGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialGroupsService],
    }).compile();

    service = module.get<SocialGroupsService>(SocialGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
