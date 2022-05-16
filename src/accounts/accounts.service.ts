import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AuthAccountDto } from './dto/auth-account.dto';

import { Account } from './entities/account.entity';

import * as jwt from "jsonwebtoken";
import * as sha512 from 'crypto-js/sha512'

@Injectable()
export class AccountsService {
  constructor(
    public eventEmitter: EventEmitter2,
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>
  ) {}

  // register
  create(createAccountDto: CreateAccountDto): Promise<Account> {
    const account = new Account();
    account.email = createAccountDto.email;
    account.password = sha512(createAccountDto.password).toString();
    account.subscribe = createAccountDto.subscribe;
    account.agreement = createAccountDto.agreement;

    return this.accountsRepository.save(account)
  }

  async update(updateAccountDto: UpdateAccountDto): Promise<Account> {
    const account = new Account();
    account.id = updateAccountDto.id;
    account.email = updateAccountDto.email;
    account.password = updateAccountDto.password;
    if (updateAccountDto.password) {
      account.password = sha512(updateAccountDto.password).toString();
    }
    account.subscribe = updateAccountDto.subscribe;
    account.agreement = updateAccountDto.agreement;

    await this.accountsRepository.update(account.id, account)
    return this.accountsRepository.findOneBy({ id: account.id });
  }

  // login
  async auth(authAccountDto: AuthAccountDto): Promise<any> {
    // find account by given username
    const results = await this.accountsRepository.findOne({
      select: ["id", "email", "password"],
      where: {
        email: authAccountDto.email
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

    // confirm auth request
    let password = sha512(authAccountDto.password).toString()
    if (results && results.password === password) {
      return jwt.sign({ 
        id: results.id,
        email: results.email,
        user: results.user,
        admin: results.admin,
        client: results.client,
        master: results.master
      }, process.env.SECRET || 'development-secret')
    }

    // deny auth request
    return { error: 'invalid username and password combination' }
  }

  async findAll(): Promise<Account[]> {
    return this.accountsRepository.find();
  }

  findOne(id: string): Promise<Account> {
    return this.accountsRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.accountsRepository.delete(id);
  }

  availableSessions(id: string): Promise<Account> {
    return this.accountsRepository.findOne({
      select: ['id'],
      relations: {
        users: {
          // password: false,
          website: true
        },
        admins: {
          // password: false,
          website: true
        },
        clients: {
          // password: false,
          tenant: true
        },
        masters: {
          // password: false
        }
      },
      where: {
        id
      }
    });
  }

  // findOneWithHosts(id: string): Promise<Account> {
  //   return this.accountsRepository.findOne(id, {
  //     relations: ["collaborations", "ownerships"]
  //   });
  // }
}