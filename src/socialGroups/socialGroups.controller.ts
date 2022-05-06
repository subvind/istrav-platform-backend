import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Request } from '@nestjs/common';
import { SocialGroupsService } from './socialGroups.service';
import { CreateSocialGroupDto } from './dto/create-socialGroup.dto';
import { UpdateSocialGroupDto } from './dto/update-socialGroup.dto';

import * as secureSession from 'fastify-secure-session'
import { CaslAbilityFactory } from './abilities/socialGroup.ability'
import { Action } from './abilities/action.enum'

import { SocialGroup } from './entities/socialGroup.entity';
import getAccountFromHeader from '../getAccountFromHeader';

@Controller('socialGroups')
export class SocialGroupsController {
  constructor(private readonly socialGroupsService: SocialGroupsService,
    private caslAbilityFactory: CaslAbilityFactory
  ) {}

  @Post()
  create(@Body() createSocialGroupDto: CreateSocialGroupDto, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.CREATE, SocialGroup)) {
      return this.socialGroupsService.create(createSocialGroupDto);
    } else {
      return {}
    }
  }

  @Get()
  findAll(@Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);
    
    if (ability.can(Action.FIND_ALL, SocialGroup)) {
      return this.socialGroupsService.findAll();
    } else {
      return {}
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.FIND_ONE, SocialGroup)) {
      return this.socialGroupsService.findOne(id);
    } else {
      return {}
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSocialGroupDto: UpdateSocialGroupDto, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.UPDATE, SocialGroup)) {
      updateSocialGroupDto.id = id
      return this.socialGroupsService.update(updateSocialGroupDto);
    } else {
      return {}
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.REMOVE, SocialGroup)) {
      return this.socialGroupsService.remove(id);
    } else {
      return {}
    }
  }
}
