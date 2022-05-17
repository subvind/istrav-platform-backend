import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Request } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AuthAdminDto } from './dto/auth-admin.dto';


import { CaslAbilityFactory } from './abilities/admin.ability'
import { Action } from './abilities/action.enum'

import { Admin } from './entities/admin.entity';
import getAccountFromHeader from '../getAccountFromHeader';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService,
    private caslAbilityFactory: CaslAbilityFactory
  ) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.CREATE, Admin)) {
      return this.adminsService.create(createAdminDto);
    } else {
      return { error: 'you do not have the ability to do this' }
    }
  }

  @Get()
  findAll(@Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);
    
    if (ability.can(Action.FIND_ALL, Admin)) {
      return this.adminsService.findAll();
    } else {
      return { error: 'you do not have the ability to do this' }
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.FIND_ONE, Admin)) {
      return this.adminsService.findOne(id);
    } else {
      return { error: 'you do not have the ability to do this' }
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.UPDATE, Admin)) {
      updateAdminDto.id = id
      return this.adminsService.update(updateAdminDto);
    } else {
      return { error: 'you do not have the ability to do this' }
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.REMOVE, Admin)) {
      return this.adminsService.remove(id);
    } else {
      return { error: 'you do not have the ability to do this' }
    }
  }

  @Post('auth')
  auth(@Body() authAdminDto: AuthAdminDto, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);
    
    if (ability.can(Action.AUTH, Admin)) {
      return this.adminsService.auth(authAdminDto).then((token) => {
        // signal event
        this.adminsService.eventEmitter.emit('admin.auth', token)
        // save to response
        return { jwt: token }
      });
    } else {
      return { error: 'you do not have the ability to do this' }
    }
  }
}
