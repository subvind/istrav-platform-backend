import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Request } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

import { CaslAbilityFactory } from './abilities/tenant.ability'
import { Action } from './abilities/action.enum'

import { Tenant } from './entities/tenant.entity';
import getAccountFromHeader from '../getAccountFromHeader';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService,
    private caslAbilityFactory: CaslAbilityFactory
  ) {}

  @Post()
  create(@Body() createTenantDto: CreateTenantDto, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.CREATE, Tenant)) {
      return this.tenantsService.create(createTenantDto);
    } else {
      return { error: 'you do not have the ability to do this' }
    }
  }

  @Get()
  findAll(@Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);
    
    if (ability.can(Action.FIND_ALL, Tenant)) {
      return this.tenantsService.findAll();
    } else {
      return { error: 'you do not have the ability to do this' }
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.FIND_ONE, Tenant)) {
      return this.tenantsService.findOne(id);
    } else {
      return { error: 'you do not have the ability to do this' }
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.UPDATE, Tenant)) {
      updateTenantDto.id = id
      return this.tenantsService.update(updateTenantDto);
    } else {
      return { error: 'you do not have the ability to do this' }
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.REMOVE, Tenant)) {
      return this.tenantsService.remove(id);
    } else {
      return { error: 'you do not have the ability to do this' }
    }
  }
}
