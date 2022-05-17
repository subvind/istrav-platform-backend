import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Request } from '@nestjs/common';
import { LicenseKeysService } from './licenseKeys.service';
import { CreateLicenseKeyDto } from './dto/create-licenseKey.dto';
import { UpdateLicenseKeyDto } from './dto/update-licenseKey.dto';

import { CaslAbilityFactory } from './abilities/licenseKey.ability'
import { Action } from './abilities/action.enum'

import { LicenseKey } from './entities/licenseKey.entity';
import getAccountFromHeader from '../getAccountFromHeader';

@Controller('licenseKeys')
export class LicenseKeysController {
  constructor(private readonly licenseKeysService: LicenseKeysService,
    private caslAbilityFactory: CaslAbilityFactory
  ) {}

  @Post()
  create(@Body() createLicenseKeyDto: CreateLicenseKeyDto, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.CREATE, LicenseKey)) {
      return this.licenseKeysService.create(createLicenseKeyDto);
    } else {
      return { error: 'you do not have the ability to do this' }
    }
  }

  @Get()
  findAll(@Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);
    
    if (ability.can(Action.FIND_ALL, LicenseKey)) {
      return this.licenseKeysService.findAll();
    } else {
      return { error: 'you do not have the ability to do this' }
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.FIND_ONE, LicenseKey)) {
      return this.licenseKeysService.findOne(id);
    } else {
      return { error: 'you do not have the ability to do this' }
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLicenseKeyDto: UpdateLicenseKeyDto, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.UPDATE, LicenseKey)) {
      updateLicenseKeyDto.id = id
      return this.licenseKeysService.update(updateLicenseKeyDto);
    } else {
      return { error: 'you do not have the ability to do this' }
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.REMOVE, LicenseKey)) {
      return this.licenseKeysService.remove(id);
    } else {
      return { error: 'you do not have the ability to do this' }
    }
  }
}
