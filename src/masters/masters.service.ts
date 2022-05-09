import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { CreateMasterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
import { AuthMasterDto } from './dto/auth-master.dto';

import { Master } from './entities/master.entity';
import { Account } from '../accounts/entities/account.entity';
import { Website } from '../websites/entities/website.entity';

import * as jwt from "jsonwebtoken";
import * as sha512 from 'crypto-js/sha512'

async function findIdByName (that, email) {
  // find account by given email
  const account = await that.accountsRepository.findOne({
    select: ["id"],
    where: {
      email: email
    }
  })

  // // find website & tenant by given domainName
  // const website = await this.websitesRepository.findOne({
  //   select: ["id", "tenant"],
  //   where: {
  //     domainName: domainName
  //   }
  // })

  return { 
    account,
    // website, 
    // tenant: website.tenant
  }
}

@Injectable()
export class MastersService {
  constructor(
    public eventEmitter: EventEmitter2,
    @InjectRepository(Master)
    private readonly mastersRepository: Repository<Master>,
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>
  ) {}

  // register
  async create(createMasterDto: CreateMasterDto): Promise<Master> {
    let config = await findIdByName(
      this,
      createMasterDto.email
    )

    const master = new Master();
    master.username = createMasterDto.username;
    master.password = sha512(createMasterDto.password).toString();
    master.accountId = config.account.id;

    return this.mastersRepository.save(master)
  }

  async update(updateMasterDto: UpdateMasterDto): Promise<Master> {
    let config = await findIdByName(
      this,
      updateMasterDto.email
    )

    const master = new Master();
    master.id = updateMasterDto.id;
    master.username = updateMasterDto.username;
    if (updateMasterDto.password) {
      master.password = sha512(updateMasterDto.password).toString();
    }
    master.accountId = config.account.id;

    return this.mastersRepository.update({ id: master.id }, master).then(r => {
      return r.raw
    })
  }

  // login
  async auth(authMasterDto: AuthMasterDto): Promise<any> {
    // find account by given email
    const account = await this.accountsRepository.findOne({
      select: ["id", "email", "password", "user", "admin", "client", "master"],
      where: {
        email: authMasterDto.email
      }
    })
    
    // find master by given username
    const master = await this.mastersRepository.findOne({
      select: ["id", "username", "password"],
      where: {
        username: authMasterDto.username,
        accountId: account.id
      }
    })

    // hash password
    let password = sha512(authMasterDto.password).toString()

    // confirm auth request
    if (account && account.password === password) {
      // if the passwords match then switch context
      if (master && master.password === account.password) {
        // update database with new account setting
        account.masterId = master.id
        this.accountsRepository.update({ id: account.id }, account).then(r => {
          return r.raw
        })
        
        // do not show in jwt
        delete master.password
        
        // return new account
        return jwt.sign({
          id: account.id,
          email: account.email,
          user: account.user,
          admin: account.user,
          client: account.client,
          master: master,
        }, process.env.SECRET || 'development-secret')
      }
    }

    // deny auth request
    return { error: 'invalid username and password combination' }
  }

  async findAll(): Promise<Master[]> {
    return this.mastersRepository.find();
  }

  findOne(id: string): Promise<Master> {
    return this.mastersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.mastersRepository.delete(id);
  }

  // findOneWithHosts(id: string): Promise<Master> {
  //   return this.mastersRepository.findOne(id, {
  //     relations: ["collaborations", "ownerships"]
  //   });
  // }
}