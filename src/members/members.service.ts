import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

import { Member } from './entities/member.entity';
import { Website } from '../websites/entities/website.entity';
import { SocialGroup } from '../socialGroups/entities/socialGroup.entity';

async function findIdByName (subdomain, domainName) {
  // find website & tenant by given domainName
  const website = await this.websitesRepository.findOne({
    select: ["id", "tenant"],
    where: {
      domainName: domainName
    }
  })

  // find social group by given subdomain
  const socialGroup = await this.socialGroupsRepository.findOne({
    select: ["id"],
    where: {
      subdomain: subdomain,
      websiteId: website.id,
      tenantId: website.tenant.id
    }
  })


  return {
    website, 
    socialGroup,
    tenant: website.tenant
  }
}

@Injectable()
export class MembersService {
  constructor(
    public eventEmitter: EventEmitter2,
    @InjectRepository(Member)
    private readonly membersRepository: Repository<Member>,
    @InjectRepository(Website)
    private readonly websitesRepository: Repository<Website>,
    @InjectRepository(SocialGroup)
    private readonly socialGroupsRepository: Repository<SocialGroup>,
  ) {}

  // register
  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    let config = await findIdByName(
      createMemberDto.subdomain,
      createMemberDto.domainName
    )

    const member = new Member();
    member.userId = createMemberDto.userId;
    member.socialGroupId = config.socialGroup.id;
    member.websiteId = config.website.id;
    member.tenantId = config.tenant.id;

    return this.membersRepository.save(member)
  }

  async update(updateMemberDto: UpdateMemberDto): Promise<Member> {
    let config = await findIdByName(
      updateMemberDto.subdomain,
      updateMemberDto.domainName
    )

    const member = new Member();
    member.id = updateMemberDto.id;
    member.userId = updateMemberDto.userId;
    member.socialGroupId = config.socialGroup.id;
    member.websiteId = config.website.id;
    member.tenantId = config.tenant.id;

    return this.membersRepository.update({ id: member.id }, member).then(r => {
      return r.raw
    })
  }

  async findAll(): Promise<Member[]> {
    return this.membersRepository.find();
  }

  findOne(id: string): Promise<Member> {
    return this.membersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.membersRepository.delete(id);
  }

  // findOneWithHosts(id: string): Promise<Member> {
  //   return this.membersRepository.findOne(id, {
  //     relations: ["collaborations", "ownerships"]
  //   });
  // }
}