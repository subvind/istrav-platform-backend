import { Test, TestingModule } from '@nestjs/testing';
import { SocialGroupsController } from './socialGroups.controller';
import { SocialGroupsService } from './socialGroups.service';

describe('SocialGroupsController', () => {
  let controller: SocialGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocialGroupsController],
      providers: [SocialGroupsService],
    }).compile();

    controller = module.get<SocialGroupsController>(SocialGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
