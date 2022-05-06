import { Controller, Get, Post, Body, Patch, Param, Delete, Session } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AuthAccountDto } from './dto/auth-account.dto';

import * as secureSession from 'fastify-secure-session'
import { CaslAbilityFactory } from './abilities/accounts.ability'
import { Action } from './abilities/action.enum'

import { Account } from './entities/account.entity';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService,
    private caslAbilityFactory: CaslAbilityFactory
  ) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto, @Session() session: secureSession.Session) {
    let account = JSON.parse(sessionStorage.getItem('account'))
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.CREATE, Account)) {
      return this.accountsService.create(createAccountDto);
    } else {
      return {}
    }
  }

  @Get()
  findAll(@Session() session: secureSession.Session) {
    let account = JSON.parse(sessionStorage.getItem('account'))
    const ability = this.caslAbilityFactory.createForUser(account);
    
    if (ability.can(Action.FIND_ALL, Account)) {
      return this.accountsService.findAll();
    } else {
      return {}
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Session() session: secureSession.Session) {
    let account = JSON.parse(sessionStorage.getItem('account'))
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.FIND_ONE, Account)) {
      return this.accountsService.findOne(id);
    } else {
      return {}
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto, @Session() session: secureSession.Session) {
    let account = JSON.parse(sessionStorage.getItem('account'))
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.UPDATE, Account)) {
      updateAccountDto.id = id
      return this.accountsService.update(updateAccountDto);
    } else {
      return {}
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Session() session: secureSession.Session) {
    let account = JSON.parse(sessionStorage.getItem('account'))
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.REMOVE, Account)) {
      return this.accountsService.remove(id);
    } else {
      return {}
    }
  }

  @Post('auth')
  auth(@Body() authAccountDto: AuthAccountDto, @Session() session: secureSession.Session) {
    let account = JSON.parse(sessionStorage.getItem('account'))
    const ability = this.caslAbilityFactory.createForUser(account);
    
    if (ability.can(Action.AUTH, Account)) {
      return this.accountsService.auth(authAccountDto).then((token) => {
        // signal event
        this.accountsService.eventEmitter.emit('account.auth', token)
        // save to session storage
        sessionStorage.setItem('account', JSON.stringify(token))
        return token
      });
    } else {
      return {}
    }
  }
}
