import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LicenseKeysService } from './licenseKeys.service';
import { LicenseKeyCreatedListener } from './listeners/licenseKey-created.listener';
import { LicenseKeyCreatedGateway } from './gateways/licenseKey-created.gateway';
import { LicenseKeysController } from './licenseKeys.controller';

import { LicenseKey } from './entities/licenseKey.entity';
import { Tenant } from '../tenants/entities/tenant.entity';
import { Website } from '../websites/entities/website.entity';

import { CaslAbilityFactory } from './abilities/licenseKey.ability'

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    TypeOrmModule.forFeature([LicenseKey]),
    TypeOrmModule.forFeature([Tenant]),
    TypeOrmModule.forFeature([Website]),
  ],
  controllers: [LicenseKeysController],
  providers: [LicenseKeysService, LicenseKeyCreatedListener, LicenseKeyCreatedGateway, CaslAbilityFactory],
  exports: [CaslAbilityFactory]
})
export class LicenseKeysModule {}
