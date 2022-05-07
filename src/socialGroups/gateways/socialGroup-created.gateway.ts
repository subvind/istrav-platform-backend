import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { SocialGroupsService } from '../socialGroups.service'
import { SocialGroup } from '../entities/socialGroup.entity';
import { CreateSocialGroupDto } from '../dto/create-socialGroup.dto';
import { SocialGroupCreatedEvent } from '../events/socialGroup-created.event';

@WebSocketGateway(8080)
export class SocialGroupCreatedGateway {
  constructor(public readonly socialGroupsService: SocialGroupsService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('socialGroup.create')
  onEvent(client: any, data: CreateSocialGroupDto) {
    return this.socialGroupsService.create(data)
      .then((socialGroup: SocialGroup) => {
        const socialGroupCreatedEvent = new SocialGroupCreatedEvent();
        socialGroupCreatedEvent.id = socialGroup.id;
        socialGroupCreatedEvent.subdomain = socialGroup.subdomain;
        socialGroupCreatedEvent.displayName = socialGroup.displayName;
        socialGroupCreatedEvent.ownerId = socialGroup.ownerId;
        socialGroupCreatedEvent.websiteId = socialGroup.websiteId;
        socialGroupCreatedEvent.tenantId = socialGroup.tenantId;
        
        console.log('gateway: socialGroup.created', socialGroupCreatedEvent);
        this.socialGroupsService.eventEmitter.emit('socialGroup.created', socialGroupCreatedEvent)
        return { event: 'socialGroup.create', payload: data };
      })
  }
}