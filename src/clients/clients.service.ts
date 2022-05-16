import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { AuthClientDto } from './dto/auth-client.dto';

import { Client } from './entities/client.entity';
import { Account } from '../accounts/entities/account.entity';
import { Tenant } from '../tenants/entities/tenant.entity';

import * as jwt from "jsonwebtoken";
import * as sha512 from 'crypto-js/sha512'

async function findIdByName (that, email, tenantReferenceId) {
  // find account by given email
  const account = await that.accountsRepository.findOne({
    select: ["id"],
    where: {
      email: email
    }
  })

  // find tenant by given tenantReferenceId
  const tenant = await that.tenantsRepository.findOne({
    select: ["id"],
    where: {
      referenceId: tenantReferenceId
    }
  })

  return { 
    account,
    tenant
  }
}

@Injectable()
export class ClientsService {
  constructor(
    public eventEmitter: EventEmitter2,
    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>,
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>,
    @InjectRepository(Tenant)
    private readonly tenantsRepository: Repository<Tenant>,
  ) {}

  // register
  async create(createClientDto: CreateClientDto): Promise<Client> {
    let config = await findIdByName(
      this,
      createClientDto.email,
      createClientDto.tenantReferenceId
    )

    const client = new Client();
    client.username = createClientDto.username;
    client.password = sha512(createClientDto.password).toString();
    client.accountId = config.account.id;
    client.tenantId = config.tenant.id

    return this.clientsRepository.save(client)
  }

  async update(updateClientDto: UpdateClientDto): Promise<Client> {
    let config = await findIdByName(
      this,
      updateClientDto.email,
      updateClientDto.tenantReferenceId
    )

    const client = new Client();
    client.id = updateClientDto.id;
    client.username = updateClientDto.username;
    if (updateClientDto.password) {
      client.password = sha512(updateClientDto.password).toString();
    }
    client.accountId = config.account.id;
    client.tenantId = config.tenant.id;

    await this.clientsRepository.update(client.id, client)
    return this.clientsRepository.findOneBy({ id: client.id });
  }

  // login
  async auth(authClientDto: AuthClientDto): Promise<any> {
    let config = await findIdByName(
      this,
      authClientDto.email,
      authClientDto.tenantReferenceId
    )

    // check tenant
    if (!config.tenant) {
      return { error: `${authClientDto.tenantReferenceId} does not exist.` }
    }

    // find account by given email
    const account = await this.accountsRepository.findOne({
      select: ["id", "email", "password"],
      where: {
        email: authClientDto.email
      },
      relations: {
        user: {
          website: true,
        },
        admin: {
          website: true,
          tenant: true
        },
        client: {
          tenant: true
        },
        master: true
      }
    })
    
    // find client by given username and tenantId
    const client = await this.clientsRepository.findOne({
      select: ["id", "username", "password"],
      where: {
        username: authClientDto.username,
        accountId: account.id,
        tenantId: config.tenant.id
      }
    })

    // hash password
    let password = sha512(authClientDto.password).toString()

    // confirm auth request
    if (account && account.password === password) {
      // if the passwords match then switch context
      if (client && client.password === account.password) {
        // update database with new account setting
        account.clientId = client.id
        this.accountsRepository.update({ id: account.id }, account).then(r => {
          return r.raw
        })

        // do not show in jwt
        delete client.password

        // return new account
        return jwt.sign({
          id: account.id,
          email: account.email,
          user: account.user,
          admin: account.admin,
          client: client,
          master: account.master,
        }, process.env.SECRET || 'development-secret')
      }
    }

    // deny auth request
    return { error: 'invalid username and password combination' }
  }

  async findAll(): Promise<Client[]> {
    return this.clientsRepository.find();
  }

  findOne(id: string): Promise<Client> {
    return this.clientsRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.clientsRepository.delete(id);
  }

  // findOneWithHosts(id: string): Promise<Client> {
  //   return this.clientsRepository.findOne(id, {
  //     relations: ["collaborations", "ownerships"]
  //   });
  // }
}