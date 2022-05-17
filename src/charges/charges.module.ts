import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChargesService } from './charges.service';
import { ChargeCreatedListener } from './listeners/charge-created.listener';
import { ChargeCreatedGateway } from './gateways/charge-created.gateway';
import { ChargesController } from './charges.controller';

import { Charge } from './entities/charge.entity';
import { Tenant } from '../tenants/entities/tenant.entity';

import { CaslAbilityFactory } from './abilities/charge.ability'

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    TypeOrmModule.forFeature([Charge]),
    TypeOrmModule.forFeature([Tenant]),
  ],
  controllers: [ChargesController],
  providers: [ChargesService, ChargeCreatedListener, ChargeCreatedGateway, CaslAbilityFactory],
  exports: [CaslAbilityFactory]
})
export class ChargesModule {}
