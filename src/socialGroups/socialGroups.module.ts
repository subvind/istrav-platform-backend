import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SocialGroup } from './entities/socialGroup.entity';
import { SocialGroupsService } from './socialGroups.service';
import { SocialGroupCreatedListener } from './listeners/socialGroup-created.listener';
import { SocialGroupCreatedGateway } from './gateways/socialGroup-created.gateway';
import { SocialGroupsController } from './socialGroups.controller';

import { CaslAbilityFactory } from './abilities/socialGroup.ability'

@Module({
  imports: [EventEmitterModule.forRoot(), TypeOrmModule.forFeature([SocialGroup])],
  controllers: [SocialGroupsController],
  providers: [SocialGroupsService, SocialGroupCreatedListener, SocialGroupCreatedGateway, CaslAbilityFactory],
  exports: [CaslAbilityFactory]
})
export class SocialGroupsModule {}
