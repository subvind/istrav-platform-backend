import { Controller, Get, Post, Body, Patch, Param, Delete, Session } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

import * as secureSession from 'fastify-secure-session'
import { CaslAbilityFactory } from './abilities/members.ability'
import { Action } from './abilities/action.enum'

import { Member } from './entities/member.entity';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService,
    private caslAbilityFactory: CaslAbilityFactory
  ) {}

  @Post()
  create(@Body() createMemberDto: CreateMemberDto, @Session() session: secureSession.Session) {
    let account = JSON.parse(sessionStorage.getItem('account'))
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.CREATE, Member)) {
      return this.membersService.create(createMemberDto);
    } else {
      return {}
    }
  }

  @Get()
  findAll(@Session() session: secureSession.Session) {
    let account = JSON.parse(sessionStorage.getItem('account'))
    const ability = this.caslAbilityFactory.createForUser(account);
    
    if (ability.can(Action.FIND_ALL, Member)) {
      return this.membersService.findAll();
    } else {
      return {}
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Session() session: secureSession.Session) {
    let account = JSON.parse(sessionStorage.getItem('account'))
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.FIND_ONE, Member)) {
      return this.membersService.findOne(id);
    } else {
      return {}
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto, @Session() session: secureSession.Session) {
    let account = JSON.parse(sessionStorage.getItem('account'))
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.UPDATE, Member)) {
      updateMemberDto.id = id
      return this.membersService.update(updateMemberDto);
    } else {
      return {}
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Session() session: secureSession.Session) {
    let account = JSON.parse(sessionStorage.getItem('account'))
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.REMOVE, Member)) {
      return this.membersService.remove(id);
    } else {
      return {}
    }
  }
}
