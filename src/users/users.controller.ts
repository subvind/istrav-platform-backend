import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthUserDto } from './dto/auth-user.dto';

import { CaslAbilityFactory } from './abilities/user.ability'
import { Action } from './abilities/action.enum'

import { User } from './entities/user.entity';
import getAccountFromHeader from '../getAccountFromHeader';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private caslAbilityFactory: CaslAbilityFactory
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.CREATE, User)) {
      return this.usersService.create(createUserDto);
    } else {
      return { error: 'you do not have the ability to do this' }
    }
  }

  @Get()
  findAll(@Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);
    
    if (ability.can(Action.FIND_ALL, User)) {
      return this.usersService.findAll();
    } else {
      return { error: 'you do not have the ability to do this' }
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.FIND_ONE, User)) {
      return this.usersService.findOne(id);
    } else {
      return { error: 'you do not have the ability to do this' }
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.UPDATE, User)) {
      updateUserDto.id = id
      return this.usersService.update(updateUserDto);
    } else {
      return { error: 'you do not have the ability to do this' }
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.REMOVE, User)) {
      return this.usersService.remove(id);
    } else {
      return { error: 'you do not have the ability to do this' }
    }
  }

  @Post('auth')
  auth(@Body() authUserDto: AuthUserDto, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);
    
    if (ability.can(Action.AUTH, User)) {
      return this.usersService.auth(authUserDto).then((token) => {
        // signal event
        this.usersService.eventEmitter.emit('user.auth', token)
        // save to response
        return { jwt: token }
      });
    } else {
      return { error: 'you do not have the ability to do this' }
    }
  }
}
