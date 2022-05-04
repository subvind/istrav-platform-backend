import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Tenant } from './entities/tenant.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

import * as jwt from "jsonwebtoken";

import * as sha512 from 'crypto-js/sha512'

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
    tenant.email = createTenantDto.email;
    tenant.username = createTenantDto.username;
    tenant.password = sha512(createTenantDto.password).toString();
    tenant.subscribe = createTenantDto.subscribe;
    tenant.agreement = createTenantDto.agreement;

    return this.tenantsRepository.save(tenant)
  }

  update(updateTenantDto: UpdateTenantDto): Promise<Tenant> {
    const tenant = new Tenant();
    tenant.id = updateTenantDto.id;
    tenant.email = updateTenantDto.email;
    tenant.username = updateTenantDto.username;
    tenant.password = updateTenantDto.password;
    if (updateTenantDto.password) {
      tenant.password = sha512(updateTenantDto.password).toString();
    }
    tenant.subscribe = updateTenantDto.subscribe;
    tenant.agreement = updateTenantDto.agreement;
    tenant.isRoot = updateTenantDto.isRoot;

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