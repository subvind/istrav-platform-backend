import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

import { Tenant } from './entities/tenant.entity';

@Injectable()
export class TenantsService {
  constructor(
    public eventEmitter: EventEmitter2,
    @InjectRepository(Tenant)
    private readonly tenantsRepository: Repository<Tenant>
  ) {}

  // register
  create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    const tenant = new Tenant();
    tenant.referenceId = createTenantDto.referenceId;
    tenant.ownerId = createTenantDto.ownerId;

    return this.tenantsRepository.save(tenant)
  }

  update(updateTenantDto: UpdateTenantDto): Promise<Tenant> {
    const tenant = new Tenant();
    tenant.id = updateTenantDto.id;
    tenant.referenceId = updateTenantDto.referenceId;
    tenant.ownerId = updateTenantDto.ownerId;

    return this.tenantsRepository.update({ id: tenant.id }, tenant).then(r => {
      return r.raw
    })
  }

  async findAll(): Promise<Tenant[]> {
    return this.tenantsRepository.find();
  }

  findOne(id: string): Promise<Tenant> {
    return this.tenantsRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.tenantsRepository.delete(id);
  }

  // findOneWithHosts(id: string): Promise<Tenant> {
  //   return this.tenantsRepository.findOne(id, {
  //     relations: ["collaborations", "ownerships"]
  //   });
  // }
}