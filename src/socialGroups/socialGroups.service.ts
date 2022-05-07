import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { CreateSocialGroupDto } from './dto/create-socialGroup.dto';
import { UpdateSocialGroupDto } from './dto/update-socialGroup.dto';

import { SocialGroup } from './entities/socialGroup.entity';

@Injectable()
export class SocialGroupsService {
  constructor(
    public eventEmitter: EventEmitter2,
    @InjectRepository(SocialGroup)
    private readonly socialGroupsRepository: Repository<SocialGroup>
  ) {}

  // register
  create(createSocialGroupDto: CreateSocialGroupDto): Promise<SocialGroup> {
    const socialGroup = new SocialGroup();
    socialGroup.subdomain = createSocialGroupDto.subdomain;
    socialGroup.displayName = createSocialGroupDto.displayName;
    socialGroup.ownerId = createSocialGroupDto.ownerId;
    socialGroup.websiteId = createSocialGroupDto.websiteId;
    socialGroup.tenantId = createSocialGroupDto.tenantId;

    return this.socialGroupsRepository.save(socialGroup)
  }

  update(updateSocialGroupDto: UpdateSocialGroupDto): Promise<SocialGroup> {
    const socialGroup = new SocialGroup();
    socialGroup.id = updateSocialGroupDto.id;
    socialGroup.subdomain = updateSocialGroupDto.subdomain;
    socialGroup.displayName = updateSocialGroupDto.displayName;
    socialGroup.ownerId = updateSocialGroupDto.ownerId;
    socialGroup.websiteId = updateSocialGroupDto.websiteId;
    socialGroup.tenantId = updateSocialGroupDto.tenantId;

    return this.socialGroupsRepository.update({ id: socialGroup.id }, socialGroup).then(r => {
      return r.raw
    })
  }

  async findAll(): Promise<SocialGroup[]> {
    return this.socialGroupsRepository.find();
  }

  findOne(id: string): Promise<SocialGroup> {
    return this.socialGroupsRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.socialGroupsRepository.delete(id);
  }

  // findOneWithHosts(id: string): Promise<SocialGroup> {
  //   return this.socialGroupsRepository.findOne(id, {
  //     relations: ["collaborations", "ownerships"]
  //   });
  // }
}