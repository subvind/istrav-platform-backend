import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AuthAdminDto } from './dto/auth-admin.dto';

import { Admin } from './entities/admin.entity';
import { Account } from '../accounts/entities/account.entity';

import * as jwt from "jsonwebtoken";
import * as sha512 from 'crypto-js/sha512'

@Injectable()
export class AdminsService {
  constructor(
    public eventEmitter: EventEmitter2,
    @InjectRepository(Admin)
    private readonly adminsRepository: Repository<Admin>,
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>
  ) {}

  // register
  create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const admin = new Admin();
    admin.username = createAdminDto.username;
    admin.password = sha512(createAdminDto.password).toString();
    admin.accountId = createAdminDto.accountId;
    admin.websiteId = createAdminDto.websiteId;
    admin.tenantId = createAdminDto.tenantId;

    return this.adminsRepository.save(admin)
  }

  update(updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const admin = new Admin();
    admin.id = updateAdminDto.id;
    admin.username = updateAdminDto.username;
    if (updateAdminDto.password) {
      admin.password = sha512(updateAdminDto.password).toString();
    }
    admin.accountId = updateAdminDto.accountId;
    admin.websiteId = updateAdminDto.websiteId;
    admin.tenantId = updateAdminDto.tenantId;

    return this.adminsRepository.update({ id: admin.id }, admin).then(r => {
      return r.raw
    })
  }

  // login
  async auth(authAdminDto: AuthAdminDto): Promise<any> {
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
        websiteId: authAdminDto.websiteId,
        tenantId: authAdminDto.tenantId
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

        // return new account
        return jwt.sign({
          accountId: account.id,
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