import { Controller, Get, Post, Body, Patch, Param, Delete, Session } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

import * as secureSession from 'fastify-secure-session'
import { CaslAbilityFactory } from './abilities/tenants.ability'
import { Action } from './abilities/action.enum'

import { Tenant } from './entities/tenant.entity';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService,
    private caslAbilityFactory: CaslAbilityFactory
  ) {}

  @Post()
  create(@Body() createTenantDto: CreateTenantDto, @Session() session: secureSession.Session) {
    let account = JSON.parse(session.getItem('account'))
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.CREATE, Tenant)) {
      return this.tenantsService.create(createTenantDto);
    } else {
      return {}
    }
  }

  @Get()
  findAll(@Session() session: secureSession.Session) {
    let account = JSON.parse(session.getItem('account'))
    const ability = this.caslAbilityFactory.createForUser(account);
    
    if (ability.can(Action.FIND_ALL, Tenant)) {
      return this.tenantsService.findAll();
    } else {
      return {}
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Session() session: secureSession.Session) {
    let account = JSON.parse(session.getItem('account'))
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.FIND_ONE, Tenant)) {
      return this.tenantsService.findOne(id);
    } else {
      return {}
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto, @Session() session: secureSession.Session) {
    let account = JSON.parse(session.getItem('account'))
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.UPDATE, Tenant)) {
      updateTenantDto.id = id
      return this.tenantsService.update(updateTenantDto);
    } else {
      return {}
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Session() session: secureSession.Session) {
    let account = JSON.parse(session.getItem('account'))
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.REMOVE, Tenant)) {
      return this.tenantsService.remove(id);
    } else {
      return {}
    }
  }
}
