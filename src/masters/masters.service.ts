import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { CreateMasterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
import { AuthMasterDto } from './dto/auth-master.dto';

import { Master } from './entities/master.entity';
import { Account } from '../accounts/entities/account.entity';

import * as jwt from "jsonwebtoken";
import * as sha512 from 'crypto-js/sha512'

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
  create(createMasterDto: CreateMasterDto): Promise<Master> {
    const master = new Master();
    master.username = createMasterDto.username;
    master.password = sha512(createMasterDto.password).toString();
    master.accountId = createMasterDto.accountId;

    return this.mastersRepository.save(master)
  }

  update(updateMasterDto: UpdateMasterDto): Promise<Master> {
    const master = new Master();
    master.id = updateMasterDto.id;
    master.username = updateMasterDto.username;
    if (updateMasterDto.password) {
      master.password = sha512(updateMasterDto.password).toString();
    }
    master.accountId = updateMasterDto.accountId;

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