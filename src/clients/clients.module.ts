import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Client } from './entities/client.entity';
import { ClientsService } from './clients.service';
import { ClientCreatedListener } from './listeners/client-created.listener';
import { ClientCreatedGateway } from './gateways/client-created.gateway';
import { ClientsController } from './clients.controller';

import { CaslAbilityFactory } from './abilities/client.ability'

@Module({
  imports: [EventEmitterModule.forRoot(), TypeOrmModule.forFeature([Client])],
  controllers: [ClientsController],
  providers: [ClientsService, ClientCreatedListener, ClientCreatedGateway, CaslAbilityFactory],
  exports: [CaslAbilityFactory]
})
export class ClientsModule {}
