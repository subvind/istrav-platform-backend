import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WebsitesService } from './websites.service';
import { WebsiteCreatedListener } from './listeners/website-created.listener';
import { WebsiteCreatedGateway } from './gateways/website-created.gateway';
import { WebsitesController } from './websites.controller';

import { Website } from './entities/website.entity';
import { Tenant } from '../tenants/entities/tenant.entity';

import { CaslAbilityFactory } from './abilities/website.ability'

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    TypeOrmModule.forFeature([Website]),
    TypeOrmModule.forFeature([Tenant]),
  ],
  controllers: [WebsitesController],
  providers: [WebsitesService, WebsiteCreatedListener, WebsiteCreatedGateway, CaslAbilityFactory],
  exports: [CaslAbilityFactory]
})
export class WebsitesModule {}
