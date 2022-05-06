import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, Session, Req, Request } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AuthAccountDto } from './dto/auth-account.dto';

import { CaslAbilityFactory } from './abilities/account.ability'
import { Action } from './abilities/action.enum'

import { Account } from './entities/account.entity';

import getAccountFromHeader from '../getAccountFromHeader';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService,
    private caslAbilityFactory: CaslAbilityFactory
  ) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);
    
    if (ability.can(Action.CREATE, Account)) {
      return this.accountsService.create(createAccountDto);
    } else {
      return {}
    }
  }
  
  @Get()
  findAll(@Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);
    
    if (ability.can(Action.FIND_ALL, Account)) {
      return this.accountsService.findAll();
    } else {
      return {}
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.FIND_ONE, Account)) {
      return this.accountsService.findOne(id);
    } else {
      return {}
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.UPDATE, Account)) {
      updateAccountDto.id = id
      return this.accountsService.update(updateAccountDto);
    } else {
      return {}
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.REMOVE, Account)) {
      return this.accountsService.remove(id);
    } else {
      return {}
    }
  }

  @Post('auth')
  auth(@Body() authAccountDto: AuthAccountDto, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);
    
    if (ability.can(Action.AUTH, Account)) {
      return this.accountsService.auth(authAccountDto).then((token) => {
        // signal event
        this.accountsService.eventEmitter.emit('account.auth', token)
        // save to response
        return { jwt: token }
      });
    } else {
      return { error: 'you do not have the ability to do this' }
    }
  }
}
