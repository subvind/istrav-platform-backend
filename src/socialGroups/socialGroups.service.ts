import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { CreateSocialGroupDto } from './dto/create-socialGroup.dto';
import { UpdateSocialGroupDto } from './dto/update-socialGroup.dto';

import { SocialGroup } from './entities/socialGroup.entity';
import { Website } from '../websites/entities/website.entity';

async function findIdByName (that, domainName) {
  // // find account by given email
  // const account = await this.accountsRepository.findOne({
  //   select: ["id"],
  //   where: {
  //     email: email
  //   }
  // })

  // find website & tenant by given domainName
  const website = await that.websitesRepository.findOne({
    select: ["id"],
    relations: {
      tenant: true
    },
    where: {
      domainName: domainName
    }
  })

  return { 
    // account,
    website, 
    tenant: website.tenant
  }
}

@Injectable()
export class SocialGroupsService {
  constructor(
    public eventEmitter: EventEmitter2,
    @InjectRepository(SocialGroup)
    private readonly socialGroupsRepository: Repository<SocialGroup>,
    @InjectRepository(Website)
    private readonly websitesRepository: Repository<Website>,
  ) {}

  // register
  async create(createSocialGroupDto: CreateSocialGroupDto): Promise<SocialGroup> {
    let config = await findIdByName(
      this,
      createSocialGroupDto.domainName
    )

    const socialGroup = new SocialGroup();
    socialGroup.subdomain = createSocialGroupDto.subdomain;
    socialGroup.displayName = createSocialGroupDto.displayName;
    socialGroup.ownerId = createSocialGroupDto.ownerId;
    socialGroup.websiteId = config.website.id;
    socialGroup.tenantId = config.tenant.id;

    return this.socialGroupsRepository.save(socialGroup)
  }

  async update(updateSocialGroupDto: UpdateSocialGroupDto): Promise<SocialGroup> {
    let config = await findIdByName(
      this,
      updateSocialGroupDto.domainName
    )

    const socialGroup = new SocialGroup();
    socialGroup.id = updateSocialGroupDto.id;
    socialGroup.subdomain = updateSocialGroupDto.subdomain;
    socialGroup.displayName = updateSocialGroupDto.displayName;
    socialGroup.ownerId = updateSocialGroupDto.ownerId;
    socialGroup.websiteId = config.website.id;
    socialGroup.tenantId = config.tenant.id;

    await this.socialGroupsRepository.update(socialGroup.id, socialGroup)
    return this.socialGroupsRepository.findOneBy({ id: socialGroup.id });
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