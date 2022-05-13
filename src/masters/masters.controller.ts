import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Request } from '@nestjs/common';
import { MastersService } from './masters.service';
import { CreateMasterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
import { AuthMasterDto } from './dto/auth-master.dto';

import { CaslAbilityFactory } from './abilities/master.ability'
import { Action } from './abilities/action.enum'

import { Master } from './entities/master.entity';
import getAccountFromHeader from '../getAccountFromHeader';

@Controller('masters')
export class MastersController {
  constructor(private readonly mastersService: MastersService,
    private caslAbilityFactory: CaslAbilityFactory
  ) {}

  @Post('install')
  install(@Body() installMasterDto: CreateMasterDto, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.INSTALL, Master)) {
      return this.mastersService.install(installMasterDto);
    } else {
      return { error: 'you do not have the ability to do this' }
    }
  }

  @Post()
  create(@Body() createMasterDto: CreateMasterDto, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.CREATE, Master)) {
      return this.mastersService.create(createMasterDto);
    } else {
      return { error: 'you do not have the ability to do this' }
    }
  }

  @Get()
  findAll(@Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);
    
    if (ability.can(Action.FIND_ALL, Master)) {
      return this.mastersService.findAll();
    } else {
      return { error: 'you do not have the ability to do this' }
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.FIND_ONE, Master)) {
      return this.mastersService.findOne(id);
    } else {
      return { error: 'you do not have the ability to do this' }
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMasterDto: UpdateMasterDto, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.UPDATE, Master)) {
      updateMasterDto.id = id
      return this.mastersService.update(updateMasterDto);
    } else {
      return { error: 'you do not have the ability to do this' }
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.REMOVE, Master)) {
      return this.mastersService.remove(id);
    } else {
      return { error: 'you do not have the ability to do this' }
    }
  }

  @Post('auth')
  auth(@Body() authMasterDto: AuthMasterDto, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);
    
    if (ability.can(Action.AUTH, Master)) {
      return this.mastersService.auth(authMasterDto).then((token) => {
        // signal event
        this.mastersService.eventEmitter.emit('master.auth', token)
        // save to response
        return { jwt: token }
      });
    } else {
      return { error: 'you do not have the ability to do this' }
    }
  }
}
