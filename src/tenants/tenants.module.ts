import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TenantsService } from './tenants.service';
import { TenantCreatedListener } from './listeners/tenant-created.listener';
import { TenantCreatedGateway } from './gateways/tenant-created.gateway';
import { TenantsController } from './tenants.controller';

import { Tenant } from './entities/tenant.entity';
import { Account } from '../accounts/entities/account.entity';
import { Client } from '../clients/entities/client.entity';

import { CaslAbilityFactory } from './abilities/tenant.ability'

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    TypeOrmModule.forFeature([Tenant]),
    TypeOrmModule.forFeature([Account]),
    TypeOrmModule.forFeature([Client]),
  ],
  controllers: [TenantsController],
  providers: [TenantsService, TenantCreatedListener, TenantCreatedGateway, CaslAbilityFactory],
  exports: [CaslAbilityFactory]
})
export class TenantsModule {}
