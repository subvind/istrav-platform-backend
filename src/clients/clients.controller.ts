import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Request } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

import * as secureSession from 'fastify-secure-session'
import { CaslAbilityFactory } from './abilities/client.ability'
import { Action } from './abilities/action.enum'

import { Client } from './entities/client.entity';
import getAccountFromHeader from '../getAccountFromHeader';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService,
    private caslAbilityFactory: CaslAbilityFactory
  ) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.CREATE, Client)) {
      return this.clientsService.create(createClientDto);
    } else {
      return {}
    }
  }

  @Get()
  findAll(@Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);
    
    if (ability.can(Action.FIND_ALL, Client)) {
      return this.clientsService.findAll();
    } else {
      return {}
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.FIND_ONE, Client)) {
      return this.clientsService.findOne(id);
    } else {
      return {}
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.UPDATE, Client)) {
      updateClientDto.id = id
      return this.clientsService.update(updateClientDto);
    } else {
      return {}
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.REMOVE, Client)) {
      return this.clientsService.remove(id);
    } else {
      return {}
    }
  }
}
