import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

import { Tenant } from './entities/tenant.entity';
import { Client } from '../clients/entities/client.entity';
import { Account } from '../accounts/entities/account.entity';

import * as sha512 from 'crypto-js/sha512'

async function findIdByName (that, email, referenceId) {
  let account
  let tenant

  // find account by given email
  if (email) {
    account = await that.accountsRepository.findOne({
      select: ["id"],
      where: {
        email: email
      }
    })
  }

  // find tenant by given referenceId
  if (referenceId) {
    tenant = await that.tenantsRepository.findOne({
      select: ["id"],
      where: {
        referenceId: referenceId
      }
    })
  }

  return { 
    account,
    tenant
  }
}

@Injectable()
export class TenantsService {
  constructor(
    public eventEmitter: EventEmitter2,
    @InjectRepository(Tenant)
    private readonly tenantsRepository: Repository<Tenant>,
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>,
    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>,
  ) {}

  // register
  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    let config = await findIdByName(
      this,
      createTenantDto.ownerAccountEmail,
      null
    )

    // create tenant
    const tenant = new Tenant();
    tenant.referenceId = createTenantDto.referenceId;
    await this.tenantsRepository.save(tenant)

    // create client account for tenant
    const client = new Client();
    client.username = createTenantDto.ownerNewClientUsername
    client.password = sha512(createTenantDto.ownerNewClientPassword).toString();
    client.accountId = config.account.id
    client.tenantId = tenant.id
    await this.clientsRepository.save(client)

    // update tenant owner with new client
    tenant.ownerId = client.id;
    await this.tenantsRepository.update({ id: tenant.id }, tenant)
    
    // return record from db
    return this.tenantsRepository.findOneBy({ id: tenant.id })
  }

  async update(updateTenantDto: UpdateTenantDto): Promise<Tenant> {
    let config = await findIdByName(
      this,
      null,
      updateTenantDto.referenceId
    )

    // change record
    const tenant = new Tenant();
    tenant.id = updateTenantDto.id;
    tenant.referenceId = updateTenantDto.referenceId;
    
    // change ownership 
    if (updateTenantDto.ownerId) {
      tenant.ownerId = updateTenantDto.ownerId;
    }

    await this.tenantsRepository.update(tenant.id, tenant)
    return this.tenantsRepository.findOneBy({ id: tenant.id });
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