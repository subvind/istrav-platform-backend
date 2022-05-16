import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AuthAdminDto } from './dto/auth-admin.dto';

import { Admin } from './entities/admin.entity';
import { Account } from '../accounts/entities/account.entity';
import { Website } from '../websites/entities/website.entity';

import * as jwt from "jsonwebtoken";
import * as sha512 from 'crypto-js/sha512'

async function findIdByName (that, email, domainName) {
  // find account by given email
  const account = await that.accountsRepository.findOne({
    select: ["id"],
    where: {
      email: email
    }
  })

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
    account,
    website, 
    tenant: website.tenant
  }
}

@Injectable()
export class AdminsService {
  constructor(
    public eventEmitter: EventEmitter2,
    @InjectRepository(Admin)
    private readonly adminsRepository: Repository<Admin>,
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>,
    @InjectRepository(Website)
    private readonly websitesRepository: Repository<Website>,
  ) {}

  // register
  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    let config = await findIdByName(
      this,
      createAdminDto.email,
      createAdminDto.domainName
    )

    const admin = new Admin();
    admin.username = createAdminDto.username;
    admin.password = sha512(createAdminDto.password).toString();
    admin.accountId = config.account.id;
    admin.websiteId = config.website.id;
    admin.tenantId = config.tenant.id;

    return this.adminsRepository.save(admin)
  }

  async update(updateAdminDto: UpdateAdminDto): Promise<Admin> {
    let config = await findIdByName(
      this,
      updateAdminDto.email,
      updateAdminDto.domainName
    )

    const admin = new Admin();
    admin.id = updateAdminDto.id;
    admin.username = updateAdminDto.username;
    if (updateAdminDto.password) {
      admin.password = sha512(updateAdminDto.password).toString();
    }
    admin.accountId = config.account.id;
    admin.websiteId = config.website.id;
    admin.tenantId = config.tenant.id;

    await this.adminsRepository.update(admin.id, admin)
    return this.adminsRepository.findOneBy({ id: admin.id });
  }

  // login
  async auth(authAdminDto: AuthAdminDto): Promise<any> {
    let config = await findIdByName(
      this,
      authAdminDto.email,
      authAdminDto.domainName
    )

    // check website
    if (!config.website) {
      return { error: `${authAdminDto.domainName} does not exist.` }
    }

    // find account by given email
    const account = await this.accountsRepository.findOne({
      select: ["id", "email", "password", "user", "admin", "client", "master"],
      where: {
        email: authAdminDto.email
      }
    })
    
    // find admin by given username, websiteId, and tenantId
    const admin = await this.adminsRepository.findOne({
      select: ["id", "username", "password"],
      where: {
        username: authAdminDto.username,
        accountId: account.id,
        websiteId: config.website.id,
        tenantId: config.tenant.id
      }
    })

    // hash password
    let password = sha512(authAdminDto.password).toString()

    // confirm auth request
    if (account && account.password === password) {
      // if the passwords match then switch context
      if (admin && admin.password === account.password) {
        // update database with new account setting
        account.adminId = admin.id
        this.accountsRepository.update({ id: account.id }, account).then(r => {
          return r.raw
        })

        // do not show in jwt
        delete admin.password

        // return new account
        return jwt.sign({
          id: account.id,
          email: account.email,
          user: account.user,
          admin: admin,
          client: account.client,
          master: account.master,
        }, process.env.SECRET || 'development-secret')
      }
    }

    // deny auth request
    return { error: 'invalid username and password combination' }
  }

  async findAll(): Promise<Admin[]> {
    return this.adminsRepository.find();
  }

  findOne(id: string): Promise<Admin> {
    return this.adminsRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.adminsRepository.delete(id);
  }

  // findOneWithHosts(id: string): Promise<Admin> {
  //   return this.adminsRepository.findOne(id, {
  //     relations: ["collaborations", "ownerships"]
  //   });
  // }
}