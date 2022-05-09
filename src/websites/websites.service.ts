import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { CreateWebsiteDto } from './dto/create-website.dto';
import { UpdateWebsiteDto } from './dto/update-website.dto';

import { Website } from './entities/website.entity';
import { Tenant } from '../tenants/entities/tenant.entity';

async function findIdByName (that, tenantReferenceId) {
  // find tenant by given tenantReferenceId
  const tenant = await that.tenantsRepository.findOne({
    select: ["id"],
    where: {
      referenceId: tenantReferenceId
    }
  })

  return { 
    tenant
  }
}

@Injectable()
export class WebsitesService {
  constructor(
    public eventEmitter: EventEmitter2,
    @InjectRepository(Website)
    private readonly websitesRepository: Repository<Website>,
    @InjectRepository(Tenant)
    private readonly tenantsRepository: Repository<Tenant>,
  ) {}

  // register
  async create(createWebsiteDto: CreateWebsiteDto): Promise<Website> {
    let config = await findIdByName(
      this,
      createWebsiteDto.tenantReferenceId,
    )

    const website = new Website();
    website.domainName = createWebsiteDto.domainName;
    website.displayName = createWebsiteDto.displayName;
    website.ownerId = createWebsiteDto.ownerId;
    website.tenantId = config.tenant.id;

    return this.websitesRepository.save(website)
  }

  async update(updateWebsiteDto: UpdateWebsiteDto): Promise<Website> {
    let config = await findIdByName(
      this,
      updateWebsiteDto.tenantReferenceId,
    )

    const website = new Website();
    website.id = updateWebsiteDto.id;
    website.domainName = updateWebsiteDto.domainName;
    website.displayName = updateWebsiteDto.displayName;
    website.ownerId = updateWebsiteDto.ownerId;
    website.tenantId = config.tenant.id;

    return this.websitesRepository.update({ id: website.id }, website).then(r => {
      return r.raw
    })
  }

  async findAll(): Promise<Website[]> {
    return this.websitesRepository.find();
  }

  findOne(id: string): Promise<Website> {
    return this.websitesRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.websitesRepository.delete(id);
  }

  // findOneWithHosts(id: string): Promise<Website> {
  //   return this.websitesRepository.findOne(id, {
  //     relations: ["collaborations", "ownerships"]
  //   });
  // }
}