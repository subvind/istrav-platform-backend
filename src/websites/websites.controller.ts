import { Controller, Get, Post, Body, Patch, Param, Delete, Session } from '@nestjs/common';
import { WebsitesService } from './websites.service';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { UpdateWebsiteDto } from './dto/update-website.dto';

import * as secureSession from 'fastify-secure-session'
import { CaslAbilityFactory } from './abilities/websites.ability'
import { Action } from './abilities/action.enum'

import { Website } from './entities/website.entity';

@Controller('websites')
export class WebsitesController {
  constructor(private readonly websitesService: WebsitesService,
    private caslAbilityFactory: CaslAbilityFactory
  ) {}

  @Post()
  create(@Body() createWebsiteDto: CreateWebsiteDto, @Session() session: secureSession.Session) {
    let account = JSON.parse(session.getItem('account'))
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.CREATE, Website)) {
      return this.websitesService.create(createWebsiteDto);
    } else {
      return {}
    }
  }

  @Get()
  findAll(@Session() session: secureSession.Session) {
    let account = JSON.parse(session.getItem('account'))
    const ability = this.caslAbilityFactory.createForUser(account);
    
    if (ability.can(Action.FIND_ALL, Website)) {
      return this.websitesService.findAll();
    } else {
      return {}
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Session() session: secureSession.Session) {
    let account = JSON.parse(session.getItem('account'))
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.FIND_ONE, Website)) {
      return this.websitesService.findOne(id);
    } else {
      return {}
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWebsiteDto: UpdateWebsiteDto, @Session() session: secureSession.Session) {
    let account = JSON.parse(session.getItem('account'))
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.UPDATE, Website)) {
      updateWebsiteDto.id = id
      return this.websitesService.update(updateWebsiteDto);
    } else {
      return {}
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Session() session: secureSession.Session) {
    let account = JSON.parse(session.getItem('account'))
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.REMOVE, Website)) {
      return this.websitesService.remove(id);
    } else {
      return {}
    }
  }
}
